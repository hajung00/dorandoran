import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalLayoutStyle = styled.div`
  width: 100%;
  max-width: 512px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.36);
  position: fixed;
  top: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children: React.ReactNode;
  show?: boolean;
  onClosed: () => void;
}

const ModalLayout = ({ children, show, onClosed }: Props) => {
  useEffect(() => {
    const handleScroll = () => {
      if (show) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleScroll(); // Initialize on mount
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [show]);

  return <ModalLayoutStyle onClick={onClosed}>{children}</ModalLayoutStyle>;
};

export default ModalLayout;
