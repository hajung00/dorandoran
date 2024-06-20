import React, { useCallback } from 'react';
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

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 10.5px 8px;
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
      margin-top: 12px;
      border: 10px solid #f7f7f7;
      padding: 16px;
      max-height: 248px;
      min-height: 136px;
      height: fit-content;
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
  }

  .counsel-summary::after {
    content: '';
    display: block;
    width: calc(100% + 20px);
    height: 22px;
    background: #f7f7f7;
    position: absolute;
    top: 218px;
    left: -20px;
  }

  .title {
    margin-top: 78px;
    padding: 0 20px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: clamp(20px, 5vw, 24px);
    font-weight: 600;
    line-height: 140%; /* 33.6px */
  }

  .content-wrapper {
    margin-top: 18px;
    & > div > p:last-child {
      margin-top: -18px;
      margin-bottom: 30px;
      padding: 0 20px;
      color: var(--gray07, #666);
      font-family: 'Pretendard';
      font-size: clamp(16px, 4vw, 20px);
      font-weight: 400;
      line-height: 140%; /* 28px */
    }

    .title {
      margin-top: 106px;
      font-size: clamp(18px, 5vw, 22px);
      margin-bottom: 26px;
    }

    .content {
      background: var(--gray01, #f7f7f7);
      height: 290px;
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
    padding: 4.15% 0;
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

  const { data: result } = useSWR(`/api/counsel/end/${counselId}`, fetcher);

  const moveToCounsel = useCallback(() => {
    router.push('/counsel');
  }, []);

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
            <p>심리검사 결과</p>
            <p>조성혁님의 심리상태가 더 좋아졌어요!</p>
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
            <div>{result?.summary}</div>
          </div>
          <div className='content-wrapper'>
            <div>
              <p className='title'>심리치료 콘텐츠를 시청해보세요.</p>
              <p>
                도란도란이 맞춤 콘텐츠를 추천해드릴게요.
                <br />
                콘텐츠 탭으로 이동하시면 더 많은 콘텐츠를 보실 수 있어요.
              </p>
            </div>
            <div className='content'></div>
          </div>
          {result?.contents.map(
            (content: { [key: string]: string }, i: number) => (
              <div key={i} className='content-wrapper'>
                <p className='title'>{content.title}</p>
                <div className='content'></div>
              </div>
            )
          )}
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
