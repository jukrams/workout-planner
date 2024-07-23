import Link from "next/link";
import styled from "styled-components";
export default function ExercisePreview({ exercise }) {
  return (
    <StyledLink href={`/exercises/${exercise.id}`}>
      <ExerciseCard $image={exercise.imageUrl}>
        <ExerciseCardName>{exercise.name}</ExerciseCardName>
        <ExerciseCardMuscle>
          {exercise.muscleGroups.join(" ")}
        </ExerciseCardMuscle>
      </ExerciseCard>
    </StyledLink>
  );
}

const ExerciseCard = styled.li`
  margin: 2rem;
  list-style: none;
  position: relative;
  width: 75vw;
  height: 25vh;
  list-style: none;
  border-radius: 1rem;
  overflow: hidden;
  background: url(${(props) => props.$image}) no-repeat center center;
  background-size: cover;
`;

const ExerciseCardName = styled.p`
  font-family: Verdana;
  font-size: medium;
  position: absolute;
  top: 0;
  right: 1rem;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  border-radius: 25px;
`;

const ExerciseCardMuscle = styled.p`
  font-family: Verdana;
  font-size: medium;
  position: absolute;
  bottom: -0.5rem;
  left: 1rem;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem;
  border-radius: 25px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
