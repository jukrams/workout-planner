import Image from "next/image";
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
      <ExerciseInstruction>
        {exercise.instructions.map((instruction, index) => (
          <ExerciseInstructionSteps key={index}>
            <NumberWrapper>
              <Circle
                height={35}
                width={35}
                alt="Circle"
                src={"/icons/circle-filled-orange.svg"}
              />
              <Number>{index + 1}</Number>
            </NumberWrapper>
            {instruction}
          </ExerciseInstructionSteps>
        ))}
      </ExerciseInstruction>
    </Container>
  );
}

const ExerciseInstruction = styled.ul`
  list-style: none;
  width: 85vw;
  max-width: 1000px;
  margin: 2.5rem auto 0 auto;
  padding: 0;
`;

const ExerciseInstructionSteps = styled.li`
  display: flex;
  align-items: center;
  color: var(--dark-brown);
  line-height: 1.25;
  margin-bottom: 1rem;
`;

const NumberWrapper = styled.section`
  position: relative;
  height: 35px;
  width: 35px;
  margin-right: 2rem;
`;

const Circle = styled(Image)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
`;

const Number = styled.p`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
`;

const Container = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-height: 40vh;
  max-width: 500px;
  overflow: hidden;
  margin: 0 auto;
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
`;

const ExerciseImage = styled.img`
  width: 100%;
  object-fit: cover;
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
  background-color: var(--light-orange);
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
`;
