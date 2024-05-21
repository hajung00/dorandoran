'use client';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

// import svg
import ArrowSVG from '../../../public/icons/arrow.svg';
import CheckSVG from '../../../public/icons/check.svg';

const Header = styled.header`
  padding: 60px 20px 0 20px;
  color: #222;

  .icon-wrapper {
    padding: 13px 8px;
  }
`;

const Pointer = styled.div`
  color: var(--doranblue, #565bff);
  margin-left: 8px;
`;

const ProgressBarSection = styled.div`
  padding: 0 20px;
  margin-top: 24px;

  .progress-info {
    justify-content: end;
    margin-top: 8px;
    display: flex;
    font-family: 'Pretendard';
    font-size: 15px;
    font-weight: 400;
  }
`;

const ProgressBar = styled.div`
  border-radius: 100px;
  background: var(--doranblue02, #e1e2ff);
  height: 10px;
  margin-top: 20px;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  width: ${(props) => props.width}%;
  height: 10px;
  padding: 0;
  text-align: center;
  border-radius: 100px;
  background: var(--doranblue, #565bff);
`;

const Content = styled.div`
  padding: 0 20px;

  .question-type {
    margin-top: 12px;
    color: var(--gray09, #222);
    font-family: 'Pretendard';
    font-size: 26px;
    font-weight: 600;
    line-height: 140%; /* 36.4px */
  }
  .description {
    margin-top: 8px;
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: 20px;
    font-weight: 400;
    line-height: 140%; /* 28px */
  }
  .question-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;

    .question-number {
      margin-top: 32px;
      display: flex;
      padding: 8px 12px;
      justify-content: center;
      align-items: center;
      border-radius: 100px;
      background: var(--doranblue02, #e1e2ff);
      color: var(--doranblue, #565bff);
      font-family: 'Pretendard';
      font-size: 18px;
      font-weight: 600;
      line-height: 140%; /* 25.2px */
      letter-spacing: -0.36px;
    }
    .question {
      padding: 63px 0;
      color: var(--gray09, #222);
      text-align: center;
      font-family: 'Pretendard';
      font-size: 20px;
      font-weight: 500;
      line-height: 150%; /* 30px */
      letter-spacing: -0.4px;
    }
    .question-description {
      margin-top: 28px;
      color: var(--gray07, #666);
      font-family: 'Pretendard';
      font-size: 18px;
      font-weight: 400;
      line-height: 140%; /* 25.2px */
    }
  }
  .answer-container {
    margin-top: 32px;

    & > ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    & > ul > li {
      display: flex;
      height: 60px;
      padding: 8px 20px;
      align-items: center;
      gap: 16px;
      border-radius: 18px;
      background: var(--gray01, #f7f7f7);
      color: var(--gray09, #222);
      font-family: 'Pretendard';
      font-size: 18px;
      font-weight: 500;
      letter-spacing: -0.36px;

      & > div {
        width: 28px;
        height: 28px;
        border: 1px solid #e3e3e3;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .active {
      border: 1px solid var(--doranblue, #565bff);
      color: var(--doranblue, #565bff);

      & > div {
        border: 1px solid #e565BFF;
        background: #565bff;
      }
    }
  }
`;

const ButtonSection = styled.div`
  margin-top: 70px;
  padding: 0 20px;

  & > button {
    width: 100%;
    height: 66px;
    border-radius: 18px;
    border: none;
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.4px;
  }

  .enable {
    background: var(--doranblue, #565bff);
    color: var(--white, #fff);
  }

  .disable {
    background: var(--gray03, #e3e3e3);
    color: #b2b2b2;
  }

  .prev-next-button-wrapper {
    gap: 12px;
    display: flex;

    & > button {
      width: 50%;
      height: 66px;
      border-radius: 18px;
      border: none;
      font-family: 'Pretendard';
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.4px;
    }
    .prev-button {
      border: 1px solid var(--doranblue, #565bff);
      background: var(--white, #fff);
      color: var(--doranblue, #565bff);
    }
  }
`;
interface Props {
  testItmes: { [key: string]: any }[];
}

