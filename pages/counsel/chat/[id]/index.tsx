import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../../public/icons/arrow.svg';
import ChatSection from '@/components/ChatSection';
import ChatBox from '@/components/ChatBox';
import makeSection from '@/utils/makeSection';
import Layout from '@/components/Layout';
import ChatVoice from '@/components/ChatVoice';
import FinishCounselModal from '@/modal/FinishCounselModal';
import { getCookieValue } from '@/utils/getCookieValue';
import { useRouter } from 'next/router';
import fetcher from '@/utils/fetchers';
import useSWR from 'swr';
import { chatCounselAPI } from '@/pages/api/counsel';
import moment from 'moment';
import useMicDiscription from '@/hooks/useMicDiscription';
import useChatTest, { CHAT_KEY } from '@/hooks/useChatTest';

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
}

const Chat = ({ token }: Props) => {
  const router = useRouter();
  const counselId: any = router.query.id!;
  const { enableMicDiscription } = useMicDiscription();
  // const { data: chatData, mutate: mutateChat } = useSWR(
  //   `/api/counsel/proceed/${counselId}`,
  //   (url) => fetcher(url, token)
  // );
  const messagesEndRef = useRef<any>(null);

  // const chatSections = makeSection(
  //   chatData?.messages ? chatData.messages.flat() : []
  // );
  const [chatBoxHeight, setChatBoxHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    enableMicDiscription();
  }, []);

  const [chat, setChat] = useState('');

  const onChangeChat = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isLoading) {
        setChat(e.target.value);
      }
    },
    [isLoading]
  );

  const [isVoice, setIsVoice] = useState(false);
  const onClickVoice = useCallback(() => {
    setIsVoice((prev) => !prev);
  }, []);

  // const onSubmitForm = useCallback(
  //   async (chat: string) => {
  //     setIsLoading((prev) => !prev);

  //     if (chat.trim() && chatData?.messages) {
  //       const savedChat = chat;
  //       mutateChat((prevChatData: any) => {
  //         prevChatData.messages.push({
  //           role: '내담자',
  //           message: savedChat,
  //           date: moment().format('YYYY-MM-DD'),
  //         });
  //         return prevChatData;
  //       }).then(() => {
  //         setChat('');
  //         scrollToBottom();
  //       });

  //       const result = await chatCounselAPI(token, counselId, chat);

  //       if (result) {
  //         if (isVoice) {
  //           const utterance = new SpeechSynthesisUtterance(result);
  //           speechSynthesis.speak(utterance);
  //         }
  //         mutateChat((prevChatData: any) => {
  //           prevChatData.messages.push({
  //             role: '상담원',
  //             message: result,
  //             date: moment().format('YYYY-MM-DD'),
  //           });
  //           return prevChatData;
  //         }).then(() => {
  //           setChat('');
  //           scrollToBottom();
  //           setIsLoading((prev) => !prev);
  //         });
  //       }
  //     }
  //   },
  //   [chat, chatData, isVoice]
  // );

  // useEffect(() => {
  //   scrollToBottom();
  // }, [chatData, isVoice, chatBoxHeight]);

  const [finishCounselModal, setFinishCounselModal] = useState(false);
  const handleFinishCounselModal = useCallback(() => {
    setFinishCounselModal((prev) => !prev);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 시연 테스트 데이터
  const { initializeChat } = useChatTest();
  const { data: chatData, mutate } = useSWR(CHAT_KEY);
  const chatSections = makeSection(chatData ? chatData : []);

  const [count, setCount] = useState(1);
  const dummyChatbot = [
    {
      role: '상담원',
      message:
        '안녕하세요 김도란님! 어떤 내용이든 좋으니, 저에게 마음편히 이야기해주세요.',
      date: '2024-06-26',
    },
    {
      role: '상담원',
      message:
        '최근들어 갑자기 우울하시고 무기력하시군요. 하루하루가 정말 힘드신가 봐요.',
      date: '2024-06-26',
    },
    {
      role: '상담원',
      message: '힘든 감정을 느끼게 된 사건이나 계기가 있었나요?',
      date: '2024-06-26',
    },
    {
      role: '상담원',
      message:
        '저도 예전에 그런 적이 있어요. 그런데 작은 행동들이 저에게 큰 도움이 되었어요.',
      date: '2024-06-26',
    },
    {
      role: '상담원',
      message:
        '잠시 시간을 내어 근처를 걷거나 크게 숨을 들이쉬는 것만으로도 기분이 나아졌어요. 김도란님도 한 번 시도해보시는 것은 어떨까요?',
      date: '2024-06-26',
    },
    {
      role: '상담원',
      message:
        '김도란님께서 변화할 용기가 있어서 다행이에요. 힘들면 언제든지 다시 돌아와도 좋아요.',
      date: '2024-06-26',
    },
  ];

  useEffect(() => {
    initializeChat([dummyChatbot[0]]);
  }, []);

  const onSubmitForm = useCallback(
    (chat: string) => {
      setIsLoading((prev) => !prev);

      mutate((prevChatData: any) => {
        prevChatData.push({
          role: '내담자',
          message: chat,
          date: '2024-06-26',
        });
        return prevChatData;
      }).then(() => {
        setChat('');
        scrollToBottom();
      });

      const randomNum = Math.floor(Math.random() * 4) + 1;
      const timer = setTimeout(() => {
        if (isVoice) {
          const utterance = new SpeechSynthesisUtterance(
            dummyChatbot[count].message
          );
          speechSynthesis.speak(utterance);
        }
        mutate((prevChatData: any) => {
          prevChatData.push({
            role: '상담원',
            message: dummyChatbot[count].message,
            date: '2024-06-26',
          });
          return prevChatData;
        }).then(() => {
          setChat('');
          setIsLoading((prev) => !prev);
          setCount((prev) => prev + 1);
        });
      }, randomNum * 1000);

      return timer;
    },
    [chat, chatData, count, isVoice]
  );

  useEffect(() => {
    scrollToBottom();
    console.log('bottom');
  }, [chatData, isVoice, chatBoxHeight, count]);

  //

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

  return {
    props: {
      token,
    },
  };
};

export default Chat;
