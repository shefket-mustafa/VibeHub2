import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router"
import { UserProvider } from './context/UserContext.tsx'
import {Provider} from "react-redux"
import store from './redux/store.ts'
import { ChatProvider } from './context/ChatContext.tsx'
import GroupsProvider from './context/GroupsContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

      <Provider store={store}>
    <UserProvider >
    <ChatProvider>
      <GroupsProvider>
    <App />
      </GroupsProvider>
    </ChatProvider>
    </UserProvider>
      </Provider>
    
    </BrowserRouter>
  </StrictMode>,
)
