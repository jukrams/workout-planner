import styled from "styled-components";

export default function ExerciseDetails({ exercise }) {
  return (
    <>
      <figure>
        <ExerciseImage src={exercise.imageUrl} />
        <ExerciseDetailsMuscle>
          {exercise.muscleGroups.join(" ")}
        </ExerciseDetailsMuscle>
      </figure>
      <ExerciseDetailsInstruction>
        {exercise.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ExerciseDetailsInstruction>
    </>
  );
}

const ExerciseImage = styled.img`
  width: 75vw;
  height: auto;
  border-radius: 1rem;
`;
const ExerciseDetailsMuscle = styled.figcaption`
  font-family: Verdana;
  font-size: medium;
  font-weight: bold;
`;
const ExerciseDetailsInstruction = styled.ol`
  font-family: Verdana;
  font-size: 1rem;
  line-height: 1.5rem;
  width: 75vw;
  padding: 1.5rem 2rem 1.5rem 4rem;
  margin-top: 2rem;
  background-color: #fdfd96;
  border-radius: 1.5rem;
  margin-bottom: 5.5rem;
`;
