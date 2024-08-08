import Link from "next/link";
import styled from "styled-components";

export default function ExercisePreview({ exercise }) {
  return (
    <StyledLink href={`/exercises/${exercise.id}`}>
      <ExerciseCard>
        <ExerciseImage src={exercise.imageUrl} />
        <ExerciseCardName>{exercise.name}</ExerciseCardName>
        <ExerciseCardMuscleContainer>
          {exercise.muscleGroups.map((muscle, index) => (
            <ExerciseCardMuscle key={index}>{muscle}</ExerciseCardMuscle>
          ))}
        </ExerciseCardMuscleContainer>
      </ExerciseCard>
    </StyledLink>
  );
}

const ExerciseCard = styled.li`
  margin: 0 2rem 2rem 2rem;
  list-style: none;
  position: relative;
`;

const ExerciseCardName = styled.p`
  font-family: Verdana;
  font-size: medium;
  position: absolute;
  top: 0;
  left: 4vw;
  font-weight: bold;
  color: white;
  background-color: #EDB01E;
  padding: 0.5rem;
  border-radius: 25px;
`;

const ExerciseCardMuscleContainer = styled.div`
  position: absolute;
  bottom: 3vw;
  left: 2vw;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.2rem;
`;


const ExerciseCardMuscle = styled.p`
  font-family: Verdana;
  font-size: small;
  color: #4D4020;
  position: relative;
  display: inline-block;
  font-weight: bold;
  background-color: rgba(253, 237, 200, 0.8);
  padding: 0.5rem;
  border-radius: 25px;
  margin: 0.2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExerciseImage = styled.img`
  width: 80vw;
  height: auto;
  border-radius: 1rem;
`;
