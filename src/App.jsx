
import React from 'react'
import './App.css'
import AuthRoutes from './routes/authRoutes.jsx'
import { CallProvider } from "./context/ContextCall.jsx"
import { ChatProvider } from './context/ChatContext.jsx'
import { CounsellorProvider } from './context/Counsellor.jsx'
import { NavigationProvider } from './context/Navigation.jsx'


const App = () => {
  return (
    <NavigationProvider>
        <CounsellorProvider>
          <ChatProvider>
            <CallProvider>
              <AuthRoutes />
            </CallProvider>
          </ChatProvider>
        </CounsellorProvider>
    </NavigationProvider>
  );
}

export default App
