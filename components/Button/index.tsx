import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button<{ type: string }>`
  width: 100%;
  padding: 4.5% 10px;
  border: none;
  border-radius: 18px;
  font: var(--Pretendard--20-600);

  ${(props) =>
    props.type === 'true' &&
    'background: var(--doranblue, #565bff);color: #ffffff;cursor: pointer;'}

  ${(props) => props.type === 'false' && 'background: #e3e3e3;color: #b2b2b2;'}

  ${(props) =>
    props.type === 'nomal' &&
    'border: 1px solid var(--doranblue, #565bff);color: var(--doranblue, #565bff);background: var(--white, #fff);'}
`;

interface Props {
  text: string;
  type: boolean | string;
  onClick: any;
}

const Button = ({ text, type, onClick }: Props) => {
  return (
    <ButtonStyle type={`${type}`} onClick={onClick}>
      {text}
    </ButtonStyle>
  );
};

export default Button;
