import styled from "styled-components";
import Image from "next/image";
import ConfettiExplosion from "react-confetti-explosion";

export default function ModalFinishedWorkout({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ConfettiWrapper>
          <ConfettiExplosion
            force={0.6}
            duration={2500}
            particleCount={80}
            width={1000}
            zIndex={1002}
          />
        </ConfettiWrapper>
        <CheckIcon
          alt="Check"
          width={70}
          height={70}
          src="/icons/check-orange.svg"
        />
        <p>
          <LargeText>
            Awesome!
            <br />
          </LargeText>
          You have completed your workout
        </p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  z-index: 1001;
`;

const CheckIcon = styled(Image)`
  border: 5px solid var(--orange);
  border-radius: 50%;
  margin-bottom: 0.5rem;
`;

const LargeText = styled.span`
  line-height: 1;
  font-size: xx-large;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.25rem 1rem;
  background-color: var(--orange);
  border: none;
  color: white;
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--dark-orange);
  }
`;

const ConfettiWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;
