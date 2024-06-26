import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../../public/icons/arrow.svg';
import RightArrowSVG from '../../../../public/icons/arrow-right.svg';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { getCookieValue } from '@/utils/getCookieValue';
import useSWR from 'swr';
import fetcher from '@/utils/fetchers';
import { startCounselAPI } from '@/pages/api/counsel';
import makeEmbedUrl from '@/utils/makeEmbedUrl';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding-bottom: 120px;
  .content-section {
  }

  .counsel-title {
    margin-top: 22px;
    padding: 0 20px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(20px, 5.5vw, 26px);
    font-weight: 600;
    line-height: 140%; /* 36.4px */
  }

  .counsel-summary {
    padding: 0 20px;
    margin-top: 26px;
    position: relative;

    & > p {
      color: var(--gray07, #666);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 18px);
      font-weight: 600;
      line-height: 150%; /* 27px */
      letter-spacing: -0.36px;
    }

    & > div {
      width: 100%;
      margin-top: 12px;
      border: 10px solid #f7f7f7;
      padding: 16px;
      max-height: 248px;
      min-height: 136px;
      height: fit-content;
      overflow-y: scroll;
      color: var(--gray08, #444);
      text-overflow: ellipsis;
      font-family: 'Pretendard';
      font-size: clamp(18px, 4vw, 20px);
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 28px */
      letter-spacing: -0.4px;
    }
  }

  .counsel-start-button {
    margin-top: 16px;
    padding: 6px 6px 6px 12px;
    border-radius: 18px;
    background: #fff;
    color: #565bff;
    font-family: 'Pretendard';
    font-size: clamp(14px, 4vw, 16px);
    font-weight: 600;
    letter-spacing: -0.4px;
    border-radius: 6px;
    background: var(--doranblue03, #f3f3ff);
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .counsel-summary::after {
    content: '';
    display: block;
    width: calc(100% + 20px);
    height: 22px;
    background: #f7f7f7;
    position: absolute;
    // top: 218px;
    bottom: -22%;
    left: -20px;
  }

  .title {
    margin-top: 48px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(20px, 5vw, 24px);
    font-weight: 600;
    line-height: 140%; /* 33.6px */
  }

  .content-wrapper {
    margin-top: 18px;
    padding: 0 20px;

    .main-title {
      margin-top: 106px;
      margin-bottom: 8px;
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: clamp(20px, 5vw, 24px);
      font-weight: 600;
      line-height: 140%; /* 33.6px */
    }

    .sub-discription {
      color: var(--gray07, #666);
      font-family: 'Pretendard';
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%; /* 25.2px */
    }
    & > div > p {
      margin-top: -18px;
      margin-bottom: 30px;
      color: var(--gray07, #666);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 20px);
      font-weight: 400;
      line-height: 140%; /* 28px */
    }
    .title {
      font-size: clamp(18px, 5vw, 22px);
      margin-bottom: 26px;
    }
    .content {
      width: 100vw;
      max-width: 512px;
      background: var(--gray01, #f7f7f7);
      height: 290px;
      transform: translateX(-20px);
    }
  }

  .main-button {
    background: #565bff;
    margin: 0 20px;
    width: calc(100% - 40px);
    max-width: 472px;
    color: #fff;
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 20px);
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
    height: 66px;
    border-radius: 18px;
    border: none;
    position: fixed;
    bottom: 26px;
  }
`;

interface Props {
  token: string;
}

const Result = ({ token }: Props) => {
  const router = useRouter();
  const counselId: any = router.query.id!;

  const { data: result, isLoading } = useSWR(
    `/api/counsel/end/${counselId}`,
    (url) => fetcher(url, token)
  );
  const [embedUrlData, setEmbedUrlData] = useState<any>();

  const moveToCounsel = useCallback(() => {
    router.push('/counsel');
  }, []);

  useEffect(() => {
    result && setEmbedUrlData(makeEmbedUrl(result?.contents));
  }, [isLoading, result]);

  console.log(result, embedUrlData);

  const dummy = [
    {
      title: '우울증 재발 확률 75%...? 우울증의 재발을 막는 방법은?',
      link: 'https://www.youtube.com/embed/Fy4E9TMlP6Q',
    },
    {
      title: '우울증 약이 듣지 않을 땐 어떻게 해야 할까?',
      link: 'https://www.youtube.com/embed/ewi1UKA4dus',
    },
    {
      title: '아무것도 하기 싫은 나, 우울증 일까?',
      link: 'https://www.youtube.com/embed/zHG4LChuZt8',
    },
  ];

  return (
    <Layout>
      <Header>
        <div className='icon-wrapper' onClick={moveToCounsel}>
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
      </Header>
      <Content>
        <div className='content-section'>
          <div className='counsel-title'>
            <p>상담 결과</p>
            {/* <p>{result?.result}</p> */}
            <p>김도란님의 심리상태가 더 좋아졌어요!</p>
            <button
              className='counsel-start-button'
              onClick={() => {
                router.push('/counsel/chat-intro');
              }}
            >
              새로운 상담 시작하기
              <RightArrowSVG width={20} height={20} alt={'arrow'} />
            </button>
          </div>
          <div className='counsel-summary'>
            <p>상담 내용 요약</p>
            {/* <div>{result?.summary}</div> */}
            <div>
              김도란님은 최근 우울함과 무기력함을 느끼며, 앞으로 나아질 수 없을
              것 같다는 생각에 사로잡혀 아무것도 할 수 없는 상태입니다. 상담원은
              작은 행동들이 도움이 될 수 있다고 조언하며, 걷기나 깊게 숨쉬기를
              제안했습니다. 김도란님은 긍정적으로 받아들여 오늘부터 시도해보기로
              했고, 상담원은 용기를 격려하며 언제든지 다시 도움을 요청할 수
              있음을 강조합니다.
            </div>
          </div>
          <div className='content-wrapper'>
            <p className='main-title'>심리치료 콘텐츠를 시청해보세요.</p>
            <p className='sub-discription'>
              도란도란이 맞춤 콘텐츠를 추천해드릴게요.
              <br />
              콘텐츠 탭으로 이동하시면 더 많은 콘텐츠를 보실 수 있어요.
            </p>
            <button
              className='counsel-start-button'
              onClick={() => {
                router.push('/contents');
              }}
            >
              콘텐츠 탭으로 이동하기{' '}
              <RightArrowSVG width={20} height={20} alt={'arrow'} />
            </button>
          </div>
          {/* {result?.contents.map( */}
          {dummy.map((content: { [key: string]: string }, i: number) => (
            <div key={i} className='content-wrapper'>
              <p className='title'>{content.title}</p>
              <div className='content'>
                <iframe
                  width={'100%'}
                  height='290'
                  // src={embedUrlData && embedUrlData[i].embedUrl}
                  src={content.link}
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
        <button className='main-button' onClick={moveToCounsel}>
          메인화면으로 돌아가기
        </button>
      </Content>
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

export default Result;
