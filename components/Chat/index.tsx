import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import animationData from '../../public/animation/gpt-loading.json';
import Image from 'next/image';

// import image
import CounselorPNG from '../../public/image/counselor.png';

const ChatStyle = styled.div`
  .content {
    max-width: 312px;
    padding: 14px;
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 20px);
    font-weight: 400;
    letter-spacing: -0.4px;
    text-transform: uppercase;
  }

  .sender {
    padding: 14px;
    background: var(--doranblue02, #e1e2ff);
    border-radius: 16px 16px 0px 16px;
    color: #000;
    max-width: 312px;
    float: right;
    margin-bottom: 16px;
  }

  .receiver {
    display: flex;
    align-items: flex-end;
    gap: 13px;
    border-radius: 16px 16px 16px 0px;
    color: var(--gray09, #222);
    clear: right;
    margin-bottom: 16px;

    .profile {
      width: 68px;
      height: 76px;
      background: var(--gray01, #f7f7f7);
    }

    .content {
      border-radius: 16px 16px 16px 0px;
      background: var(--gray01, #f7f7f7);
    }
  }

  .loading {
    display: flex;
    align-items: flex-end;
    gap: 14px;
    border-radius: 16px 16px 16px 0px;
    color: var(--gray09, #222);
    clear: right;

    .content {
      width: 86px;
      height: 52px;
      background: var(--gray01, #f7f7f7);
      border-radius: 16px 16px 16px 0px;
    }
  }
`;

interface Props {
  chat: { [key: string]: string } | undefined;
}

const Chat = ({ chat }: Props) => {
  return (
    <ChatStyle>
      {chat ? (
        chat.role === '내담자' ? (
          <div className='sender content'>{chat.message}</div>
        ) : (
          <div className='receiver'>
            <Image src={CounselorPNG} width={40} height={40} alt='profile' />
            <div className='content'>{chat.message}</div>
          </div>
        )
      ) : (
        <div className='loading'>
          <Image src={CounselorPNG} width={40} height={40} alt='profile' />
          <div className='content animation'>
            <Lottie color={'red'} animationData={animationData} />
          </div>
        </div>
      )}
    </ChatStyle>
  );
};

export default Chat;
