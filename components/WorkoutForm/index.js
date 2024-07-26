import { useState } from "react";

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
    handleAddExercise();
    const newWorkout = {
      name: event.target.name.value,
      exercises: [
        addedExercises.map((addedExercise) => {
          const selectedExercise = exercises.find(
            (exercise) => exercise.name === addedExercise.exercise
          );
          return {
            exerciseId: selectedExercise.id,
            sets: addedExercise.sets,
            reps: addedExercise.reps,
          };
        }),
      ],
    };
    console.log(newWorkout);
    onAddWorkout(newWorkout);
  }

  return (
    <section>
      <h2>Create a new Workout</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Workout name:</label>
        <input
          name="name"
          id="name"
          type="text"
          maxLength="20"
          placeholder="Insert name here"
          required
        />
        <h3>Add your exercises</h3>

        <section>
          <h4>Added exercises:</h4>
          <ol>
            {addedExercises.map((addedExercise, index) => (
              <li key={index}>
                {addedExercise.exercise} sets: {addedExercise.sets} reps:{" "}
                {addedExercise.reps}
              </li>
            ))}
          </ol>
          <label htmlFor="exerciseName">Exercise name:</label>
          <select
            name="exerciseName"
            id="exerciseName"
            required={addedExercises.length === 0 ? true : false}
          >
            <option value="" disabled selected>
              Please select an exercise
            </option>
            {exercises.map((exercise) => (
              <option value={exercise.name} key={exercise.id}>
                {exercise.name}
              </option>
            ))}
          </select>
          <label htmlFor="sets">Sets:</label>
          <input
            name="sets"
            id="sets"
            type="number"
            min="1"
            max="150"
            required={addedExercises.length === 0 ? true : false}
          />
          <label htmlFor="reps">Reps:</label>
          <input
            name="reps"
            id="reps"
            type="number"
            min="1"
            max="20"
            required={addedExercises.length === 0 ? true : false}
          />
          <button
            aria-label="Add new ecerxise to list"
            type="button"
            onClick={handleAddExercise}
          >
            Add new exercise to list
          </button>
        </section>
        <button aria-label="Create new workout" type="submit">
          Create Workout
        </button>
      </form>
    </section>
  );
}
