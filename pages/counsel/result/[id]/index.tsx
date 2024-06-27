import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import styled from 'styled-components';

// import svg
import RightArrowSVG from '../../../../public/icons/arrow-right.svg';

// import components
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Description from '@/components/Description';
import Button from '@/components/Button';

// import hooks
import makeEmbedUrl from '@/utils/makeEmbedUrl';
import { getCookieValue } from '@/utils/getCookieValue';
import fetcher from '@/utils/fetchers';

const CounselTitle = styled.section`
  color: var(--gray09, #222);
  font: var(--Pretendard--26-600);
  line-height: 140%; /* 36.4px */

  .right-arrow-button {
    margin-top: 16px;
    padding: 6px 6px 6px 12px;
    color: #565bff;
    font-family: Pretendard;
    font-size: clamp(14px, 4vw, 16px);
    font-weight: 600;
    letter-spacing: -0.4px;
    border-radius: 6px;
    background: var(--doranblue03, #f3f3ff);
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }
`;

const CounselSummary = styled.section`
  margin-top: 24px;
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
    margin-top: 12px;
    border: 10px solid #f7f7f7;
    padding: 16px;
    max-height: 248px;
    min-height: 136px;
    width: 100%;
    margin-top: 12px;
    border: 10px solid #f7f7f7;
    padding: 16px;
    max-height: 248px;
    min-height: 136px;
    height: fit-content;
    overflow: hidden;
    color: var(--gray08, #444);
    text-overflow: ellipsis;
    font-family: 'Pretendard';
    font-size: clamp(18px, 4vw, 20px);
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 28px */
    letter-spacing: -0.4px;
  }
`;

const Content = styled.div`
  padding: 0 20px;
  padding-bottom: 120px;

  .content-wrapper {
    margin-top: 17.8%;
    margin-bottom: 48px;
    position: relative;

    &::before {
      content: '';
      display: block;
      width: calc(100% + 20px);
      height: 22px;
      background: #f7f7f7;
      position: absolute;
      top: -35%;
      left: -20px;
    }
  }

  & > button {
    width: calc(100% - 40px);
    max-width: 472px;
    letter-spacing: -0.4px;
    height: 66px;
    position: fixed;
    bottom: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const YoutubeSection = styled.section`
  width: 100vw;
  max-width: 512px;
  transform: translateX(-20px);
  & > p {
    font: var(--Pretendard--20-600);
    margin-top: 18px;
    margin-bottom: 26px;
  }
`;

interface Props {
  token: string;
  result: any;
}

const Result = ({ token, result }: Props) => {
  const router = useRouter();
  const [embedUrlData, setEmbedUrlData] = useState<any>();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token]);

  const moveToCounsel = useCallback(() => {
    router.push('/counsel');
  }, []);

  useEffect(() => {
    result && setEmbedUrlData(makeEmbedUrl(result?.contents));
  }, [result]);

  return (
    <Layout>
      <Header type='close' link='/counsel' />
      <Content>
        <CounselTitle>
          <p>상담 결과</p>
          <p>{result?.result}</p>
          <button
            className='right-arrow-button'
            onClick={() => {
              router.push('/counsel/chat-intro');
            }}
          >
            새로운 상담 시작하기
            <RightArrowSVG width={20} height={20} alt={'arrow'} />
          </button>
        </CounselTitle>
        <CounselSummary>
          <p>상담 내용 요약</p>
          <div>{result?.summary}</div>
        </CounselSummary>
        <div className='content-wrapper'>
          <Description
            desc='심리치료 콘텐츠를 시청해보세요.'
            subDesc='도란도란이 맞춤 콘텐츠를 추천해드릴게요.
            <br />
            콘텐츠 탭으로 이동하시면 더 많은 콘텐츠를 보실 수 있어요.'
          />
          <button
            className='right-arrow-button'
            onClick={() => {
              router.push('/contents');
            }}
          >
            콘텐츠 탭으로 이동하기{' '}
            <RightArrowSVG width={20} height={20} alt={'arrow'} />
          </button>
        </div>
        {result?.contents.map(
          (content: { [key: string]: string }, i: number) => (
            <YoutubeSection key={i}>
              <iframe
                width={'100%'}
                height='290'
                src={embedUrlData && embedUrlData[i].embedUrl}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
              <p>{content.title}</p>
            </YoutubeSection>
          )
        )}
        <Button
          text='메인화면으로 돌아가기'
          type={true}
          onClick={moveToCounsel}
        />
      </Content>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  // 로그인 여부 확인
  const cookie = context.req ? context.req.headers.cookie : '';

  let token = cookie ? getCookieValue(cookie, 'token') : null;
  const counselId: any = context.query.id;
  const result = token
    ? await fetcher(`/api/counsel/end/${counselId}`, token)
    : null;

  return {
    props: {
      token,
      result,
    },
  };
};

export default Result;
