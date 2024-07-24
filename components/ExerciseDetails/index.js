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
        {exercise.instructions.map((inst, index) => (
          <li key={index}>{inst}</li>
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
  padding-left: 4rem;
  padding-right: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  margin-top:2rem;
  background-color: #fdfd96;
  border-radius: 1.5rem;
`;
