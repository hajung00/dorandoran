import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const ListStyle = styled.div`
  padding: 20px;
  border-radius: 16px;
  background: var(--gray01, #f7f7f7);
  cursor: pointer;

  & > p {
    margin-bottom: 18px;
    color: #000;
    font-family: 'Pretendard';
    font-size: clamp(16px, 4vw, 18px);
    font-weight: 500;
    letter-spacing: -0.36px;
    text-transform: uppercase;
  }

  & > div {
    color: #000;
    font-family: 'Pretendard';
    font-size: clamp(14px, 4vw, 16px);
    font-weight: 400;
    letter-spacing: -0.32px;
    text-transform: uppercase;
  }
`;

interface Props {
  type: string;
  list: { [key: string]: any };
}

const CounselHistoryList = ({ type, list }: Props) => {
  const router = useRouter();

  const moveToCounselDetail = useCallback(
    (id: number) => {
      // 진행중인 상담일 경우, 상담 페이지로 이동
      if (type === 'counsel') {
        router.push(`counsel/chat/${id}`);
      } else {
        // 완료한 상담일 경우, 상담 결과페이지로 이동
        router.push(`/history/${id}`);
      }
    },
    [type]
  );

  return (
    <ListStyle
      onClick={() => {
        moveToCounselDetail(list.counselId);
      }}
    >
      <p>{list.title}</p>
      <div>{moment(list.date).format('YYYY년 MM월 DD일')}</div>
    </ListStyle>
  );
};

export default CounselHistoryList;
