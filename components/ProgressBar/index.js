import styled from "styled-components";

export default function ProgressBar({ progress }) {
  return (
    <ProgressBackground>
      <Progress $progress={progress}></Progress>
    </ProgressBackground>
  );
}

const ProgressBackground = styled.div`
  height: 1rem;
  width: 100%;
  background-color: white;
  border-radius: 1rem;
  margin: 1.25rem auto 0 auto;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Progress = styled.div`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: linear-gradient(
    90deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 165, 0, 1) 100%
  );
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  transition: width 0.3s ease;
`;
