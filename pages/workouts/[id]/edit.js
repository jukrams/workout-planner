import WorkoutForm from "@/components/WorkoutForm";
import { useRouter } from "next/router";
import styled from "styled-components";
import { uid } from "uid";

export default function EditPage({ exercises, workouts, onEditWorkout }) {
  const router = useRouter();
  const { id } = router.query;

  const workoutToEdit = workouts.find((workout) => workout.id === id);

  if (!workoutToEdit) {
    return <p>Loading...</p>;
  }

  const defaultData = {
    id: workoutToEdit.id,
    name: workoutToEdit.name,
    exercises: workoutToEdit.exercises.map((workoutToEditExercise) => {
      const foundExercise = exercises.find(
        (exercise) => exercise.id === workoutToEditExercise.exerciseId
      );
      return {
        exercise: foundExercise.name,
        sets: workoutToEditExercise.sets,
        reps: workoutToEditExercise.reps,
        id: uid(),
      };
    }),
  };

  return (
    <>
      <h1>Edit Workout</h1>
      <FormSection>
        <WorkoutForm
          exercises={exercises}
          isEditMode
          defaultData={defaultData}
          onEditWorkout={onEditWorkout}
        />
      </FormSection>
    </>
  );
}

const FormSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;
