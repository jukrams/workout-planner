import Link from "next/link";
import styled from "styled-components";

export default function ExercisePreview({ exercise }) {
  return (
    <StyledLink href={`/exercises/${exercise._id}`}>
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
  list-style: none;
  position: relative;
  width: 300px;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
`;

const ExerciseCardName = styled.p`
  font-size: medium;
  position: absolute;
  top: 0;
  left: 1rem;
  font-weight: bold;
  color: white;
  background-color: #edb01e;
  padding: 0.5rem;
  border-radius: 25px;
`;

const ExerciseCardMuscleContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.2rem;
`;

const ExerciseCardMuscle = styled.p`
  font-size: small;
  color: #4d4020;
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
  width: 100%;
`;
