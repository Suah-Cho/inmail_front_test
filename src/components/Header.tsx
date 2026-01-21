import { User } from '../types';

interface HeaderProps {
  user: User;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Header({ user, activeTab, onTabChange }: HeaderProps) {
  const tabs = ['메일', '주소록', '캘린더'];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <div className="text-lg font-semibold text-gray-800">
            KIS정보통신
          </div>
          <nav className="flex gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-4 py-2 rounded ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-gray-700">
              {user.name}님({user.email})
            </div>
            <div className="text-xs text-gray-500">
              {user.messageCount}통
            </div>
          </div>
          <button className="px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            로그아웃
          </button>
        </div>
      </div>
      <div className="px-6 py-2 bg-gray-50 border-t border-gray-200">
        <div className="text-xs text-gray-600">
          최종접속IP: {user.lastAccessIp} ({user.lastAccessDate}) 접속기록 최근활동
        </div>
      </div>
    </header>
  );
}
