import React, { MutableRefObject, forwardRef, useCallback } from 'react';
import Chat from '../Chat';
import { Scrollbars } from 'react-custom-scrollbars';
import styled from 'styled-components';
import moment from 'moment';

export const ChatZone = styled.div`
  width: 100%;
  display: flex;
  flex: 1;

  .custom {
    height: auto !important;
  }
`;

export const Section = styled.section`
  margin-top: 20px;
  padding: 0 20px;
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
  // setSize: (f: (index: number) => number) => any;
  setSize: any;
  isReachingEnd: boolean;
  isLoading: boolean;
}

const ChatSection = ({
  chatSections,
  setSize,
  isReachingEnd,
  isLoading,
}: any) => {
  // 채팅을 위로 올렸을 때, 이전 채팅 가져오기
  // const onScroll = useCallback((values) => {
  //   if (values.scrollTop === 0 && !isReachingEnd) {
  //     setSize((prevSize) => prevSize + 1).then(() => {
  //       //스크롤 위치 유지
  //       const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
  //       if (current) {
  //         current.scrollTop(current.getScrollHeight() - values.scrollHeight);
  //       }
  //     });
  //   }
  // }, []);

  return (
    <ChatZone>
      <Scrollbars className='custom' autoHide>
        {Object.entries(chatSections).map(([date, chats]: any, i) => {
          return (
            <Section key={i}>
              <StickyHeader className={`section-${date}`} key={date}>
                <button>{moment(date).format('YYYY년 M월 DD일')}</button>
              </StickyHeader>
              {chats.map((chat: { [key: string]: string }, idx: number) => (
                <Chat key={idx} chat={chat} />
              ))}
              {isLoading && <Chat chat={undefined} />}
            </Section>
          );
        })}
      </Scrollbars>
    </ChatZone>
  );
};

export default ChatSection;
