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

  const [favouriteWorkouts, setFavouriteWorkouts] = useLocalStorageState(
    "favouriteWorkouts",
    { defaultValue: [] }
  );

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

    const isFavourite = favouriteWorkouts.some(
      (favouriteWorkout) => favouriteWorkout.id === editedWorkout.id
    );

    if (isFavourite) {
      setFavouriteWorkouts(
        favouriteWorkouts.map((favouriteWorkout) =>
          favouriteWorkout.id === editedWorkout.id
            ? { ...favouriteWorkouts, ...editedWorkout }
            : favouriteWorkouts
        )
      );
    }
  }

  function handleDeleteWorkout(id) {
    setWorkoutsList(workoutsList.filter((workout) => workout.id !== id));

    const isFavourite = favouriteWorkouts.some(
      (favouriteWorkout) => favouriteWorkout.id === id
    );

    if (isFavourite) {
      setFavouriteWorkouts(
        favouriteWorkouts.filter(
          (favouriteWorkout) => favouriteWorkout.id !== id
        )
      );
    }
  }

  function handleToggleFavourite(idToToggle) {
    const isFavourite = favouriteWorkouts.some(
      (favouriteWorkout) => favouriteWorkout.id === idToToggle
    );

    if (isFavourite) {
      setFavouriteWorkouts(
        favouriteWorkouts.filter(
          (favouriteWorkout) => favouriteWorkout.id !== idToToggle
        )
      );
    } else {
      const workoutToToggle = workoutsList.find(
        (workoutsListItem) => workoutsListItem.id === idToToggle
      );
      setFavouriteWorkouts([workoutToToggle, ...favouriteWorkouts]);
    }
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
          favouriteWorkouts={favouriteWorkouts}
          // setFavouriteWorkouts={setFavouriteWorkouts}
          onToggleFavourite={handleToggleFavourite}
        />
      </Layout>
    </>
  );
}
