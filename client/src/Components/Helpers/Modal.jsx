/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

const portalRoot = document.getElementById('portal-root');

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    left; 0
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    max-width: 90%;
    max-height: 90%;
    box-shadow: 0 3px 15px -3px rgba(0, 0, 0, 0.2);
    position: relative;
    `;

const HeaderRow = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
  `;

const Modal = ({ isOpen, close, children }) => {
  const contentRef = useRef();

  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <Background>
        <Content ref={contentRef}>
          <HeaderRow>
            <span
              style={{ cursor: 'pointer' }}
              onClick={close}
            >
              ✖️
            </span>
          </HeaderRow>
          {children}
        </Content>
      </Background>
    </>,
    portalRoot,
  );
};

export default Modal;
