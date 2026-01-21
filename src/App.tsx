import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EmailViewer from './components/EmailViewer';
import { currentUser, sampleEmail, signature } from './data/sampleData';
import { MailFolder } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('메일');
  const [activeFolder, setActiveFolder] = useState('받은편지함');

  const folders: MailFolder[] = [
    { name: '받은편지함', count: 0, isActive: true },
    { name: '보낸편지함', count: 0 },
    { name: '내게쓴편지함', count: 0 },
    { name: '임시보관함', count: 0 },
    { name: '예약메일함', count: 0 },
    { name: '휴지통', count: 0 },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header user={currentUser} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          folders={folders}
          activeFolder={activeFolder}
          onFolderClick={setActiveFolder}
        />
        <EmailViewer email={sampleEmail} signature={signature} />
      </div>
      <footer className="bg-white border-t border-gray-200 px-6 py-2">
        <div className="text-xs text-gray-500 text-center">
          Copyright © KIS INFORMATION & COMMUNICATION Inc. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
