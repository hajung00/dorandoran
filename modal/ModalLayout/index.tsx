import React from 'react';
import styled from 'styled-components';

const ModalLayoutStyle = styled.div`
  width: 100%;
  max-width: 512px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.36);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
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