const PsychologicalTest = ({ testItmes }: Props) => {
  const [currentNumber, setCurrnetNumber] = useState(1); // 현재 심리검사 항목 번호
  const [currentAnswer, setCurrentAnswer] = useState(''); // 현재 심리검사 항목 답변
  const [allAnswer, setAllAnswer] = useState<{ [key: string]: any }[]>([]); // 검사 모든 항목에 대한 답변

  // 답변 클릭 이벤트
  const onClickAnswer = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const answer = e.target as HTMLLIElement;
    setCurrentAnswer(answer.innerText);
  }, []);

  // 기존에 답변한 항목인 경우 선택한 항목 표시
  useEffect(() => {
    for (let i = 0; i < allAnswer.length; i++) {
      if (allAnswer[i].number === currentNumber) {
        setCurrentAnswer(allAnswer[i].answer);
        break;
      } else {
        setCurrentAnswer('');
      }
    }
  }, [currentNumber, allAnswer]);

  // 다음 문항 넘어가기 클릭 이벤트
  const nextQuestionHandler = useCallback(() => {
    if (currentAnswer) {
      setCurrnetNumber((prev) => prev + 1);

      // 답변한 모든 항목 번호
      const allNumber = allAnswer.map(
        (answer: { [key: string]: number }) => answer.number
      );

      // 이전에 답변한 항목이 아닌 경우, 선택한 답변 추가
      if (!allNumber.includes(currentNumber)) {
        setAllAnswer((prev) => [
          ...prev,
          { number: currentNumber, answer: currentAnswer },
        ]);
      } else {
        // 이전에 답변한 항목인 경우, 기존 답변 제거 후 새로운 답변 추가
        const newAllAnswer = allAnswer.filter(
          (answer: { [key: string]: number }) => answer.number !== currentNumber
        );
        setAllAnswer(() => [
          ...newAllAnswer,
          { number: currentNumber, answer: currentAnswer },
        ]);
      }
    }
  }, [currentNumber, currentAnswer]);

  // 이전 항목으로 넘어가기 클릭 이벤트
  const prevQuestionHandler = useCallback(() => {
    setCurrnetNumber((prev) => prev - 1);
  }, []);

  return (
    <div>
      <Header>
        <div className='icon-wrapper'>
          <ArrowSVG width={21} height={21} alt={'prev'} />
        </div>
      </Header>
      <ProgressBarSection>
        <ProgressBar>
          <Progress width={5.26 * currentNumber} />
        </ProgressBar>
        <div className='progress-info'>
          총 <Pointer>19</Pointer>개 문항 중 <Pointer>{currentNumber}</Pointer>
          개 진행중
        </div>
      </ProgressBarSection>
      <Content>
        <div className='question-type'>{testItmes[currentNumber - 1].type}</div>
        <p className='description'>
          지난 2주동안 느꼈던 감정으로 선택해주세요.
        </p>
        <div className='question-container'>
          <div className='question-number'>문항 {currentNumber}</div>
          <div className='question'>
            {testItmes[currentNumber - 1].question}
          </div>
          <p className='question-description'>
            아래 답변중 하나를 선택해주세요.
          </p>
        </div>
        <div className='answer-container'>
          <ul>
            {testItmes[currentNumber - 1].answer.map(
              (item: string, idx: number) => (
                <li
                  key={idx}
                  className={currentAnswer === item ? 'active' : ''}
                  onClick={onClickAnswer}
                >
                  <div>
                    <CheckSVG
                      width={19}
                      height={19}
                      alt={'check'}
                      color={'#e3e3e3'}
                    />
                  </div>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </Content>
      <ButtonSection>
        {currentNumber === 1 ? (
          <button
            className={currentAnswer ? 'enable' : 'disable'}
            onClick={nextQuestionHandler}
          >
            다음 문항으로 넘어가기
          </button>
        ) : (
          <div className='prev-next-button-wrapper'>
            <button className='prev-button' onClick={prevQuestionHandler}>
              이전 문항으로 돌아가기
            </button>
            <button
              className={currentAnswer ? 'enable' : 'disable'}
              onClick={nextQuestionHandler}
            >
              다음 문항으로 넘어가기
            </button>
          </div>
        )}
      </ButtonSection>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const testItmes = (await import('../../../public/test_items/test_item.json'))
    .default;

  return {
    props: {
      testItmes,
    },
  };
};

export default PsychologicalTest;
