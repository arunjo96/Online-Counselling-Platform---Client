import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCall } from "../context/ContextCall.jsx";
import { useSocket } from "../hooks/useSocket";
import {
  AiOutlineVideoCamera,
  AiOutlineAudio,
  AiOutlineAudioMuted,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineLoading3Quarters,
  AiOutlineWarning,
} from "react-icons/ai";

const VideoCall = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { callData, endCall } = useCall();
  const socketRef = useSocket(token);

  const { receiverId, receiverName } = callData;

  const [callState, setCallState] = useState("initializing");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const connectionAttemptRef = useRef(0);

  useEffect(() => {
    if (!user || !token) {
      setErrorMessage("User not logged in.");
      setCallState("error");
      return;
    }

    if (!receiverId) {
      setErrorMessage("No call recipient specified.");
      setCallState("error");
      return;
    }

    if (!socketRef.current) {
      setErrorMessage("Communication channel not available.");
      setCallState("error");
      return;
    }

    socketRef.current.emit("join", user._id);

    setCallState("connecting");
    setupCall();

    return () => {
      hangupCall();
    };
  }, [user, token, receiverId, socketRef]);

  const setupCall = async () => {
    try {
      setupSocketListeners();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      createPeerConnection();

      setTimeout(createAndSendOffer, 1000);

      const timeoutId = setTimeout(() => {
        if (callState === "connecting") {
          setErrorMessage(
            "Call connection timed out. The recipient may be unavailable."
          );
          setCallState("error");
        }
      }, 20000);

      return () => clearTimeout(timeoutId);
    } catch (err) {
      setErrorMessage(`Cannot setup call: ${err.message}`);
      setCallState("error");
    }
  };

  const setupSocketListeners = () => {
    if (!socketRef.current) return;

    ["webrtc-offer", "webrtc-answer", "webrtc-ice-candidate"].forEach(
      (event) => {
        socketRef.current.off(event);
      }
    );

    socketRef.current.on("webrtc-offer", async ({ offer, from }) => {
      try {
        if (!peerConnectionRef.current) createPeerConnection();

        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(offer)
        );

        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);

        socketRef.current.emit("webrtc-answer", { to: from, answer });
      } catch (err) {
        setErrorMessage("Failed to process incoming call.");
        setCallState("error");
      }
    });

    socketRef.current.on("webrtc-answer", async ({ answer }) => {
      try {
        if (peerConnectionRef.current) {
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
        }
      } catch (err) {}
    });

    socketRef.current.on("webrtc-ice-candidate", async ({ candidate }) => {
      try {
        if (candidate && peerConnectionRef.current) {
          await peerConnectionRef.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        }
      } catch (err) {}
    });
  };

  const createPeerConnection = () => {
    try {
      const configuration = {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      };

      const pc = new RTCPeerConnection(configuration);
      peerConnectionRef.current = pc;

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStreamRef.current);
        });
      }

      pc.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit("webrtc-ice-candidate", {
            to: receiverId,
            candidate: event.candidate,
          });
        }
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") {
          setCallState("connected");
        }
        if (["disconnected", "failed", "closed"].includes(pc.connectionState)) {
          setCallState("ended");
        }
      };

      pc.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
    } catch (err) {
      setErrorMessage("Failed to create call connection.");
      setCallState("error");
    }
  };

  const createAndSendOffer = async () => {
    try {
      if (!peerConnectionRef.current || !socketRef.current) return;

      connectionAttemptRef.current += 1;

      if (connectionAttemptRef.current > 3) {
        setErrorMessage("Cannot reach the recipient. Please try again later.");
        setCallState("error");
        return;
      }

      const offer = await peerConnectionRef.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });

      await peerConnectionRef.current.setLocalDescription(offer);

      socketRef.current.emit("webrtc-offer", { to: receiverId, offer });

      if (connectionAttemptRef.current < 3) {
        const retryTimeout = setTimeout(() => {
          if (callState === "connecting") {
            createAndSendOffer();
          }
        }, 5000);

        return () => clearTimeout(retryTimeout);
      }
    } catch (err) {
      setErrorMessage("Failed to initiate call.");
      setCallState("error");
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsVideoOff(!isVideoOff);
    }
  };

  const hangupCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (socketRef.current) {
      ["webrtc-offer", "webrtc-answer", "webrtc-ice-candidate"].forEach(
        (event) => {
          socketRef.current.off(event);
        }
      );
    }
  };

  const handleEndCall = () => {
    hangupCall();
    endCall();
    navigate("/chat");
  };

  const retryCall = () => {
    setCallState("initializing");
    setErrorMessage("");
    connectionAttemptRef.current = 0;
    hangupCall();
    setTimeout(() => {
      setupCall();
    }, 1000);
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 relative">
        {callState === "connecting" && (
          <div className="h-full flex items-center justify-center bg-gray-800 text-white flex-col">
            <AiOutlineLoading3Quarters className="animate-spin text-5xl mb-4" />
            <h2 className="text-xl font-medium mb-2">
              Connecting to {receiverName || "User"}...
            </h2>
            <p className="text-gray-400">
              Waiting for {receiverName || "recipient"} to join
            </p>
          </div>
        )}

        {callState === "error" && (
          <div className="h-full flex flex-col items-center justify-center text-white">
            <AiOutlineWarning className="text-yellow-500 text-5xl mb-4" />
            <h2 className="text-xl font-medium mb-2">Connection Error</h2>
            <p className="mb-4">{errorMessage || "Failed to connect"}</p>
            <div className="flex space-x-4">
              <button
                onClick={retryCall}
                className="bg-blue-600 cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate("/chat")}
                className="bg-gray-600 cursor-pointer px-4 py-2 rounded hover:bg-gray-700"
              >
                Return to Chat
              </button>
            </div>
          </div>
        )}

        {callState === "ended" && (
          <div className="h-full flex flex-col items-center justify-center text-white">
            <AiOutlineClose className="text-5xl mb-4" />
            <h2 className="text-xl font-medium mb-2">Call Ended</h2>
            <button
              onClick={() => navigate("/chat")}
              className="bg-blue-600 cursor-pointer px-4 py-2 rounded hover:bg-blue-700"
            >
              Return to Chat
            </button>
          </div>
        )}

        {callState === "connected" && (
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        )}

        {(callState === "connected" || callState === "connecting") && (
          <div className="absolute bottom-5 right-5 w-1/4 max-w-xs rounded-lg overflow-hidden border border-gray-600 bg-black">
            {isVideoOff ? (
              <div className="flex items-center justify-center h-32">
                <AiOutlineUser className="text-gray-400 text-4xl" />
              </div>
            ) : (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            )}
          </div>
        )}
      </div>

      {(callState === "connected" || callState === "connecting") && (
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-gray-800 p-4 rounded-full shadow-lg z-50">
          <button
            onClick={toggleMute}
            className={`p-3 cursor-pointer rounded-full ${
              isMuted ? "bg-red-500" : "bg-gray-600 hover:bg-gray-700"
            }`}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <AiOutlineAudioMuted className="text-white text-xl" />
            ) : (
              <AiOutlineAudio className="text-white text-xl" />
            )}
          </button>
          <button
            onClick={toggleVideo}
            className={`p-3 cursor-pointer rounded-full ${
              isVideoOff ? "bg-red-500" : "bg-gray-600 hover:bg-gray-700"
            }`}
            aria-label={isVideoOff ? "Turn on camera" : "Turn off camera"}
          >
            <AiOutlineVideoCamera className="text-white text-xl" />
          </button>
          <button
            onClick={handleEndCall}
            className="p-3 rounded-full cursor-pointer bg-red-600 hover:bg-red-700"
            aria-label="End call"
          >
            <AiOutlineClose className="text-white text-xl" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
