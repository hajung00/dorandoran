'use client';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import React, { useCallback, useEffect, useState } from 'react';
import ArrowSVG from '../../public/icons/arrow-right.svg';
import ContentModal from '@/modal/ContentModal';
import ScrollContainer from 'react-indiana-drag-scroll';

const Content = styled.div`
  height: max-content;
  margin-bottom: 120px;
`;

const ContentHeader = styled.div`
  margin-top: 54px;
  margin-bottom: 24px;
  padding: 0 20px;
  & > div {
    display: inline-block;
    padding: 4px 12px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    background: var(--doranblue02, #f3f3ff);
    color: var(--doranblue, #565bff);
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 18px);
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 25.2px */
    margin-bottom: 20px;
    margin-top: 16px;

    & > svg {
      transform: translateY(12%);
    }
  }

  & > p {
    padding-top: 37px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(22px, 6vw, 26px);
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 36.4px */
  }

  .today-famous {
    width: 100%;
    padding: 30px 20px;
    border-radius: 16px;
    border: 1px solid var(--doranblue02, #e1e2ff);
    background: var(--doranblue04, #f9f9ff);
    margin: 0 !important;
    & > div {
      display: inline-block;
      padding: 6px 12px;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      background: var(--doranblue02, #e1e2ff);
      color: var(--doranblue, #565bff);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 18px);
      font-style: normal;
      font-weight: 600;
      line-height: 140%; /* 25.2px */
      margin-bottom: 20px;
    }

    & > p {
      color: var(--gray08, #444);
      font-family: 'Pretendard';
      font-size: clamp(18px, 5vw, 22px);
      font-style: normal;
      font-weight: 600;
      line-height: 140%; /* 30.8px */
    }
  }
`;

const ContentSection = styled.div`
  .title {
    padding: 0 20px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(20px, 5vw, 24px);
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 33.6px */
  }

  .description {
    padding: 0 20px;
    margin-top: 8px;
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: clamp(15px, 4vw, 18px);
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 25.2px */
  }

  .meditation-item-wrapper {
    padding: 0 20px;
    display: flex;
    gap: 16px;
    margin-top: 20px;
    margin-bottom: 54px;
  }

  .content-list {
    margin-top: 28px;

    & > ul {
      display: flex;
      list-style: none;
    }
    & > ul > li {
      min-width: fit-content;
      border-bottom: 4px solid #eaeaea;
      padding: 10px 20px 18px 20px;
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: clamp(18px, 4vw, 20px);
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    & > ul > li:first-child {
      padding: 10px 20px 18px 20px;
    }

    .current {
      border-bottom: 4px solid #565bff;
    }
  }

  .content-wrapper {
    margin-top: 26px;
    margin-bottom: 18px;
    height: 290px;
    background: var(--gray01, #f7f7f7);
  }
`;

const MeditationTime = styled.div<{ color: string }>`
  min-width: 21.6%;
  aspect-ratio: 1 / 1;
  border: ${(props: any) => props.color && `1px solid ${props.color}`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--doranblue, #565bff);
  font-family: Pretendard;
  font-size: clamp(18px, 4vw, 20px);
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;

const Contents = () => {
  const user = true;
  // const user = false;

  const meditationTime = [
    { type: '3분', color: '#E1E2FF' },
    { type: '5분', color: '#BEC0FF' },
    { type: '10분', color: '#9EA1FF' },
    { type: '30분', color: '#878AFF' },
    { type: '1시간', color: '#797DFF' },
  ];

  const psychotherapyContent = [
    { type: '당신을 위한 콘텐츠', link: 'link1' },
    { type: '우울증', link: 'link2' },
    { type: '스트레스', link: 'link3' },
    { type: '불안증', link: 'link4' },
    { type: '알코올 중독', link: 'link5' },
    { type: '흡연 중독', link: 'link6' },
  ];

  const [psychotherapyList, setPsychotherapyList] = useState([
    ...psychotherapyContent,
  ]);
  const [currentContent, setCurrentContent] = useState(
    psychotherapyList[0].link
  );
  const [currentPsychotherapyList, setCurrentPsychotherapyList] = useState(
    psychotherapyContent[0].type
  );
  const [currentMeditationTime, setCurrentMeditationTime] = useState('3분');
  const [contentModal, setContentModal] = useState(false);

  useEffect(() => {
    if (!user) {
      const newList = psychotherapyList.slice(1, 7);
      setPsychotherapyList([...newList]);
    }
  }, [user]);

  const psychotherapyTypeHandler = useCallback((type: string) => {
    const index = psychotherapyList.findIndex((list) => list.type === type);
    setCurrentPsychotherapyList(psychotherapyList[index].type);
    setCurrentContent(psychotherapyList[index].link);
  }, []);

  const handelContentModal = useCallback((type: string) => {
    setCurrentMeditationTime(type);
    setContentModal((prev) => !prev);
  }, []);

  return (
    <Layout>
      <Content>
        <ContentHeader>
          {user ? (
            <div className='today-famous'>
              <div>오늘의 명언</div>
              <p>
                당신의 가치는 당신이 처한 상황으로 결정되지
                <br /> 않습니다. 당신은 그 이상입니다.
              </p>
            </div>
          ) : (
            <>
              <p>
                심리검사를 완료하고
                <br />
                맞춤 콘텐츠를 추천받아보세요!
              </p>
              <div>
                심리검사 하러 가기
                <ArrowSVG
                  width={20}
                  height={20}
                  alt={'arrow'}
                  stroke={'#565BFF'}
                />
              </div>
            </>
          )}
        </ContentHeader>
        <ContentSection>
          <p className='title'>명상 콘텐츠</p>
          <p className='description'>
            하루 3분부터 시작하는 당신을 위한 명상을 시작해보세요.
          </p>
          <ScrollContainer className='meditation-item-wrapper'>
            {meditationTime.map((item, i) => (
              <MeditationTime
                color={item.color}
                key={i}
                onClick={() => {
                  handelContentModal(item.type);
                }}
              >
                {item.type}
              </MeditationTime>
            ))}
          </ScrollContainer>
        </ContentSection>
        <ContentSection>
          <p className='title'>심리치료 콘텐츠</p>
          <p className='description'>
            마음상태에 따라 영상을 고르고 시청해보세요.
          </p>
          <ScrollContainer className='content-list'>
            <ul>
              {psychotherapyList.map((item, i) => (
                <li
                  className={`${
                    currentPsychotherapyList === item.type ? 'current' : ''
                  }`}
                  key={i}
                  onClick={() => {
                    psychotherapyTypeHandler(item.type);
                  }}
                >
                  {item.type}
                </li>
              ))}
            </ul>
          </ScrollContainer>
          <div className='content-wrapper'>{currentContent}</div>
          <p className='title'>심리치료 유튜브 제목</p>
        </ContentSection>
      </Content>

      <Footer />
      {contentModal && (
        <ContentModal
          type={currentMeditationTime}
          onClosed={() => {
            setContentModal((prev) => !prev);
          }}
        />
      )}
    </Layout>
  );
};

export default Contents;
