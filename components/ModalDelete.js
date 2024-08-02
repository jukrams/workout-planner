import styled from "styled-components";

export default function ModalDelete({ onConfirm, onCancel }) {
  return (
    <StyledModalMessage>
      <p>Are you sure you want to delete this project?</p>
      <StyledButton type="button" onClick={onConfirm}>
        Yes
      </StyledButton>
      <StyledButton type="button" onClick={onCancel}>
        No
      </StyledButton>
    </StyledModalMessage>
  );
}


export const StyledButton = styled.button`
  background-color: var(--coral);
  color: var(--text-color);
  width: 100px;
  text-align: center;
  border-radius: 20px;
  border: none;
  padding: 8px;
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1em;
  
`;
 export const StyledCancelButton = styled.button`
 position: absolute;
 top: 20px;
 right: 20px;
 cursor: pointer;
 border: none;
 background-color: transparent;
`;

function StyledModalMessage({ children }) {
  return (
    <StyledPageBackground>
      <StyledModalContainer>{children}</StyledModalContainer>
    </StyledPageBackground>
  );
}

const StyledPageBackground = styled.div`
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModalContainer = styled.div`
  overflow-y: auto;
  height: fit-content;
  position: fixed;
  z-index: 4;
  top: calc(30%);
  right: calc(5%);
  bottom: calc(5%);
  left: calc(5%);
  background-color: var(--lightbeige);
  border-radius: 20px;
  padding: 10px 20px 30px 20px;
`;
