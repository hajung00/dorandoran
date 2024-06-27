import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import moment from 'moment';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../../public/icons/arrow.svg';

// import components
import ChatSection from '@/components/ChatSection';
import ChatBox from '@/components/ChatBox';
import Layout from '@/components/Layout';
import ChatVoice from '@/components/ChatVoice';
import FinishCounselModal from '@/modal/FinishCounselModal';

// import api
import { chatCounselAPI } from '@/pages/api/counsel';

// import hooks
import { getCookieValue } from '@/utils/getCookieValue';
import useMicDiscription from '@/hooks/useMicDiscription';
import makeSection from '@/utils/makeSection';
import fetcher from '@/utils/fetchers';

const Header = styled.header`
  padding: 60px 20px 10px 20px;
  color: #222;
  background: var(--gray01, #f7f7f7);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;

  .icon-wrapper {
    padding: 9.5px 8px;
    cursor: pointer;
  }

  .title {
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
    text-transform: uppercase;
    margin-left: 61px;
  }

  & > button {
    display: flex;
    padding: 6px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: var(--doranblue02, #e1e2ff);
    border: none;
    color: var(--doranblue, #565bff);
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 18px);
    font-weight: 500;
    letter-spacing: -0.36px;
    text-transform: uppercase;
    cursor: pointer;
  }
`;

interface Props {
  token: string;
  initialChatDate: any;
}

const Chat = ({ token, initialChatDate }: Props) => {
  const router = useRouter();
  const counselId: any = router.query.id!;
  const { enableMicDiscription } = useMicDiscription(); // 음성 설명 활성화
  const { data: chatData, mutate: mutateChat } = useSWR(
    `/api/counsel/proceed/${counselId}`,
    (url) => fetcher(url, token),
    {
      fallbackData: initialChatDate,
    }
  );
  const messagesEndRef = useRef<any>(null);
  const chatSections = makeSection(
    chatData?.messages ? chatData.messages.flat() : []
  ); // 채팅 날자별로 분리
  const [chat, setChat] = useState(''); // 상담자가 작성한 chat
  const [isVoice, setIsVoice] = useState(false); // 음성 활성화 여부
  const [chatBoxHeight, setChatBoxHeight] = useState(0); // 입력칸 높이
  const [isLoading, setIsLoading] = useState(false); // chatbot 답변 로딩

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  // 음성 설명 활성화
  useEffect(() => {
    enableMicDiscription();
  }, []);

  // chatbot 로딩중이 아닐 경우에만 입력 가능하도록 설정
  const onChangeChat = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isLoading) {
        setChat(e.target.value);
      }
    },
    [isLoading]
  );

  const onClickVoice = useCallback(() => {
    setIsVoice((prev) => !prev);
  }, []);

  // 전송 클릭 이벤트
  const onSubmitForm = useCallback(
    async (chat: string) => {
      setIsLoading((prev) => !prev);

      if (chat.trim() && chatData?.messages) {
        const savedChat = chat;
        mutateChat((prevChatData: any) => {
          prevChatData.messages.push({
            role: '내담자',
            message: savedChat,
            date: moment().format('YYYY-MM-DD'),
          });
          return prevChatData;
        }).then(() => {
          setChat('');
          scrollToBottom();
        });
        const result = await chatCounselAPI(token, counselId, chat);

        if (result) {
          // 음성 채팅일 경우, 답변 읽어주기
          if (isVoice) {
            const utterance = new SpeechSynthesisUtterance(result);
            speechSynthesis.speak(utterance);
          }
          mutateChat((prevChatData: any) => {
            prevChatData.messages.push({
              role: '상담원',
              message: result,
              date: moment().format('YYYY-MM-DD'),
            });
            return prevChatData;
          }).then(() => {
            setChat('');
            scrollToBottom();
            setIsLoading((prev) => !prev);
          });
        }
      }
    },
    [chat, chatData, isVoice]
  );

  useEffect(() => {
    scrollToBottom();
  }, [chatData, isVoice, chatBoxHeight]);

  // 스크롤 맨 밑으로 내리기
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 상담 종료 모달
  const [finishCounselModal, setFinishCounselModal] = useState(false);
  const handleFinishCounselModal = useCallback(() => {
    setFinishCounselModal((prev) => !prev);
  }, []);

  return (
    <Layout>
      <Header>
        <div
          className='icon-wrapper'
          onClick={() => {
            router.back();
          }}
        >
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
        <div className='title'>상담 진행중</div>
        <button onClick={handleFinishCounselModal}>상담 종료하기</button>
      </Header>
      <ChatSection
        chatSections={chatSections}
        isLoading={isLoading}
        isVoice={isVoice}
        chatBoxHeight={chatBoxHeight}
        ref={messagesEndRef}
      />
      {!isVoice ? (
        <ChatBox
          chat={chat}
          onChangeChat={onChangeChat}
          onClickVoice={onClickVoice}
          onSubmitForm={onSubmitForm}
          isLoading={isLoading}
          setChatBoxHeight={setChatBoxHeight}
        />
      ) : (
        <ChatVoice
          moveChatBox={onClickVoice}
          onSubmitForm={onSubmitForm}
          isLoading={isLoading}
        />
      )}
      {finishCounselModal && (
        <FinishCounselModal
          token={token}
          finishCounselModal={finishCounselModal}
          counselId={counselId}
          onClosed={handleFinishCounselModal}
        />
      )}
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;
  const counselId: any = context.query.id!;
  const initialChatDate = token
    ? await fetcher(`/api/counsel/proceed/${counselId}`, token)
    : null;

  return {
    props: {
      token,
      initialChatDate,
    },
  };
};

export default Chat;
