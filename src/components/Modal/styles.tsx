import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 20%;
  width: 30%;
  background: white;
  border-radius: 10px;
  padding: 16px;
`;

export const ModalContainerText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalCointainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.h1`
  font-size: 20px;
`;

export const ModalText = styled.p`
  font-size: 16px;
`;

export const ButtonRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;
