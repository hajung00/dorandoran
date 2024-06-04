import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ScrollContainer from 'react-indiana-drag-scroll';
import moment from 'moment';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DiseaseTypeWrapper = styled.div`
  margin-bottom: 36px;

  & > ul {
    display: flex;
    gap: 14px;
    list-style: none;
  }

  & > ul > li {
    padding: 8px 19px;
    border-radius: 100px;
    background: var(--gray01, #f7f7f7);
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 28px */
    color: var(--gray06, #898989);
  }

  .focus {
    background: var(--doranblue03, #f3f3ff);
    color: var(--doranblue, #565bff);
  }
`;

const ScrollContainerCustom = styled(ScrollContainer)`
  margin-bottom: 38px;

  & > ul {
    list-style: none;
    display: flex;
    gap: 30px;
  }

  & > ul > li {
    padding: 4px;
    min-width: fit-content;
    color: var(--gray04, #d9d9d9);
    font-family: 'Pretendard';
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 28px */
  }

  .focus {
    color: var(--gray08, #444);
  }
`;

const GraphBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 44px;
  margin-bottom: 33px;
  min-height: 36.8px;

  &::after {
    content: '';
    display: block;
    width: 100vw;
    min-width: 512px;
    height: 22px;
    background: var(--gray01, #f7f7f7);
    position: absolute;
    bottom: -55px;
    left: -20px;
  }

  & > button {
    padding: 8px 14px;
    border-radius: 100px;
    background: var(--gray01, #f7f7f7);
    border: none;
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.36px;
  }
`;

const LegendStyle = styled.div`
  display: flex;
  gap: 12px;

  & > p {
    display: flex;
    gap: 5px;
    align-items: center;
    color: var(--gray06, #898989);
    font-family: 'Pretendard';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 22.4px */
  }

  & > p::before {
    content: '';
    display: block;
    width: 24px;
    height: 8px;
    border-radius: 100px;
  }

  #stable::before {
    background: #d2d3ff;
  }

  #unstable::before {
    background: #f9ecbd;
  }

  #dangers::before {
    background: #ffcece;
  }
`;
interface Props {
  clickDate: string;
  handleClickDate: (date: string) => void;
}
const BarGraph = ({ clickDate, handleClickDate }: Props) => {
  const dummy = [
    {
      date: '1일',
      data: 20,
    },
    {
      date: '8일',
      data: 40,
    },
    {
      date: '12일',
      data: 70,
    },
    {
      date: '13일',
      data: 60,
    },
    {
      date: '16일',
      data: 90,
    },
    {
      date: '17일',
      data: 40,
    },
  ];
  const month = Array(12)
    .fill(0)
    .map((item: number, i: number) => i + 1);

  const [color, setColor] = useState<string[]>([]);

  useEffect(() => {
    const data = dummy.map((item) => item.data);
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i] > 80) {
        setColor((prev) => [...prev, '#D2D3FF']);
      } else if (data[i] > 40) {
        setColor((prev) => [...prev, '#F9ECBD']);
      } else {
        setColor((prev) => [...prev, '#FFCECE']);
      }
    }
  }, []);

  const data = {
    labels: dummy.map((item) => item.date),
    datasets: [
      {
        label: '분류 1', //그래프 분류되는 항목
        data: dummy.map((item) => item.data), //실제 그려지는 데이터(Y축 숫자)
        borderColor: color, //그래프 선 color
        backgroundColor: color, //마우스 호버시 나타나는 분류네모 표시 bg
        borderRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false, // 툴팁 비활성화
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 20,
          callback: function (value: any) {
            if (value === 0) return '위험';
            else if (value === 40) return '불안정';
            else if (value === 80) return '안정';
            else return '';
          },
        },
      },
    },
    onClick: (c: any, chart_instances: any) => {
      try {
        handleClickDate(dummy[chart_instances[0].index].date);
      } catch (error) {
        console.log(error);
      }
    },
  };

  const [diseaseType, setDiseaseType] = useState('우울함');
  const onClickTypeHandler = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const target = e.target as HTMLLIElement;
      setDiseaseType(target.innerText);
    },
    []
  );

  const container = useRef<any>(null);
  const [currentMonth, setCurrentMonth] = useState(moment().month() + 1);
  useEffect(() => {
    if (container.current) {
      container.current.scrollTo(currentMonth * 1000, 0);
    }
  }, []);
  const onClickMonthHandler = useCallback((month: number) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    // 질병 종류, 달 변할 때 마다 데이터 요청
    console.log('데이터 요청', diseaseType, currentMonth);
  }, [diseaseType, currentMonth]);

  const clearClickDate = useCallback(() => {
    handleClickDate('');
  }, []);
  return (
    <div>
      <DiseaseTypeWrapper>
        <ul>
          <li
            className={`${diseaseType === '우울함' && 'focus'}`}
            onClick={onClickTypeHandler}
          >
            우울함
          </li>
          <li
            className={`${diseaseType === '스트레스' && 'focus'}`}
            onClick={onClickTypeHandler}
          >
            스트레스
          </li>
          <li
            className={`${diseaseType === '불안감' && 'focus'}`}
            onClick={onClickTypeHandler}
          >
            불안감
          </li>
        </ul>
      </DiseaseTypeWrapper>
      <ScrollContainerCustom innerRef={container}>
        <ul>
          {month.map((item) => (
            <li
              className={`${currentMonth === item && 'focus'}`}
              onClick={() => {
                onClickMonthHandler(item);
              }}
              key={item}
            >
              {item}월
            </li>
          ))}
        </ul>
      </ScrollContainerCustom>
      <Bar data={data} width={300} height={200} options={options} />
      <GraphBottom>
        <LegendStyle>
          <p id='stable'>안정</p>
          <p id='unstable'>불안정</p>
          <p id='dangers'>위험</p>
        </LegendStyle>
        {clickDate && <button onClick={clearClickDate}>선택해제</button>}
      </GraphBottom>
    </div>
  );
};

export default BarGraph;
