import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import { exercises } from "@/lib/exercises.js";
import { workouts } from "@/lib/workouts";
import useLocalStorageState from "use-local-storage-state";
import { uid } from "uid";
import { muscleGroups } from "@/lib/muscle-groups";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
  const [workoutsList, setWorkoutsList] = useLocalStorageState("workoutsList", {
    defaultValue: workouts,
  });

  const [favouriteWorkouts, setFavouriteWorkouts] = useLocalStorageState(
    "favouriteWorkouts",
    {
      defaultValue: workoutsList.map((workout) => ({
        id: workout.id,
        isFavourite: false,
      })),
    }
  );

  useEffect(() => {
    setFavouriteWorkouts(() => {
      const currentWorkoutIds = workoutsList.map((workout) => workout.id);

      return currentWorkoutIds.map((id) => {
        const existing = favouriteWorkouts.find(
          (favouriteWorkout) => favouriteWorkout.id === id
        );
        return existing ? existing : { id, isFavourite: false };
      });
    });
  }, [workoutsList, setFavouriteWorkouts, favouriteWorkouts]);

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
        workout.id === editedWorkout.id
          ? { ...workout, ...editedWorkout }
          : workout
      )
    );
  }

  function handleDeleteWorkout(id) {
    setWorkoutsList(workoutsList.filter((workout) => workout.id !== id));
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
    <SessionProvider session={pageProps.session}>
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const response = await fetch(...args);
            if (!response.ok) {
              throw new Error(`Request with ${JSON.stringify(args)} failed.`);
            }
            return await response.json();
          },
        }}
      >
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
            onToggleFavourite={handleToggleFavourite}
          />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}
