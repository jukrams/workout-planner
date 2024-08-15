import { useState } from "react";
import styled from "styled-components";
import { uid } from "uid";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function WorkoutForm({
  onAddWorkout,
  exercises,
  isEditMode,
  defaultData,
  onEditWorkout,
}) {
  const router = useRouter();

  const [addedExercises, setAddedExercises] = useState(
    defaultData ? defaultData.exercises : []
  );

  function handleAddExercise() {
    if (
      exerciseName.value !== "" &&
      sets.value !== "" &&
      reps.value !== "" &&
      sets.value >= 1 &&
      sets.value <= 20 &&
      reps.value >= 1 &&
      reps.value <= 150
    ) {
      setAddedExercises([
        ...addedExercises,
        {
          exercise: exerciseName.value,
          sets: sets.value,
          reps: reps.value,
          _id: uid(),
        },
      ]);
      exerciseName.value = "";
      sets.value = "";
      reps.value = "";
    } else {
      alert("Please enter valid values for sets and reps.");
    }
  }

  function handleDeleteExercise(id) {
    setAddedExercises(
      addedExercises.filter((addedExercise) => addedExercise._id !== id)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isEditMode) {
      const newWorkout = {
        name: event.target.name.value,
        exercises: addedExercises.map((addedExercise) => {
          const selectedExercise = exercises.find(
            (exercise) => exercise.name === addedExercise.exercise
          );
          return {
            exerciseId: selectedExercise._id,
            sets: addedExercise.sets,
            reps: addedExercise.reps,
          };
        }),
      };
      onAddWorkout(newWorkout);
    } else {
      const editedWorkout = {
        id: defaultData.id,
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
      onEditWorkout(editedWorkout);
      router.push("/workouts");
    }

    event.target.reset();
    setAddedExercises([]);
  }

  return (
    <FormSection>
      <StyledForm onSubmit={handleSubmit}>
        <StyledFieldset $edit={isEditMode}>
          <StyledLegend $edit={isEditMode}>First step</StyledLegend>
          <StyledLabel htmlFor="name">Workout name</StyledLabel>
          <StyledInput
            name="name"
            id="name"
            type="text"
            maxLength="30"
            placeholder="Insert name here"
            defaultValue={defaultData?.name}
            required
            $edit={isEditMode}
          />
        </StyledFieldset>
        <StyledFieldset $edit={isEditMode}>
          <StyledLegend $edit={isEditMode}>Second step</StyledLegend>
          <ExercisesListHeadline>Added to list:</ExercisesListHeadline>
          {addedExercises.map((addedExercise) => (
            <AddedExercise key={addedExercise._id}>
              {addedExercise.exercise} {addedExercise.sets} sets /{" "}
              {addedExercise.reps} reps
              <DeleteButton
                type="button"
                onClick={() => handleDeleteExercise(addedExercise._id)}
                $edit={isEditMode}
              >
                X
              </DeleteButton>
            </AddedExercise>
          ))}
          <StyledLabel htmlFor="exerciseName">Exercise name</StyledLabel>
          <StyledDropdown
            name="exerciseName"
            id="exerciseName"
            required={addedExercises.length === 0}
            defaultValue=""
            $edit={isEditMode}
          >
            <option value="" disabled>
              Please select an option
            </option>
            {exercises.map((exercise) => (
              <option value={exercise.name} key={exercise._id}>
                {exercise.name}
              </option>
            ))}
          </StyledDropdown>
          <StyledLabel htmlFor="sets">Exercise Sets</StyledLabel>
          <StyledInput
            name="sets"
            id="sets"
            type="number"
            min="1"
            max="20"
            placeholder="1-20"
            required={addedExercises.length === 0 ? true : false}
            $edit={isEditMode}
          />
          <StyledLabel htmlFor="reps">Exercise Reps</StyledLabel>
          <StyledInput
            type="number"
            id="reps"
            name="reps"
            min="1"
            max="150"
            placeholder="1-150"
            required={addedExercises.length === 0 ? true : false}
            $edit={isEditMode}
          />
          <AddButton
            aria-label="Add new exercise to list"
            type="button"
            onClick={handleAddExercise}
          >
            Add exercise to list
          </AddButton>
        </StyledFieldset>
        {isEditMode ? (
          <ButtonSection>
            <CancelButton
              type="button"
              onClick={() => router.push("/workouts")}
            >
              Cancel
            </CancelButton>
            <SaveButton
              type="submit"
              disabled={addedExercises.length === 0 ? true : false}
            >
              Save
            </SaveButton>
          </ButtonSection>
        ) : (
          <SubmitButton
            aria-label="Create new workout"
            type="submit"
            disabled={addedExercises.length === 0 ? true : false}
          >
            Create Workout
          </SubmitButton>
        )}
      </StyledForm>
    </FormSection>
  );
}

const FormSection = styled.section`
  max-width: 1000px;
  width: 85vw;
  margin: 0 auto 5.5rem auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledFieldset = styled.fieldset`
  border: ${(props) =>
    props.$edit
      ? "3px dotted rgba(250, 199, 78, 0.5)"
      : "3px dotted rgba(255, 255, 255, 0.5)"};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  padding-top: 0;
`;

const StyledLegend = styled.legend`
  color: ${(props) => (props.$edit ? "var(--orange)" : "white")};
  font-size: xx-large;
  padding-left: 0;
`;

const StyledLabel = styled.label`
  color: var(--dark-brown);
  font-size: larger;
`;

const ExercisesListHeadline = styled.p`
  color: var(--dark-brown);
  font-size: larger;
  line-height: 1;
  margin-bottom: 0.35rem;
`;

const AddedExercise = styled.p`
  color: var(--dark-brown);
  margin: 0;
  line-height: 1.25;
  font-size: smaller;

  &:last-of-type {
    margin-bottom: 0.75rem;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: none;
  color: ${(props) => (props.$edit ? "var(--orange)" : "white")};
  font-size: 0.85rem;
  line-height: 1;

  &:hover {
    cursor: pointer;
    color: var(--dark-orange);
  }
`;

const StyledInput = styled.input`
  width: 70%;
  margin-bottom: 1rem;
  background-color: ${(props) =>
    props.$edit ? "rgba(250, 199, 78, 0.78)" : "rgba(255, 255, 255, 0.78)"};
  color: var(--dark-brown);
  border: none;
  border-radius: 1rem;
  font-size: medium;
  padding-left: 0.75rem;
`;

const StyledDropdown = styled.select`
  width: 70%;
  margin-bottom: 1rem;
  background-color: ${(props) =>
    props.$edit ? "rgba(250, 199, 78, 0.78)" : "rgba(255, 255, 255, 0.78)"};
  color: ${(props) => (props.$edit ? "white" : "var(--orange)")};
  border: none;
  border-radius: 1rem;
  font-size: medium;
  padding-left: 0.75rem;
`;

const AddButton = styled.button`
  width: fit-content;
  background-color: #af7b00;
  color: rgba(255, 255, 255, 0.95);
  font-size: medium;
  border-radius: 1rem;
  border: none;
  padding: 0.1rem 1rem;
  margin: 0.5rem 0;

  &:hover {
    background-color: var(--dark-orange);
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  width: 85vw;
  max-width: 1000px;
  background-color: var(--dark-brown);
  color: rgba(255, 255, 255, 0.95);
  font-size: larger;
  border-radius: 1.5rem;
  border: none;
  padding: 0.2rem 0;
  margin: 0.5rem auto;

  &:hover {
    background-color: var(--dark-orange);
    cursor: pointer;
  }
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: space-between;
  width: 85vw;
  max-width: 1000px;
`;

const CancelButton = styled.button`
  background: none;
  color: var(--dark-orange);
  font-size: larger;
  border-radius: 1.5rem;
  border: 2px solid var(--dark-orange);
  margin: 0.5rem 0;
  width: 48%;

  &:hover {
    background-color: var(--dark-orange);
    cursor: pointer;
  }
`;

const SaveButton = styled.button`
  width: 48%;
  background-color: var(--dark-brown);
  color: rgba(255, 255, 255, 0.95);
  font-size: larger;
  border-radius: 1.5rem;
  border: none;
  margin: 0.5rem 0;

  &:hover {
    background-color: var(--dark-orange);
    cursor: pointer;
  }
`;
