import WorkoutPreview from "../WorkoutPreview";
import styled from "styled-components";

export default function WorkoutsList({ workouts, exercises }) {
  return (
    <WorkoutCard>
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id}>
          <WorkoutPreview
            name={workout.name}
            workoutExercises={workout.exercises}
            exercises={exercises}
            workouts={workouts}
          />
        </WorkoutItem>
      ))}
    </WorkoutCard>
  );
}

const WorkoutCard = styled.ul`
  list-style: none;
  padding: 0;
`;

const WorkoutItem = styled.li`
  margin: 2rem;
  border: 3px solid black;
  border-radius: 1.5rem;
  padding: 1rem 2rem;

  &:last-of-type {
    margin-bottom: 5.5rem;
  }
`;
