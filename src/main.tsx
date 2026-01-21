import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// URL 파라미터에서 conversation_id를 읽어서 localStorage에 저장
function AppWithUrlParams() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const conversationId = urlParams.get('conversation_id');
    
    if (conversationId) {
      console.log('URL에서 받은 conversation_id:', conversationId);
      localStorage.setItem('conversation_id', conversationId);
      
      // URL에서 파라미터 제거 (선택사항)
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  return <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithUrlParams />
  </React.StrictMode>,
)
