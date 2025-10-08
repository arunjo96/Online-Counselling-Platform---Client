
import  { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCallData as setReduxCallData, clearCallData } from '../features/authSlice';

const CallContext = createContext();

export const CallProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { callReceiverId, callReceiverName } = useSelector(state => state.auth);


  const startCall = (receiverId, receiverName) => {
    dispatch(setReduxCallData({ receiverId, receiverName }));
  };


  const endCall = () => {
    dispatch(clearCallData());
  };


  return (
    <CallContext.Provider 
      value={{ 
        callData: { receiverId: callReceiverId, receiverName: callReceiverName },
        startCall, 
        endCall 
      }}
    >
      {children}
    </CallContext.Provider>
  );
};


export const useCall = () => useContext(CallContext);
