import ExercisePreview from "../ExercisePreview";
import styled from "styled-components";

export default function ExercisesList({ exercises, exerciseIsLoading }) {
  if (exerciseIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <List>
      {!exerciseIsLoading && exercises.length === 0 ? (
        <p>No exercises found!</p>
      ) : (
        exercises.map((exercise) => (
          <ExercisePreview key={exercise._id} exercise={exercise} />
        ))
      )}
    </List>
  );
}

const List = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
`;
