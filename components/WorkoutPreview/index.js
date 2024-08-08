import { useState } from "react";
import styled from "styled-components";

export default function WorkoutPreview({ name, exercises, workoutExercises }) {
  const includedExercises = workoutExercises.map((workoutExercise) => {
    const exercise = exercises.find(
      (exerciseItem) => exerciseItem.id === workoutExercise.exerciseId
    );
    return {
      ...exercise,
      sets: workoutExercise.sets,
      reps: workoutExercise.reps,
    };
  });

  const allMuscleGroups = includedExercises.flatMap(
    (includedExercise) => includedExercise.muscleGroups
  );
  const workoutMuscleGroups = [...new Set(allMuscleGroups)];
  const [isDetailsMode, setIsDetailsMode] = useState(false);

  return (
    <>
      <h2>{name}</h2>
      <p>{workoutMuscleGroups.join(" - ")}</p>
      <ShowButton onClick={() => setIsDetailsMode(!isDetailsMode)}>
        {isDetailsMode ? "SHOW LESS" : "SHOW MORE"}
      </ShowButton>
      {isDetailsMode && (
        <WorkoutsList>
          {includedExercises.map((includedExercise) => (
            <WorkoutExercises key={includedExercise.id}>
              {includedExercise.name}
              <SetsReps>
                {includedExercise.sets} sets / {includedExercise.reps} reps
              </SetsReps>
            </WorkoutExercises>
          ))}
        </WorkoutsList>
      )}
    </>
  );
}

const WorkoutExercises = styled.li`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.5rem;
  margin: 1rem 0;
  font-family: Verdana;
`;

const WorkoutsList = styled.ol`
  padding: 0;
  list-style-position: inside;
`;

const SetsReps = styled.p`
  margin: 0;
  line-height: 1.5;
`;

const ShowButton = styled.button`
  width: 8rem;
  color: orange;
  font-weight: bold;
  font-size: 1rem;
  border: none;
  text-decoration-line: underline;
  background-color: white;
  cursor: pointer;
  margin-right: 20px;
`;
