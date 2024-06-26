import React, { forwardRef } from 'react';
import Chat from '../Chat';
import styled from 'styled-components';
import moment from 'moment';

export const ChatZone = styled.div<{ isVoice: string; chatBoxHeight: number }>`
  width: 100%;
  margin-bottom: ${(props) =>
    props.isVoice === 'true'
      ? '320px'
      : props.chatBoxHeight !== 0
      ? `${props.chatBoxHeight + 104}px`
      : '104px'};
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 20px;
`;

export const Section = styled.section`
  margin-top: 20px;
  width: 100%;
`;

export const StickyHeader = styled.div`
  display: flex;
  justify-content: center;
  height: 27px;
  margin-bottom: 20px;

  & > button {
    border: none;
    background: #fff;
    color: var(--gray06, #898989);
    font-family: 'Pretendard';
    font-size: clamp(14px, 4vw, 16px);
    font-weight: 500;
    letter-spacing: -0.32px;
    text-transform: uppercase;
  }
`;

interface Props {
  chatSections: any;
  isLoading?: boolean;
  isVoice?: boolean;
  chatBoxHeight?: number;
}

const ChatSection = forwardRef<HTMLDivElement, Props>(
  ({ isVoice, chatSections, isLoading, chatBoxHeight }, ref) => {
    return (
      <ChatZone
        isVoice={`${isVoice}`}
        chatBoxHeight={chatBoxHeight ? chatBoxHeight : 0}
      >
        {chatSections &&
          Object.entries(chatSections).map(([date, chats]: any, i) => {
            return (
              <Section key={i}>
                <StickyHeader className={`section-${date}`} key={date}>
                  <button>{moment(date).format('YYYY년 M월 DD일')}</button>
                </StickyHeader>
                {chats.map((chat: { [key: string]: string }, idx: number) => (
                  <Chat key={idx} chat={chat} />
                ))}
              </Section>
            );
          })}
        {isLoading && <Chat chat={undefined} />}
        <div ref={ref}></div>
      </ChatZone>
    );
  }
);

ChatSection.displayName = 'ChatSection';

export default ChatSection;
