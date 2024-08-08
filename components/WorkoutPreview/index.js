import { useState } from "react";
import styled from "styled-components";
import ConfettiExplosion from "react-confetti-explosion";
import ProgressBar from "../ProgressBar";
import useLocalStorageState from "use-local-storage-state";

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

  const [completedExercises, setCompletedExercises] = useState([]);
  const progress = (completedExercises.length / includedExercises.length) * 100;

  function toggleExerciseCompletion(exerciseId) {
    setCompletedExercises(
      completedExercises.includes(exerciseId)
        ? completedExercises.filter(
            (completedExercise) => completedExercise !== exerciseId
          )
        : [...completedExercises, exerciseId]
    );
  }

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
        <>
          <ProgressSection>
            <ProgressBar progress={progress} />
            {progress === 100 ? (
              <ConfettiWrapper>
                <ConfettiExplosion
                  force={0.6}
                  duration={2500}
                  particleCount={80}
                  width={1000}
                />
              </ConfettiWrapper>
            ) : null}
          </ProgressSection>
          <ExercisesList>
            {includedExercises.map((includedExercise) => (
              <Exercises key={includedExercise.id} $even={even}>
                <ExerciseName $even={even}>
                  {includedExercise.name}
                </ExerciseName>
                <SetsReps>
                  {includedExercise.sets} sets / {includedExercise.reps} reps
                </SetsReps>
                <Checkbox
                  type="checkbox"
                  $even={even}
                  checked={completedExercises.includes(includedExercise.id)}
                  onChange={() => toggleExerciseCompletion(includedExercise.id)}
                />
              </Exercises>
            ))}
          </ExercisesList>
        </>
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

const ProgressSection = styled.section`
  position: relative;
`;

// const ProgressBar = styled.input`
//   margin: 1.25rem auto 0 auto;
//   width: 100%;
//   accent-color: ${(props) => (props.$even ? "red" : "var(--dark-orange)")};
// `;

const ConfettiWrapper = styled.section`
  position: absolute;
  right: 0;
  bottom: 1rem;
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
  display: grid;
  grid-template-columns: auto auto 10%;
  align-items: flex-end;

  &:last-of-type {
    border: none;
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
  padding-right: 1rem;
  color: var(--dark-brown);
  text-align: end;
`;

const Checkbox = styled.input`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 24px;
  height: 24px;
  background-color: white;
  border: 2px solid
    ${(props) => (props.$even ? "var(--dark-brown)" : "var(--dark-orange)")};
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  display: inline-block;
  margin-bottom: 0.4rem;

  &:checked {
    background-color: ${(props) =>
      props.$even ? "var(--dark-brown)" : "var(--dark-orange)"};
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 6px;
    width: 9px;
    height: 13px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
