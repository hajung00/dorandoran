'use client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import useSWR from 'swr';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../public/icons/arrow-right.svg';

// import components
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';
import ContentModal from '@/modal/ContentModal';

// import hooks
import fetcher from '@/utils/fetchers';
import makeEmbedUrl from '@/utils/makeEmbedUrl';
import { getCookieValue } from '@/utils/getCookieValue';

const Content = styled.div`
  height: max-content;
  margin-bottom: 120px;
`;

const ContentHeader = styled.section`
  margin-top: 54px;
  margin-bottom: 24px;
  padding: 0 20px;
  font-family: 'Pretendard';

  .intend-test {
    & > p {
      padding-top: 37px;
      color: var(--gray09, #222);
      font: var(--Pretendard--26-600);
      line-height: 140%; /* 36.4px */
    }

    & > button {
      padding: 4px 12px;
      border-radius: 6px;
      background: var(--doranblue02, #f3f3ff);
      color: var(--doranblue, #565bff);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 18px);
      font-style: normal;
      font-weight: 600;
      line-height: 140%;
      margin-bottom: 20px;
      margin-top: 16px;
      border: none;
      cursor: pointer;

      & > svg {
        transform: translateY(12%);
      }
    }
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
      border-radius: 6px;
      background: var(--doranblue02, #e1e2ff);
      color: var(--doranblue, #565bff);
      font-size: clamp(16px, 4vw, 18px);
      font-weight: 600;
      line-height: 140%; /* 25.2px */
      margin-bottom: 20px;
    }

    & > p {
      max-width: 400px;
      color: var(--gray08, #444);
      font-size: clamp(16px, 4.5vw, 22px);
      font-style: normal;
      font-weight: 600;
      line-height: 140%; /* 30.8px */
    }
  }
`;

const ContentSection = styled.div`
  & > p {
    font-family: 'Pretendard';
    line-height: 140%; /* 33.6px */
  }

  .title {
    padding: 0 20px;
    color: var(--gray09, #222);
    font-size: clamp(20px, 5vw, 24px);
    font-weight: 600;
  }

  .description {
    padding: 0 20px;
    margin-top: 8px;
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: clamp(15px, 4vw, 18px);
    font-weight: 500;
  }

  .meditation-item-wrapper {
    padding: 0 20px;
    display: flex;
    gap: 16px;
    margin-top: 20px;
    margin-bottom: 54px;
  }

  .content-list {
    margin: 0 10px;
    margin-top: 28px;
  }
`;

const ContentTypeList = styled.ul`
  display: flex;
  list-style: none;

  &,
  & > li {
    list-style: none;
    cursor: pointer;
  }

  & > li {
    min-width: fit-content;
    border-bottom: 4px solid #eaeaea;
    padding: 10px 20px 18px 20px;
    color: var(--gray09, #222);
    font: var(--Pretendard--20-600);
  }

  .current {
    border-bottom: 4px solid #565bff;
  }
`;

const YoutubeSection = styled.section`
  & > p {
    padding: 0 20px;
    font: var(--Pretendard--20-600);
    margin-top: 18px;
    margin-bottom: 26px;
  }
`;

const MeditationTime = styled.div<{ color: string }>`
  cursor: pointer;
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

interface Props {
  token: string;
}

const meditationTime = [
  { time: 3, color: '#E1E2FF' },
  { time: 5, color: '#BEC0FF' },
  { time: 10, color: '#9EA1FF' },
  { time: 30, color: '#878AFF' },
  { time: 60, color: '#797DFF' },
];

const psychotherapyContent = [
  { en: 'personal', ko: '당신을 위한 콘텐츠' },
  { en: 'depression', ko: '우울증' },
  {
    en: 'stress',
    ko: '스트레스',
  },
  {
    en: 'anxiety',
    ko: '불안증',
  },
  {
    en: 'alcoholism',
    ko: '알코올 중독',
  },
  {
    en: 'smoking',
    ko: '흡연 중독',
  },
];

const Contents = ({ token }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  const [psychotherapyList, setPsychotherapyList] = useState([
    ...psychotherapyContent,
  ]); // 컨텐츠 목록
  const [currentContentCategory, setCurrentContentCategory] = useState(
    psychotherapyContent[0].en
  ); // 선택한 컨텐츠 목록(영어)
  const [embedUrlData, setEmbedUrlData] =
    useState<{ [key: string]: string }[]>(); // embedUrl 추가된 contentsData
  const { data: testCheck, isLoading } = useSWR(
    '/api/assessment/has-result',
    (url) => fetcher(url, token)
  );
  const { data: contentsData, isLoading: contentsLoading } = useSWR(
    `/api/contents/main/${currentContentCategory}`,
    (url) => fetcher(url, token)
  );

  // contentsData에 embedUrl 추가
  useEffect(() => {
    contentsData &&
      setEmbedUrlData(makeEmbedUrl(contentsData?.psychotherapyContents));
  }, [contentsLoading, contentsData]);

  // 심리검사에 따른 컨텐츠 목록 설정
  useEffect(() => {
    // 심리검사 하지 않은 경우에는 "당신을 위한 컨텐츠" 목록 제거
    if (!isLoading && !testCheck) {
      const newList = psychotherapyList.slice(1, 7);
      setPsychotherapyList([...newList]);
      setCurrentContentCategory('depression');
    }
  }, [testCheck]);

  // 심리검사 컨텐츠 목록 list 클릭 이벤트
  const psychotherapyTypeHandler = useCallback((type: string) => {
    setCurrentContentCategory(type);
    setEmbedUrlData([]);
  }, []);

  const [currentMeditationTime, setCurrentMeditationTime] = useState(3); // 선택한 명상 시간
  const [contentModal, setContentModal] = useState(false); // 명상 모달

  // 명상 3,5,10,... 분 클릭 시 이벤트
  const handelContentModal = useCallback((time: number) => {
    setCurrentMeditationTime(time);
    setContentModal((prev) => !prev);
  }, []);

  return (
    <Layout>
      <Content>
        <ContentHeader>
          {testCheck ? (
            <div className='today-famous'>
              <div>오늘의 명언</div>
              <p>{contentsData?.quotation}</p>
            </div>
          ) : (
            <div className='intend-test'>
              <p>
                심리검사를 완료하고
                <br />
                맞춤 콘텐츠를 추천받아보세요!
              </p>
              <button>
                심리검사 하러 가기
                <ArrowSVG
                  width={20}
                  height={20}
                  alt={'arrow'}
                  stroke={'#565BFF'}
                />
              </button>
            </div>
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
                  handelContentModal(item.time);
                }}
              >
                {item.time}분
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
            <ContentTypeList>
              {psychotherapyList.map((item, i) => (
                <li
                  className={`${
                    currentContentCategory === item.en ? 'current' : ''
                  }`}
                  key={i}
                  onClick={() => {
                    psychotherapyTypeHandler(item.en);
                  }}
                >
                  {item.ko}
                </li>
              ))}
            </ContentTypeList>
          </ScrollContainer>
          {embedUrlData &&
            embedUrlData.map((item: { [key: string]: any }, i: number) => (
              <YoutubeSection key={i}>
                <iframe
                  width={'100%'}
                  height='290'
                  src={item.embedUrl}
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
                <p>{item.title}</p>
              </YoutubeSection>
            ))}
        </ContentSection>
      </Content>
      <Footer />
      {contentModal && (
        <ContentModal
          time={currentMeditationTime}
          contentModal={contentModal}
          onClosed={() => {
            setContentModal((prev) => !prev);
          }}
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

export default Contents;
