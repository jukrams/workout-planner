import WorkoutForm from "@/components/WorkoutForm";
import styled from "styled-components";
import HeadlineSection from "@/components/HeadlineSection";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CreateWorkout() {
  const router = useRouter();

  const {
    data: exercises = [],
    error: errorExercises,
    isLoading: exerciseIsLoading,
  } = useSWR("/api/exercises");

  async function handleAddWorkout(newWorkout) {
    const response = await fetch("/api/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout),
    });

    if (response.ok) {
      router.push("/workouts");
    }
  }

  return (
    <Background>
      <HeadlineSection />
      <WorkoutForm exercises={exercises} onAddWorkout={handleAddWorkout} />
    </Background>
  );
}

const Background = styled.section`
  background-color: var(--orange);
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;
