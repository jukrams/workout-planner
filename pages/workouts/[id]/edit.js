import WorkoutForm from "@/components/WorkoutForm";
import { useRouter } from "next/router";
import styled from "styled-components";
import { uid } from "uid";
import Link from "next/link";
import Image from "next/image";

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
      <HeadlineSection>
        <BackLink href={"/workouts"}>
          <Image
            src="/icons/back-arrow-white.svg"
            width={40}
            height={40}
            alt="Back"
          />
        </BackLink>
        <Headline>
          Edit
          <br />
          your
          <br />
          workout
        </Headline>
      </HeadlineSection>
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

const HeadlineSection = styled.section`
  width: 85vw;
  max-width: 1000px;
  margin: 1.5rem auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Headline = styled.h1`
  color: var(--dark-orange);
  font-size: xxx-large;
  font-weight: normal;
  line-height: 0.8;
  text-align: end;
  margin: 0;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  background-color: var(--dark-orange);
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormSection = styled.section`
  display: flex;
  justify-content: center;
`;
