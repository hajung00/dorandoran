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
import { trendCounselAPI } from '@/pages/api/counsel';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DiseaseTypeWrapper = styled.div`
  margin: 36px 0;

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
    cursor: pointer;
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
    cursor: pointer;
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
  position: relative;
  &::after {
    content: '';
    max-width: 512px;
    display: block;
    width: 100vw;
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
    cursor: pointer;
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

const BarStyle = styled.div`
  position: relative;
  .chartjs-tooltip {
    position: absolute;
    padding: 6px;
    border-radius: 6px;
    border: 1px solid var(--gray04, #d9d9d9);
    background: var(--gray01, #f7f7f7);
    color: var(--gray07, #666);
    font-family: 'Pretendard';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 22.4px */
    display: none;
  }

  .visible {
    display: block;
  }
`;
interface Props {
  token: string;
  clickDate: string;
  handleClickDate: (date: string) => void;
}
const BarGraph = ({ token, clickDate, handleClickDate }: Props) => {
  const month = Array(12)
    .fill(0)
    .map((item: number, i: number) => i + 1);

  const chartRef = useRef(null);
  const [color, setColor] = useState<string[]>([]);
  const [clickedIndex, setClickedIndex] = useState(-1);
  const [graphData, setGraphData] = useState<{ [key: string]: number }[]>();

  const setBarColor = (data: { [key: string]: number }[]) => {
    const scoreArray = data.map((item) => item.score);
    setColor([]);
    for (let i = 0; i < data.length; i++) {
      if (scoreArray[i] > 80) {
        setColor((prev) => [...prev, '#D2D3FF']);
      } else if (scoreArray[i] > 40) {
        setColor((prev) => [...prev, '#F9ECBD']);
      } else {
        setColor((prev) => [...prev, '#FFCECE']);
      }
    }
  };

  const container = useRef<any>(null);
  const [currentMonth, setCurrentMonth] = useState(moment().month() + 1);
  useEffect(() => {
    if (container.current) {
      container.current.scrollTo(currentMonth * 1000, 0);
    }
  }, []);

  const [diseaseType, setDiseaseType] = useState('DEPRESSION');
  const onClickTypeHandler = useCallback((category: string) => {
    setDiseaseType(category);
  }, []);

  const onClickMonthHandler = useCallback((month: number) => {
    setCurrentMonth(month);
  }, []);

  // 질병 종류, 달 변할 때 마다 데이터 요청
  // useEffect(() => {
  //   console.log('데이터 요청', diseaseType, currentMonth);
  //   const fetchData = async () => {
  //     try {
  //       const response = await trendCounselAPI(
  //         token,
  //         diseaseType,
  //         currentMonth
  //       );
  //       console.log(response);
  //       setGraphData(response);
  //       setBarColor(response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, [diseaseType, currentMonth]);

  const clearClickDate = useCallback(() => {
    handleClickDate('');
    setClickedIndex(-1);
  }, []);

  // 더미!!
  const dummy1 = [
    {
      dayOfMonth: 26,
      score: 32,
    },
    {
      dayOfMonth: 27,
      score: 34,
    },
    {
      dayOfMonth: 28,
      score: 36,
    },
    {
      dayOfMonth: 29,
      score: 33,
    },
  ];

  const dummy2 = [
    {
      dayOfMonth: 26,
      score: 58,
    },
    {
      dayOfMonth: 27,
      score: 60,
    },
    {
      dayOfMonth: 28,
      score: 62,
    },
    {
      dayOfMonth: 29,
      score: 63,
    },
  ];

  const dummy3 = [
    {
      dayOfMonth: 26,
      score: 80,
    },
    {
      dayOfMonth: 27,
      score: 82,
    },
    {
      dayOfMonth: 28,
      score: 84,
    },
    {
      dayOfMonth: 29,
      score: 86,
    },
  ];

  useEffect(() => {
    console.log('데이터 요청', diseaseType, currentMonth);
    if (diseaseType === 'DEPRESSION') {
      setGraphData(dummy1);
      setBarColor(dummy1);
    }
    if (diseaseType === 'STRESS') {
      setGraphData(dummy2);
      setBarColor(dummy2);
    }
    if (diseaseType === 'ANXIETY') {
      setGraphData(dummy3);
      setBarColor(dummy3);
    }
  }, [diseaseType, currentMonth]);

  //

  const data = {
    labels: graphData?.map((item) => item.dayOfMonth + '일'),
    datasets: [
      {
        label: '분류 1', //그래프 분류되는 항목
        data: graphData?.map((item) => item.score), //실제 그려지는 데이터(Y축 숫자)
        borderColor: color, //그래프 선 color
        backgroundColor: function (context: any) {
          const index = context.dataIndex;
          return clickedIndex !== index
            ? color[index]
            : color[index] === '#FFCECE'
            ? '#FF7979'
            : color[index] === '#F9ECBD'
            ? '#F5D565'
            : '#9597FF';
        },
        borderRadius: 12,
        maxBarThickness: 48,
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
        if (chart_instances.length > 0) {
          const chart: any = chartRef.current;

          const scoreElement = document.getElementById(
            'chartjs-tooltip'
          ) as HTMLDivElement;

          scoreElement.style.left = `calc(${chart_instances[0].element.x}px - 24px)`;
          scoreElement.style.top = `calc(${chart_instances[0].element.y}px - 48px)`;

          handleClickDate(
            graphData
              ? currentMonth.toString().padStart(2, '0') +
                  graphData[chart_instances[0].index].dayOfMonth.toString()
              : ''
          );
          setClickedIndex(chart_instances[0].index);
          chart.update();
        }
      } catch (error) {
        console.log(error);
      }
    },
  };

  return (
    <div>
      <DiseaseTypeWrapper>
        <ul>
          <li
            className={`${diseaseType === 'DEPRESSION' && 'focus'}`}
            onClick={() => {
              onClickTypeHandler('DEPRESSION');
            }}
          >
            우울함
          </li>
          <li
            className={`${diseaseType === 'STRESS' && 'focus'}`}
            onClick={() => {
              onClickTypeHandler('STRESS');
            }}
          >
            스트레스
          </li>
          <li
            className={`${diseaseType === 'ANXIETY' && 'focus'}`}
            onClick={() => {
              onClickTypeHandler('ANXIETY');
            }}
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
      <BarStyle>
        <Bar
          ref={chartRef}
          data={data}
          width={300}
          height={200}
          options={options}
        />
        <div
          id='chartjs-tooltip'
          className={`chartjs-tooltip ${clickedIndex >= 0 && 'visible'}`}
        >
          {clickedIndex >= 0
            ? `${graphData && graphData[clickedIndex]?.score}점`
            : ''}
        </div>
      </BarStyle>

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
