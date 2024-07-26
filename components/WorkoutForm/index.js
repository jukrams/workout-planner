import { useState } from "react";
import styled from "styled-components";

export default function WorkoutForm({ onAddWorkout, exercises }) {
  const [addedExercises, setAddedExercises] = useState([]);

  function handleAddExercise() {
    if (exerciseName.value !== "" && sets.value !== "" && reps.value !== "") {
      setAddedExercises([
        ...addedExercises,
        { exercise: exerciseName.value, sets: sets.value, reps: reps.value },
      ]);
      exerciseName.value = "";
      sets.value = "";
      reps.value = "";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newWorkout = {
      name: event.target.name.value,
      exercises: addedExercises.map((addedExercise) => {
        const selectedExercise = exercises.find(
          (exercise) => exercise.name === addedExercise.exercise
        );
        return {
          exerciseId: selectedExercise.id,
          sets: addedExercise.sets,
          reps: addedExercise.reps,
        };
      }),
    };
    onAddWorkout(newWorkout);
    event.target.reset();
    setAddedExercises([]);
  }

  return (
    <FormSection>
      <h2>Create a new Workout</h2>
      <StyledForm onSubmit={handleSubmit}>
        <StyledSection>
          <label htmlFor="name">Workout name:</label>
          <StyledInput
            name="name"
            id="name"
            type="text"
            maxLength="20"
            placeholder="Insert name here"
            required
          />
        </StyledSection>
        <h3>Add your exercises</h3>
        <StyledSection>
          <h4>Added exercises:</h4>
          <ExercisesList>
            {addedExercises.map((addedExercise, index) => (
              <li key={index}>
                {addedExercise.exercise} sets: {addedExercise.sets} reps:{" "}
                {addedExercise.reps}
              </li>
            ))}
          </ExercisesList>
          <label htmlFor="exerciseName">Exercise name:</label>
          <StyledDropdown
            name="exerciseName"
            id="exerciseName"
            required={addedExercises.length === 0 ? true : false}
            defaultValue=""
          >
            <option value="" disabled>
              Please select an exercise
            </option>
            {exercises.map((exercise) => (
              <option value={exercise.name} key={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </StyledDropdown>
          <label htmlFor="sets">Sets:</label>
          <StyledInput
            name="sets"
            id="sets"
            type="number"
            min="1"
            max="150"
            required={addedExercises.length === 0 ? true : false}
          />
          <label htmlFor="reps">Reps:</label>
          <StyledInput
            name="reps"
            id="reps"
            type="number"
            min="1"
            max="20"
            required={addedExercises.length === 0 ? true : false}
          />
          <AddButton
            aria-label="Add new exercise to list"
            type="button"
            onClick={handleAddExercise}
          >
            Add new exercise to list
          </AddButton>
        </StyledSection>
        <SubmitButton
          aria-label="Create new workout"
          type="submit"
          disabled={addedExercises.length === 0 ? true : false}
        >
          Create Workout
        </SubmitButton>
      </StyledForm>
    </FormSection>
  );
}

const FormSection = styled.section`
  margin: 2rem;
  border: 3px solid black;
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  max-width: 1000px;
  width: 80vw;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledSection = styled.section`
  border: 2px solid black;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem 0.5rem;
`;

const ExercisesList = styled.ol`
  margin: 0 0 1.5rem 0;
`;

const AddButton = styled.button`
  width: fit-content;
  padding: 0.5rem;
  background-color: orange;
  border-radius: 0.5rem;

  &:hover {
    background-color: yellow;
  }
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  width: fit-content;
  padding: 0.5rem;
  background-color: orange;
  border-radius: 0.5rem;
  align-self: center;

  &:hover {
    background-color: yellow;
  }
`;

const StyledInput = styled.input`
  width: 70%;
  margin: 0.5rem 0 0.75rem 0;
`;
const StyledDropdown = styled.select`
  width: 70%;
  margin: 0.5rem 0 0.75rem 0;
`;
