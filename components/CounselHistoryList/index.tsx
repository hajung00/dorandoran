import React from 'react';
import styled from 'styled-components';

const ListStyle = styled.div`
  padding: 20px;
  border-radius: 16px;
  background: var(--gray01, #f7f7f7);

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
  list: { [key: string]: string };
}

const CounselHistoryList = ({ list }: Props) => {
  return (
    <ListStyle>
      <p>{list.title}</p>
      <div>{list.date}</div>
    </ListStyle>
  );
};

export default CounselHistoryList;
