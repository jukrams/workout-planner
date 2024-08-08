import { useState } from "react";
import styled from "styled-components";

export default function WorkoutPreview({
  name,
  exercises,
  workoutExercises,
  even,
}) {
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

  const splittedName = name.split(" ");

  return (
    <>
      <HeadlineSection>
        {splittedName.map((word, index) => (
          <Headline key={index} $even={even}>
            {word}
          </Headline>
        ))}
      </HeadlineSection>
      <MusclesList>
        {workoutMuscleGroups.map((workoutMuscleGroup) => (
          <MuscleTags key={workoutMuscleGroup}>{workoutMuscleGroup}</MuscleTags>
        ))}
      </MusclesList>
      {isDetailsMode && (
        <ExercisesList>
          {includedExercises.map((includedExercise) => (
            <Exercises key={includedExercise.id} $even={even}>
              <ExerciseName $even={even}>{includedExercise.name}</ExerciseName>
              <SetsReps>
                {includedExercise.sets} sets / {includedExercise.reps} reps
              </SetsReps>
            </Exercises>
          ))}
        </ExercisesList>
      )}
      <DetailsButton onClick={() => setIsDetailsMode(!isDetailsMode)}>
        {isDetailsMode ? "SHOW LESS" : "SHOW MORE"}
      </DetailsButton>
    </>
  );
}

const HeadlineSection = styled.section`
  margin-bottom: 1rem;
`;

const Headline = styled.h2`
  margin: 0;
  font-size: 3rem;
  font-weight: normal;
  line-height: 1;
  color: ${(props) => (props.$even ? "white" : "var(--dark-orange)")};

  &:last-of-type {
    margin-bottom: 0.5rem;
  }
`;

const MusclesList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const MuscleTags = styled.li`
  background-color: var(--dark-brown);
  color: white;
  border-radius: 1rem;
  padding: 0 0.5rem;
  margin: 0.25rem;
`;

const DetailsButton = styled.button`
  background: none;
  width: fit-content;
  color: var(--dark-brown);
  font-size: large;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 0.75rem;
  padding: 0;
`;

const ExercisesList = styled.ol`
  padding: 0;
  list-style-position: inside;
`;

const Exercises = styled.li`
  border-bottom: ${(props) =>
    props.$even ? "1px solid white" : "1px solid var(--dark-orange)"};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &:last-of-type {
    border: none;
  }

  &:first-of-type {
    margin-top: 0.5rem;
  }
`;

const ExerciseName = styled.p`
  font-size: x-large;
  margin: 0.75rem 0 -0.25rem 0;
  color: ${(props) => (props.$even ? "white" : "var(--dark-orange)")};
`;

const SetsReps = styled.p`
  font-size: normal;
  margin: 0;
  color: var(--dark-brown);
`;
