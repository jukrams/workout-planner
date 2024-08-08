import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import { exercises } from "@/lib/exercises.js";
import { workouts } from "@/lib/workouts";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { muscleGroups } from "@/lib/muscle-groups";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [workoutsList, setWorkoutsList] = useLocalStorageState("workoutsList", {
    defaultValue: workouts,
  });
  const router = useRouter();
  const showNavbar =
    router.pathname !== "/home" && !router.pathname.startsWith("/exercises/");
  function handleAddWorkout(newWorkout) {
    setWorkoutsList([{ id: uid(), ...newWorkout }, ...workoutsList]);
  }

  function handleEditWorkout(editedWorkout) {
    setWorkoutsList(
      workoutsList.map((workout) =>
        workout.id === editedWorkout.id
          ? { ...workout, ...editedWorkout }
          : workout
      )
    );
  }

  function handleDeleteWorkout(id) {
    setWorkoutsList(workoutsList.filter((workout) => workout.id !== id));
  }

  return (
    <>
      <GlobalStyle />
      <Layout showNavbar={showNavbar}>
        <Component
          {...pageProps}
          exercises={exercises}
          workouts={workoutsList}
          onAddWorkout={handleAddWorkout}
          onEditWorkout={handleEditWorkout}
          onDeleteWorkout={handleDeleteWorkout}
          muscleGroups={muscleGroups}
        />
      </Layout>
    </>
  );
}
