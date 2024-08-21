import styled from "styled-components";

export default function ExerciseDetails({ exercise }) {
  return (
    <Container>
      <ImageWrapper>
        <ExerciseImage src={exercise.imageUrl} alt={exercise.name} />
      </ImageWrapper>
      <TitleAndMuscleWrapper>
        <ExerciseTitle>{exercise.name}</ExerciseTitle>
        <MuscleGroupWrapper>
          {exercise.muscleGroups.map((muscle) => (
            <MuscleGroup key={muscle}>{muscle}</MuscleGroup>
          ))}
        </MuscleGroupWrapper>
      </TitleAndMuscleWrapper>
      <ExerciseDetailsInstruction>
        {exercise.instructions.map((instruction, index) => (
          <InstructionItem key={index}>
            <InstructionNumber>{index + 1}</InstructionNumber>
            <li key={index}>{instruction}</li>
          </InstructionItem>
        ))}
      </ExerciseDetailsInstruction>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 350px;
  overflow: hidden;
  margin: 0;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const ExerciseImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const TitleAndMuscleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`;

const ExerciseTitle = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  flex-shrink: 0;
  color: var(--dark-brown);
`;

const MuscleGroupWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 0.5rem;
  margin-left: 1rem;
  flex-grow: 1;
`;

const MuscleGroup = styled.span`
  font-size: 0.75rem;
  color: var(--dark-brown);
  font-weight: bold;
  background-color: var(--orange);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
`;

const ExerciseDetailsInstruction = styled.ol`
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  list-style: none;
`;

const InstructionItem = styled.li`
  margin-bottom: 1rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: var(--dark-brown);
`;

const InstructionNumber = styled.span`
  background-color: var(--orange);
  color: white;
  font-weight: bold;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;
