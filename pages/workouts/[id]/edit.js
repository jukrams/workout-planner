import WorkoutForm from "@/components/WorkoutForm";
import { useRouter } from "next/router";
import styled from "styled-components";
import { uid } from "uid";
import HeadlineSection from "@/components/HeadlineSection";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: session } = useSession();
  const url = session
    ? `/api/workouts/user/${session.user.id}`
    : `/api/workouts/${id}`;
  const { data: workouts } = useSWR(url);
  const { data: exercises } = useSWR("/api/exercises");

  if (!id || !workouts || !exercises) {
    return <p>Loading...</p>;
  }

  // async function handleEditWorkout(editedWorkout) {
  //   const response = await fetch(`/api/workouts/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(editedWorkout),
  //   });
  //   if (response.ok) {
  //     router.push("/workouts");
  //   }
  // }

  async function handleEditWorkout(editedWorkout) {
    if (!session) {
      console.error("No active session found. Please log in.");
      return;
    }
    const response = await fetch(`/api/workouts/user/${session.user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedWorkout),
    });
    if (response.ok) {
      router.push("/workouts");
    }
  }

  const workoutToEdit = workouts.find((workout) => workout._id === id);

  if (!workoutToEdit) {
    return <p>Loading...</p>;
  }

  const defaultData = {
    id: workoutToEdit._id,
    name: workoutToEdit.name,
    exercises: workoutToEdit.exercises.map((workoutToEditExercise) => {
      const foundExercise = exercises.find(
        (exercise) => exercise._id === workoutToEditExercise.exerciseId
      );
      return {
        exercise: foundExercise.name,
        sets: workoutToEditExercise.sets,
        reps: workoutToEditExercise.reps,
        _id: uid(),
      };
    }),
  };

  return (
    <>
      <HeadlineSection isEditMode />
      <FormSection>
        <WorkoutForm
          exercises={exercises}
          isEditMode
          defaultData={defaultData}
          onEditWorkout={handleEditWorkout}
        />
      </FormSection>
    </>
  );
}

const FormSection = styled.section`
  display: flex;
  justify-content: center;
`;
