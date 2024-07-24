import ExercisePreview from "../ExercisePreview";
import styled from "styled-components";

export default function ExercisesList({ exercises }) {
  return (
    <List>
      {exercises.map((exercise) => (
        <ExercisePreview key={exercise.id} exercise={exercise} />
      ))}
    </List>
  );
}

const List = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
