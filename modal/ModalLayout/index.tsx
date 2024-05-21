import React from 'react';
import styled from 'styled-components';

const ModalLayoutStyle = styled.div`
  width: 512px;
  height: -webkit-fill-available;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children: React.ReactNode;
  onClosed: () => void;
}

const ModalLayout = ({ children, onClosed }: Props) => {
  return <ModalLayoutStyle onClick={onClosed}>{children}</ModalLayoutStyle>;
};

export default ModalLayout;
