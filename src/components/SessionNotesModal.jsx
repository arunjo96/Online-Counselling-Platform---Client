import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useAddNoteMutation,
  useGetNotesByAppointmentQuery,
  useDeleteNoteMutation,
} from "../features/Api/sessionNotesApi";
import {
  AiOutlineFileAdd,
  AiOutlineDelete,
  AiOutlinePaperClip,
  AiOutlineLoading3Quarters,
  AiOutlineClose,
  AiOutlineFileText,
  AiOutlineWarning,
  AiOutlineFile,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { clearCallData } from "../features/authSlice";
import { sessionNotesFormatDate } from "../utils/Helpers";
import { motion } from "framer-motion";

const SessionNotesModal = ({ appointment, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [noteText, setNoteText] = useState("");
  const [files, setFiles] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  const isCounsellor = user?.role === "counsellor";

  const [addNote, { isLoading: isAddingNote }] = useAddNoteMutation();
  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const {
    data: notesData,
    isLoading: isLoadingNotes,
    refetch,
    error: fetchError,
  } = useGetNotesByAppointmentQuery(appointment._id);

  const clientId = appointment.client._id;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 3) {
      setErrorMessage("Please select a maximum of 3 files.");
      return;
    }

    const oversizedFiles = selectedFiles.filter(
      (file) => file.size > 2 * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      setErrorMessage("Files should be less than 2MB each.");
      return;
    }

    setFiles(selectedFiles);
    setErrorMessage("");
    setSuccessMessage("Files selected successfully!");

    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!noteText.trim() && files.length === 0) {
      setErrorMessage("Please add a note or attach files.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const formData = new FormData();
      formData.append("appointment", appointment._id);
      formData.append("client", clientId);

      formData.append("note", noteText || "-");

      files.forEach((file) => {
        formData.append("attachments", file);
      });

      const result = await addNote(formData).unwrap();

      setSuccessMessage("Note added successfully!");

      setNoteText("");
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";

      refetch();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      let errorMsg = "Failed to add note. Please try again.";

      if (error?.data?.message) {
        errorMsg = error.data.message;
      } else if (error?.status === 500) {
        errorMsg = "Server error. Please try again or contact support.";
      }

      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAskDelete = (noteId) => {
    setConfirmDeleteId(noteId);
    setDeleteErrorMessage("");
  };

  const handleConfirmDelete = async () => {
    if (!confirmDeleteId) return;

    try {
      setDeleteErrorMessage("");
      await deleteNote(confirmDeleteId).unwrap();
      setConfirmDeleteId(null);

      setSuccessMessage("Note deleted successfully!");
      setTimeout(() => refetch(), 300);

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setDeleteErrorMessage(
        error?.data?.message || "Failed to delete note. Please try again."
      );
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
    setDeleteErrorMessage("");
  };

  const handleCloseModal = () => {
    dispatch(clearCallData());
    onClose();
  };

  const getFileIcon = (url) => {
    const ext = url.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif"].includes(ext)) {
      return (
        <img
          src={url}
          alt="Preview"
          className="w-5 h-5 mr-1 object-cover rounded"
        />
      );
    }

    if (ext === "pdf") {
      return <AiOutlineFile className="text-green-600 mr-1" />;
    }

    if (["doc", "docx"].includes(ext)) {
      return <AiOutlineFile className="text-green-500 mr-1" />;
    }

    return <AiOutlineFile className="text-green-400 mr-1" />;
  };

  const formatFileName = (url) => {
    const parts = url.split("/");
    const filename = parts[parts.length - 1];
    return filename.split("?")[0];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 sticky top-0 z-10 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold flex items-center">
                <AiOutlineFileText className="mr-2" /> Session Notes
              </h3>
              <p className="text-xs text-green-50">
                {new Date(appointment.appointmentDate).toLocaleDateString()} -{" "}
                {appointment.client.name}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCloseModal}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1.5 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <AiOutlineClose className="text-lg" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <div
            className="flex-1 overflow-y-auto p-5 bg-green-50 bg-opacity-30"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#00b948 #f3f4f6",
            }}
          >
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-100 text-green-700 rounded flex items-center justify-between text-sm"
              >
                <div className="flex items-center">
                  <AiOutlineCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                  <span>{successMessage}</span>
                </div>
                <button
                  onClick={() => setSuccessMessage("")}
                  className="text-green-500 hover:text-green-700 flex-shrink-0 cursor-pointer"
                >
                  <AiOutlineClose />
                </button>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 text-red-700 rounded flex items-center justify-between text-sm"
              >
                <div className="flex items-start">
                  <AiOutlineWarning className="text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  onClick={() => setErrorMessage("")}
                  className="text-red-500 hover:text-red-700 flex-shrink-0 cursor-pointer"
                >
                  <AiOutlineClose />
                </button>
              </motion.div>
            )}

            {fetchError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 bg-red-100 text-red-700 rounded flex items-center text-sm"
              >
                <AiOutlineWarning className="text-red-500 mr-2" />
                Failed to load notes. Please refresh and try again.
              </motion.div>
            )}

            {isCounsellor && (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
                className="mb-6 bg-white p-4 rounded-lg border border-green-200 shadow-sm"
              >
                <div className="mb-3">
                  <label className="block text-sm text-green-800 mb-1 font-medium">
                    Add New Note
                  </label>
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full text-sm p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 min-h-[120px] transition-all"
                    placeholder="Enter session notes..."
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm text-green-800 mb-1 font-medium">
                    Attachments
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                  />
                  <motion.label
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    htmlFor="file-upload"
                    className="cursor-pointer bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center w-fit transition-colors text-sm"
                  >
                    <AiOutlinePaperClip className="mr-1" />
                    {files.length > 0
                      ? `${files.length} file(s) selected`
                      : "Attach Files"}
                  </motion.label>
                  <p className="text-xs text-green-600 mt-1">
                    Max size: 2MB per file. Max 3 files. Supported formats: PDF,
                    DOC, TXT, JPG, PNG
                  </p>

                  {files.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 space-y-1 text-sm text-green-700"
                    >
                      {files.map((f, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center gap-2 bg-green-50 p-2 rounded-md"
                        >
                          <span className="truncate max-w-xs text-xs">
                            {f.name}
                          </span>
                          <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">
                            {(f.size / 1024).toFixed(1)} KB
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() =>
                              setFiles((prev) =>
                                prev.filter((_, idx) => idx !== i)
                              )
                            }
                            className="text-red-500 hover:text-red-700 ml-auto cursor-pointer p-1 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <AiOutlineClose />
                          </motion.button>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center transition-colors text-sm font-medium shadow-sm hover:shadow cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={
                    isSubmitting || (!noteText.trim() && files.length === 0)
                  }
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                  ) : (
                    <AiOutlineFileAdd className="mr-2" />
                  )}
                  {isSubmitting ? "Saving..." : "Save Note"}
                </motion.button>
              </motion.form>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-green-100"
            >
              <h4 className="text-base font-medium mb-3 text-green-800 pb-2 border-b border-green-100">
                Notes History
              </h4>

              {isLoadingNotes ? (
                <div className="flex justify-center items-center p-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <AiOutlineLoading3Quarters className="text-green-600 text-xl" />
                  </motion.div>
                </div>
              ) : notesData?.notes?.length > 0 ? (
                <div className="space-y-4">
                  {notesData.notes.map((note, index) => (
                    <motion.div
                      key={note._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="bg-green-50 p-4 rounded-lg border border-green-100 flex flex-col hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-md inline-block">
                          <span className="font-medium">
                            {note.counselor.name}
                          </span>{" "}
                          • {sessionNotesFormatDate(note.createdAt)}
                        </p>

                        {isCounsellor && note.counselor._id === user._id && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleAskDelete(note._id)}
                            className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                            aria-label="Delete note"
                            disabled={isDeleting}
                          >
                            <AiOutlineDelete size={16} />
                          </motion.button>
                        )}
                      </div>

                      {note.note && note.note !== "-" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="mt-3 whitespace-pre-wrap text-sm text-gray-800 bg-white p-3 rounded-md border border-green-100"
                        >
                          {note.note}
                        </motion.p>
                      )}

                      {note.attachments?.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {note.attachments.map((att, i) => (
                            <motion.a
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + i * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              href={att}
                              target="_blank"
                              rel="noreferrer"
                              className="text-green-700 hover:text-green-800 text-xs flex items-center bg-green-100 hover:bg-green-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                            >
                              {getFileIcon(att)}
                              {formatFileName(att)}
                            </motion.a>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-8 bg-green-50 rounded-lg border border-green-200"
                >
                  <AiOutlineFileText className="text-4xl text-green-400 mx-auto mb-2" />
                  <p className="text-green-700 text-sm">
                    No notes available for this session yet.
                  </p>
                  {isCounsellor && (
                    <p className="text-xs text-green-600 mt-1">
                      Use the form above to add your first note.
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          <div className="border-t border-green-100 px-6 py-4 bg-gray-50 flex justify-end items-center sticky bottom-0 rounded-b-xl">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCloseModal}
              className="bg-white text-green-700 border border-green-300 px-4 py-2 rounded-md hover:bg-green-50 transition-colors cursor-pointer text-sm font-medium"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>

      {confirmDeleteId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-xl p-5 max-w-sm w-full"
          >
            <h3 className="text-base font-semibold mb-2 text-red-600">
              Confirm Delete
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              Are you sure you want to delete this note? This action cannot be
              undone.
            </p>

            {deleteErrorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-xs"
              >
                <span className="font-medium">Error:</span> {deleteErrorMessage}
              </motion.div>
            )}

            <div className="flex justify-end gap-3 mt-5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancelDelete}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer text-sm"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center cursor-pointer text-sm disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <AiOutlineDelete className="mr-2" />
                    Delete
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SessionNotesModal;
