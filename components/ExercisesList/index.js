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
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
  margin: 1rem auto 5.5rem auto;
  width: 85vw;
  max-width: 1000px;
`;
