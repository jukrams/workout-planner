import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import { muscleGroups } from "@/lib/muscle-groups";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR, { SWRConfig } from "swr";
import useLocalStorageState from "use-local-storage-state";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function App({ Component, pageProps }) {
  // Verwende SWR zum Laden von Workouts und Übungen
  const { data: dataWorkouts = [], error: errorWorkouts } = useSWR(
    "/api/workouts",
    fetcher
  );
  const {
    data: dataExercises = [],
    error: errorExercises,
    isLoading: exerciseIsLoading,
  } = useSWR("/api/exercises", fetcher);
  console.log(dataExercises);
  // Initialisiere favouriteWorkouts mit den geladenen Workouts
  const [favouriteWorkouts, setFavouriteWorkouts] = useLocalStorageState(
    "favouriteWorkouts",
    {
      defaultValue: dataWorkouts.map((workout) => ({
        id: workout._id,
        isFavourite: false,
      })),
    }
  );

  const [workoutsList, setWorkoutsList] = useState(dataWorkouts);

  useEffect(() => {
    if (dataWorkouts.length > 0) {
      setWorkoutsList(dataWorkouts);
    }
  }, [dataWorkouts]);

  const router = useRouter();
  const showNavbar =
    router.pathname !== "/" &&
    !router.pathname.startsWith("/exercises/") &&
    !router.pathname.startsWith("/workouts/");

  function handleAddWorkout(newWorkout) {
    setWorkoutsList([{ id: uid(), ...newWorkout }, ...workoutsList]);
  }

  function handleEditWorkout(editedWorkout) {
    setWorkoutsList(
      workoutsList.map((workout) =>
        workout._id === editedWorkout._id
          ? { ...workout, ...editedWorkout }
          : workout
      )
    );
  }

  function handleDeleteWorkout(id) {
    setWorkoutsList(workoutsList.filter((workout) => workout._id !== id));
  }

  function handleToggleFavourite(idToToggle) {
    setFavouriteWorkouts(
      favouriteWorkouts.map((favouriteWorkout) =>
        favouriteWorkout.id === idToToggle
          ? { ...favouriteWorkout, isFavourite: !favouriteWorkout.isFavourite }
          : favouriteWorkout
      )
    );
  }

  return (
    <>
      <GlobalStyle />
      <Layout showNavbar={showNavbar}>
        <SWRConfig value={{ fetcher }}>
          <Component
            {...pageProps}
            exercises={dataExercises}
            exerciseIsLoading={exerciseIsLoading}
            workouts={workoutsList}
            onAddWorkout={handleAddWorkout}
            onEditWorkout={handleEditWorkout}
            onDeleteWorkout={handleDeleteWorkout}
            muscleGroups={muscleGroups}
            favouriteWorkouts={favouriteWorkouts}
            onToggleFavourite={handleToggleFavourite}
          />
        </SWRConfig>
      </Layout>
    </>
  );
}
