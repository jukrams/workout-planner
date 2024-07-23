import Image from "next/image";
import styled from "styled-components";
export default function ExercisePreview({ exercise }) {
  return (
    <ExerciseCard imageUrl={exercise.imageUrl}>
      <ExerciseCardName>{exercise.name}</ExerciseCardName>
      <ExerciseCardMuscle>{exercise.muscleGroups}</ExerciseCardMuscle>
    </ExerciseCard>
  );
}

const ExerciseCard = styled.li`
  margin: 2rem;
  list-style: none;
  position: relative;
  width: 400px;
  height: 300px;
  list-style: none;
  border-radius: 1rem;
  overflow: hidden;
  background: url(${(props) => props.imageUrl}) no-repeat center center;
  background-size: cover;
`;

const ExerciseCardName = styled.p`
  font-family: Verdana;
  font-size: small;
`;

const ExerciseCardMuscle = styled.p`
  font-family: Verdana;
  font-size: small;
`;
