'use client';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import React, { useCallback, useEffect, useState } from 'react';
import ArrowSVG from '../../public/icons/arrow-right.svg';
import ContentModal from '@/modal/ContentModal';
import ScrollContainer from 'react-indiana-drag-scroll';
import { getCookieValue } from '@/utils/getCookieValue';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';
import makeEmbedUrl from '@/utils/makeEmbedUrl';

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
      max-width: 400px;
      color: var(--gray08, #444);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4.5vw, 22px);
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
    margin: 0 10px;
    margin-top: 28px;

    & > ul,
    li {
      margin: 0;
      padding: 0;
      list-style: none;
      box-sizing: border-box;
    }

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

interface Props {
  token: string;
}
const Contents = ({ token }: Props) => {
  const meditationTime = [
    { type: '3분', color: '#E1E2FF' },
    { type: '5분', color: '#BEC0FF' },
    { type: '10분', color: '#9EA1FF' },
    { type: '30분', color: '#878AFF' },
    { type: '1시간', color: '#797DFF' },
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

  const responseData = [
    {
      title:
        '당장 내일 죽을 수도 있다는 의사 말에도 끊지 못하는 술│알코올 의존증 치료하는 과정│국가에서 지정한 알콜 치료 병원의 모습│다큐 시선│#EBS건강',
      link: 'https://www.youtube.com/watch?v=L_xmM9_iRJQ',
      thumbnailLink: 'https://img.youtube.com/vi/L_xmM9_iRJQ/0.jpg',
    },
    {
      title: '[ 새해계획 ] 의사가 알려주는 확실한 금연 방법 !',
      link: 'https://www.youtube.com/watch?v=I0ypGCXTGww',
      thumbnailLink: 'https://img.youtube.com/vi/I0ypGCXTGww/0.jpg',
    },
    {
      title:
        '혼술이 알코올 중독의 시작이다? l 건강한 음주습관 l #신신당부 17화',
      link: 'https://www.youtube.com/watch?v=6fKph4n74Rg',
      thumbnailLink: 'https://img.youtube.com/vi/6fKph4n74Rg/0.jpg',
    },
    {
      title: '[알코올중독 치료] 알코올 의존증 증상 완벽하게 치료하고 싶으세요?',
      link: 'https://www.youtube.com/watch?v=0hNDg7s4K-0',
      thumbnailLink: 'https://img.youtube.com/vi/0hNDg7s4K-0/0.jpg',
    },
    {
      title: '금연의 이익ㅣ금연 EP.3',
      link: 'https://www.youtube.com/watch?v=cu8irdThyJE',
      thumbnailLink: 'https://img.youtube.com/vi/cu8irdThyJE/0.jpg',
    },
  ];

  const [psychotherapyList, setPsychotherapyList] = useState([
    ...psychotherapyContent,
  ]);

  const [currentContentCategory, setCurrentContentCategory] = useState(
    psychotherapyContent[0].en
  );

  const { data: testCheck, isLoading } = useSWR(
    '/api/assessment/has-result',
    fetcher
  );
  const { data: contentsData, isLoading: contentsLoading } = useSWR(
    `/api/contents/main/${currentContentCategory}`,
    fetcher
  );
  const [embedUrlData, setEmbedUrlData] = useState<any>();

  useEffect(() => {
    contentsData &&
      setEmbedUrlData(makeEmbedUrl(contentsData?.psychotherapyContents));
  }, [contentsLoading, contentsData]);

  const [currentMeditationTime, setCurrentMeditationTime] = useState('3분');
  const [contentModal, setContentModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !testCheck) {
      const newList = psychotherapyList.slice(1, 7);
      setPsychotherapyList([...newList]);
      setCurrentContentCategory('depression');
    }
  }, [testCheck]);

  const psychotherapyTypeHandler = useCallback((type: string) => {
    setCurrentContentCategory(type);
    setEmbedUrlData([]);
  }, []);

  console.log(embedUrlData);
  const handelContentModal = useCallback((type: string) => {
    setCurrentMeditationTime(type);
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
            </ul>
          </ScrollContainer>
          {embedUrlData &&
            embedUrlData.map((item: { [key: string]: any }, i: number) => (
              <>
                <div className='content-wrapper'>
                  <iframe
                    width={'100%'}
                    height='290'
                    src={item.embedUrl}
                    title='YouTube video player'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  ></iframe>
                </div>
                <p className='title'>{item.title}</p>
              </>
            ))}
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
