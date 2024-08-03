import styled from "styled-components";

export default function ModalDelete({ onConfirm, onCancel }) {
  return (
    <StyledModalMessage>
      <p>Are you sure you want to delete this workout?</p>
      <StyledButton type="button" onClick={onConfirm}>
        Yes
      </StyledButton>
      <StyledButton type="button" onClick={onCancel}>
        No
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;


 export const StyledCancelButton = styled.button`
 position: absolute;
 top: 20px;
 right: 20px;
 cursor: pointer;
 border: none;
 background-color: transparent;
`;


const StyledPageBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

`;

const StyledModalContainer = styled.div`
  overflow-y: auto;
  height: fit-content;
  position: fixed;
  top: calc(30%);
  right: calc(5%);
  bottom: calc(5%);
  left: calc(5%);
  background-color: orange;
  border-radius: 20px;
  padding: 10px 20px 30px 20px;

`;