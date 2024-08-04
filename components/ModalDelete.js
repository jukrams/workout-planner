import styled from "styled-components";

export default function ModalDelete({ onConfirm, onCancel }) {
  return (
    <StyledModalMessage>
      <p>Do you want to delete this workout?</p>
      <StyledButton type="button" onClick={onCancel}>
        Cancel
      </StyledButton>
      <StyledButton type="button" onClick={onConfirm}>
        Confirm
      </StyledButton>
    </StyledModalMessage>
  );
}

function StyledModalMessage({ children }) {
  return (
    <StyledPageBackground>
      <StyledModalContainer>{children}</StyledModalContainer>
    </StyledPageBackground>
  );
}

export const StyledButton = styled.button`
  width: 100px;
  text-align: center;
  border-radius: 20px;
  border: none;
  padding: 8px;
  margin: 5px;
 font-weight: bold;
 font-size: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledModalContainer = styled.div`
  overflow-y: auto;
  height: fit-content;
  position: fixed;
  top: calc(30%);
  right: calc(5%);
  bottom: calc(5%);
  left: calc(5%);
  background-color: #ee9a00;
  border-radius: 20px;
  padding: 30px;
`;

const StyledPageBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #b1b1b1;
  opacity:0.9;
`;

