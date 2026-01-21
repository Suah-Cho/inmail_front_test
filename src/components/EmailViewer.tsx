import { useState } from 'react';
import { Email, Signature } from '../types';

interface EmailViewerProps {
  email: Email;
  signature?: Signature;
}

interface ConversationResponse {
  conversation_id: string;
}

export default function EmailViewer({ email, signature }: EmailViewerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState(email.subject);
  const [senderName, setSenderName] = useState(email.sender.name);
  const [senderEmail, setSenderEmail] = useState(email.sender.email);
  const [recipientName, setRecipientName] = useState(email.recipient.name);
  const [recipientEmail, setRecipientEmail] = useState(email.recipient.email);
  const [ccText, setCcText] = useState(
    email.cc?.map((cc) => `${cc.name} <${cc.email}>`).join('; ') ?? ''
  );
  const [body, setBody] = useState(email.body);

  const handleAiClick = async () => {
    setIsLoading(true);
    try {
      // 메일 전체 내용을 텍스트 형식으로 구성
      let mailContextText = `메일 ID: ${email.id}\n`;
      mailContextText += `날짜: ${email.date}\n`;
      mailContextText += `제목: ${subject}\n`;
      mailContextText += `보낸사람: ${senderName} <${senderEmail}>\n`;
      mailContextText += `받는사람: ${recipientName} <${recipientEmail}>\n`;

      if (ccText.trim()) {
        mailContextText += `참조: ${ccText}\n`;
      }

      mailContextText += `\n본문:\n${body}\n`;
      
      if (email.tableData && email.tableData.length > 0) {
        mailContextText += `\n표 데이터:\n`;
        email.tableData.forEach((row, index) => {
          mailContextText += `${index + 1}. ${row.item} - 집계여부: ${row.aggregationStatus}, 추출가능여부: ${row.extractionAvailability}\n`;
        });
      }
      
      if (signature) {
        mailContextText += `\n서명:\n`;
        mailContextText += `${signature.name}\n`;
        mailContextText += `${signature.position}\n`;
        mailContextText += `${signature.department}\n`;
        if (signature.phone) mailContextText += `Tel: ${signature.phone}\n`;
        if (signature.fax) mailContextText += `Fax: ${signature.fax}\n`;
        mailContextText += `Email: ${signature.email}\n`;
      }

      // POST 요청 전송 (mail_context를 텍스트로 전송)
      const response = await fetch('http://127.0.0.1:8000/api/v1/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail_context: mailContextText,
        }),
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data: ConversationResponse = await response.json();
      
      // conversation_id를 localStorage에 저장
      if (data.conversation_id) {
        console.log('conversation_id:', data.conversation_id);
        localStorage.setItem('conversation_id', data.conversation_id);
        
        // 새 창 열기 (URL 파라미터로 conversation_id 전달)
        window.open(`http://localhost:10041?conversation_id=${encodeURIComponent(data.conversation_id)}`, '_blank', 'width=1200,height=800,resizable=yes,scrollbars=yes');
      } else {
        // conversation_id가 없을 경우에도 새 창 열기
        window.open('http://localhost:10041', '_blank', 'width=1200,height=800,resizable=yes,scrollbars=yes');
      }
    } catch (error) {
      console.error('AI 사용하기 오류:', error);
      alert('AI 서비스 연결에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex-1 bg-white overflow-y-auto">
      <div className="p-6">
        {/* Email Actions Bar */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-gray-800">
              ◀ 편지읽기
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
              목록
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
              ◀이전
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
              다음▶
            </button>
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
              🖨
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 flex-wrap">
          <button className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
            답장
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
            전체답장
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
            전달하기
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
            다시보내기
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
            삭제
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">
            이동
          </button>
          <div className="relative">
            <button className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1">
              추가기능
              <span>▼</span>
            </button>
          </div>
          <button
            onClick={handleAiClick}
            disabled={isLoading}
            className="px-3 py-1.5 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '처리 중...' : 'AI 사용하기'}
          </button>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            {isEditing ? '편집 완료' : '편집'}
          </button>
        </div>

        {/* Email Header */}
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-2">{email.date}</div>
          <button className="text-xs text-blue-600 hover:underline mb-4">
            헤더보기▼
          </button>
          <div className="mb-4">
            <div className="text-lg font-semibold text-gray-800 mb-4">
              {isEditing ? (
                <input
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              ) : (
                subject
              )}
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">보낸사람: </span>
                <span className="text-gray-800">
                  {isEditing ? (
                    <span className="flex flex-wrap gap-2">
                      <input
                        value={senderName}
                        onChange={(event) => setSenderName(event.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-xs"
                        placeholder="이름"
                      />
                      <input
                        value={senderEmail}
                        onChange={(event) => setSenderEmail(event.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-xs"
                        placeholder="email@example.com"
                      />
                    </span>
                  ) : (
                    <>
                      {senderName} &lt;{senderEmail}&gt;
                    </>
                  )}
                </span>
              </div>
              <div>
                <span className="text-gray-600">받는사람: </span>
                <span className="text-gray-800">
                  {isEditing ? (
                    <span className="flex flex-wrap gap-2">
                      <input
                        value={recipientName}
                        onChange={(event) =>
                          setRecipientName(event.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 text-xs"
                        placeholder="이름"
                      />
                      <input
                        value={recipientEmail}
                        onChange={(event) =>
                          setRecipientEmail(event.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 text-xs"
                        placeholder="email@example.com"
                      />
                    </span>
                  ) : (
                    <>
                      {recipientName} &lt;{recipientEmail}&gt;
                    </>
                  )}
                </span>
              </div>
              {ccText.trim() && (
                <div>
                  <span className="text-gray-600">참조: </span>
                  <span className="text-gray-800">
                    {isEditing ? (
                      <input
                        value={ccText}
                        onChange={(event) => setCcText(event.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                        placeholder="이름 <email@example.com>; 이름2 <email2@example.com>"
                      />
                    ) : (
                      ccText
                    )}
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-3">
              <button className="text-xs text-blue-600 hover:underline">
                주소록 추가하기
              </button>
              <button className="text-xs text-blue-600 hover:underline">
                수신거부하기
              </button>
              <button className="text-xs text-blue-600 hover:underline">
                해킹의심메일신고
              </button>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="mb-6 whitespace-pre-line text-gray-800">
          {isEditing ? (
            <textarea
              value={body}
              onChange={(event) => setBody(event.target.value)}
              className="w-full min-h-[240px] border border-gray-300 rounded px-2 py-2 text-sm"
            />
          ) : (
            body
          )}
        </div>

        {/* Table */}
        {email.tableData && email.tableData.length > 0 && (
          <div className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400 bg-white">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-400 px-4 py-3 text-left text-sm font-semibold text-gray-800">
                    확인 요청 항목
                  </th>
                  <th className="border border-gray-400 px-4 py-3 text-left text-sm font-semibold text-gray-800">
                    현재 집계 여부 (OX)
                  </th>
                  <th className="border border-gray-400 px-4 py-3 text-left text-sm font-semibold text-gray-800">
                    데이터 추출 가능 여부
                  </th>
                </tr>
              </thead>
              <tbody>
                {email.tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-400 px-4 py-3 text-sm text-gray-700">
                      {row.item}
                    </td>
                    <td className="border border-gray-400 px-4 py-3 text-sm text-center font-medium">
                      {row.aggregationStatus}
                    </td>
                    <td className="border border-gray-400 px-4 py-3 text-sm text-gray-700">
                      {row.extractionAvailability}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Signature */}
        {/* {signature && (
          <div className="mb-6 pt-6 border-t border-gray-300">
            <div className="mb-4">
              <div className="text-3xl font-bold text-gray-300 mb-4 tracking-wider">
                NICE
              </div>
            </div>
            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <div className="font-semibold text-base">{signature.name}</div>
              <div>{signature.position}</div>
              <div>{signature.department}</div>
              {signature.phone && <div>Tel: {signature.phone}</div>}
              {signature.fax && <div>Fax: {signature.fax}</div>}
              <div>Email: {signature.email}</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-300 text-sm text-gray-600">
              <div className="font-semibold mb-2 text-base">KIS정보통신</div>
              <div>08288 서울시 구로구 새말로 97 센터포인트 웨스트 22층</div>
              <div>www.kisvan.co.kr</div>
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-300">
              KIS정보통신
            </div>
          </div>
        )} */}

        {/* Disclaimer */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500">
          본 메일은 수신자에게만 발송된 기밀 메일입니다. 수신자가 아닌 경우
          본 메일의 내용을 공개하거나 복사, 배포, 변경하는 행위를 금지합니다.
          실수로 수신된 경우 즉시 삭제해 주시기 바랍니다.
        </div>
      </div>
    </div>
  );
}
