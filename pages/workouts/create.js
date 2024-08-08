import WorkoutForm from "@/components/WorkoutForm";
import styled from "styled-components";
import HeadlineSection from "@/components/HeadlineSection";

export default function CreateWorkout({ exercises, onAddWorkout }) {
  return (
    <Background>
      <HeadlineSection />
      <WorkoutForm exercises={exercises} onAddWorkout={onAddWorkout} />
    </Background>
  );
}

const Background = styled.section`
  background-color: var(--orange);
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;
