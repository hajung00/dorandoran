import React from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import Layout from '@/components/Layout';

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
    margin-top: 24px;

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
      height: 228px;
    }
  }

  .counsel-start-button {
    position: relative;
    margin: 0 20px;
    margin-top: 26px;
    width: calc(100% - 40px);
    padding: 4.3% 0;
    border-radius: 18px;
    border: 1px solid #565bff;
    background: #fff;
    color: #565bff;
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 20px);
    font-weight: 600;
    letter-spacing: -0.4px;
  }

  .counsel-start-button::after {
    content: '';
    display: block;
    width: calc(100% + 20px);
    height: 10px;
    background: #f7f7f7;
    position: absolute;
    top: 104px;
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
      margin-top: 0px;
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

const Result = () => {
  return (
    <Layout>
      <Header>
        <div className='icon-wrapper'>
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
      </Header>
      <Content>
        <div className='content-section'>
          <div className='counsel-title'>
            <p>심리검사 결과</p>
            <p>조성혁님의 심리상태가 더 좋아졌어요!</p>
          </div>
          <div className='counsel-summary'>
            <p>상담 내용 요약</p>
            <div>상담 내용 요약...</div>
          </div>
          <button className='counsel-start-button'>새로운 상담 시작하기</button>
          <p className='title'>혼자서도 해결해볼 수 있어요.</p>
          <div className='content-wrapper'>
            <div>
              <p className='title'>심리치료 콘텐츠</p>
              <p>마음상태에 따라 영상을 고르고 시청해보세요.</p>
            </div>
            <div className='content'></div>
          </div>
          <div className='content-wrapper'>
            <p className='title'>심리치료 유튜브 제묵</p>
            <div className='content'></div>
          </div>
          <div className='content-wrapper'>
            <p className='title'>심리치료 유튜브 제묵</p>
            <div className='content'></div>
          </div>
          <div className='content-wrapper'>
            <p className='title'>심리치료 유튜브 제묵</p>
            <div className='content'></div>
          </div>
        </div>
        <button className='main-button'>메인화면으로 돌아가기</button>
      </Content>
    </Layout>
  );
};

export default Result;
