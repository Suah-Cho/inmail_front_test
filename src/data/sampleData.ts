import { User, Email, Signature } from '../types';

export const currentUser: User = {
  name: '조수아',
  email: 'sacho@kisvan.co.kr',
  messageCount: 0,
  lastAccessIp: '10.78.77.43',
  lastAccessDate: '2026-01-21 15:57',
};

export const sampleEmail: Email = {
  id: '1',
  date: '2026-01-21 14:45',
  subject: '[RE][KIS정보통신 IT] 업무망 Buddy 인터넷 검색 적용 여부 문의',
  sender: {
    name: '박정태',
    email: 'withcare@nice.co.kr',
  },
  recipient: {
    name: '조수아',
    email: 'sacho@kisvan.co.kr',
  },
  cc: [
    { name: '황윤진', email: 'yjhwang@nice.co.kr' },
    { name: '임지원', email: 'jwl56@nice.co.kr' },
  ],
  body: `
안녕하세요. 박정태입니다.



전화상으로 설명해 드린 것처럼



검색을 하게되면 홀딩스 Buddy 웹서버에서,

당사 내부의 별도 Proxy(검색엔진)를 경유하여 외부 검색결과 (메타정보만)를 다시 Buddy 웹서버에 리턴해주는 로직입니다.



추가 문의사항 등 있으시면 연락을 주세요.



감사합니다.





박정태  팀장

IT혁신실

M 010-8312-9505

T  02-2122-4493

F  02-2122-4481

E  withcare@nice.co.kr

NICE 홀딩스

07237 서울특별시 영등포구 은행로 17



www.nice.co.kr




  ------------------Original Message--------------------
  보낸사람 : 조수아<sacho@kisvan.co.kr>
  받은시간 : 2026-01-21 14:11:53
  받는사람 : 박정태<withcare@nice.co.kr>
  제목 : [KIS정보통신 IT] 업무망 Buddy 인터넷 검색 적용 여부 문의




팀장님, 안녕하세요.
KIS정보통신 IT기획실 조수아입니다.



업무망 Buddy의 인터넷 검색 기능과 관련하여 확인 요청드리고자 연락드립니다.



Buddy에서 홀딩스 서버를 통해 웹 검색이 가능한 것으로 알고 있는데, 

현재 K정통 업무망 Buddy에도 해당 기능이 적용되어 있는지 문의드립니다.


저희 부서에서는 별도로 요청드린 이력이 없으나, 

‘웹 검색’ 기능을 활성화하여 검색 시 최근 정보가 조회되는 것으로 보여 확인이 필요하여 문의드리게 되었습니다.



만약 현재 설정되어 있지 않은 상태라면, 업무망에서 인터넷 검색을 사용하기 위해 필요한 절차나 작업 사항을 안내해 주시면 감사하겠습니다.



확인 부탁드리며, 감사합니다.









조수아

매니저 / IT본부 IT기획실

M +82 10 7384 2979

T +82 2 2101 1607

F +82 2 2026 8821

E sacho@kisvan.co.kr

KIS정보통신

08288 서울특별시 구로구 새말로97
(구로동, 신도림테크노마트) 센터포인트웨스트 23층

www.kisvan.co.kr

 

 







 

`,
  tableData: undefined,
};

export const signature: Signature = {
  name: '조상호',
  position: '매니저',
  department: 'POS개발실',
  phone: '010-2785-5289',
  fax: '',
  email: 'shcho@okpos.co.kr',
};
