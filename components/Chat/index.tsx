import React from 'react';
import styled from 'styled-components';

const ChatStyle = styled.div`
  margin-bottom: 16px;

  .content {
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
    max-width: fit-content;
    float: right;
  }

  .receiver {
    display: flex;
    align-items: flex-end;
    gap: 14px;
    border-radius: 16px 16px 16px 0px;
    color: var(--gray09, #222);
    clear: right;

    .profile {
      width: 68px;
      height: 76px;
      background: var(--gray01, #f7f7f7);
    }

    .content {
      background: var(--gray01, #f7f7f7);
    }
  }
`;

interface Props {
  chat: { [key: string]: string } | undefined;
}

const Chat = ({ chat }: Props) => {
  console.log(chat);
  return (
    <ChatStyle>
      {chat ? (
        chat.type === 'sender' ? (
          <div className='sender content'>{chat.content}</div>
        ) : (
          <div className='receiver'>
            <div className='profile'></div>
            <div className='content'>{chat.content}</div>
          </div>
        )
      ) : (
        <div className='receiver'>
          <div className='profile'></div>
          <div className='content'>...</div>
        </div>
      )}
    </ChatStyle>
  );
};

export default Chat;
