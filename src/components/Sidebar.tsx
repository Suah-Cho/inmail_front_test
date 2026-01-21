import { MailFolder } from '../types';

interface SidebarProps {
  folders: MailFolder[];
  activeFolder: string;
  onFolderClick: (folder: string) => void;
}

export default function Sidebar({
  folders,
  activeFolder,
  onFolderClick,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4">
        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium">
          편지쓰기
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="space-y-1">
          {folders.map((folder) => (
            <div key={folder.name} className="flex items-center gap-2">
              <button
                onClick={() => onFolderClick(folder.name)}
                className={`flex-1 text-left px-3 py-2 rounded flex items-center justify-between ${
                  activeFolder === folder.name
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{folder.name}</span>
                {folder.count > 0 && (
                  <span className="text-xs text-gray-500">{folder.count}</span>
                )}
              </button>
              {folder.name === '보낸편지함' && (
                <button className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded">
                  수신확인
                </button>
              )}
              {folder.name === '휴지통' && (
                <button className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded">
                  비움
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-4 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">내 메일함</span>
          <div className="flex gap-2">
            <button className="text-gray-500 hover:text-gray-700">+</button>
            <button className="text-gray-500 hover:text-gray-700">⚙</button>
          </div>
        </div>
        <div className="space-y-1">
          <button className="w-full text-left px-3 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center justify-between">
            <span>IT기획실 캘린더</span>
            <span className="text-xs text-gray-500">292</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center justify-between">
            <span>SHARE</span>
            <span className="text-xs text-gray-500">3209</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center justify-between">
            <span>그룹웨어</span>
            <span className="text-xs text-gray-500">40</span>
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 border-t border-gray-200 pt-4">
        <div className="text-sm font-medium text-gray-700 mb-2">
          승인편지함
        </div>
        <div className="space-y-1">
          <button className="w-full text-left px-3 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center justify-between">
            <span>받은 승인편지함</span>
            <span className="text-xs text-gray-500">0</span>
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-gray-700 hover:bg-gray-100 flex items-center justify-between">
            <span>보낸 승인편지함</span>
            <span className="text-xs text-gray-500">0</span>
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 border-t border-gray-200 pt-4">
        <button className="text-sm text-gray-600 hover:text-gray-800">
          환경설정
        </button>
      </div>

      <div className="px-4 pb-4 mt-auto">
        <div className="text-xs text-gray-500">사용량 1.35GB/10GB</div>
      </div>
    </aside>
  );
}
