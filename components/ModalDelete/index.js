import styled from "styled-components";

export default function ModalDelete({ onConfirm, onCancel }) {
  return (
    <Modal>
      <p>Do you want to delete this workout?</p>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="button" onClick={onConfirm}>
        Confirm
      </Button>
    </Modal>
  );
}

function Modal({ children }) {
  return (
    <PageBackground>
      <ModalContainer>{children}</ModalContainer>
    </PageBackground>
  );
}

export const Button = styled.button`
  width: 100px;
  text-align: center;
  border-radius: 20px;
  border: none;
  padding: 8px;
  margin: 15px;
  font-weight: bold;
  font-size: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 102;
  color: var(--dark-brown);
`;

const ModalContainer = styled.section`
  background-color: var(--dark-orange);
  border-radius: 20px;
  padding: 30px;
  width: 400px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
`;

const PageBackground = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 100;
`;
