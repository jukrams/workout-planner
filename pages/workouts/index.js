import WorkoutsList from "@/components/WorkoutsList";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { FavouriteButton } from "@/components/Workout";
import { useState, useEffect } from "react";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";

export default function WorkoutsPage({
  // workouts,
  exercises,
  // onEditWorkout,
  // onDeleteWorkout,
  // favouriteWorkouts,
  // onToggleFavourite,
}) {
  const {
    data: dataWorkouts = [],
    isLoading,
    error: errorWorkouts,
  } = useSWR("/api/workouts");

  // if (isLoading || errorWorkouts) return <p>Loading...</p>;

  // if (!dataWorkouts) {
  //   return <div>Loading...</div>;
  // }

  const [workoutsList, setWorkoutsList] = useState(dataWorkouts);

  const [favouriteWorkouts, setFavouriteWorkouts] = useLocalStorageState(
    "favouriteWorkouts",
    {
      defaultValue: dataWorkouts.map((workout) => ({
        _id: workout._id,
        isFavourite: false,
      })),
    }
  );

  const [isFavouritesMode, setisFavouritesMode] = useState(false);

  useEffect(() => {
    if (dataWorkouts.length > 0) {
      setWorkoutsList(dataWorkouts);
    }
  }, [dataWorkouts]);

  function handleAddWorkout(newWorkout) {
    setWorkoutsList([{ _id: uid(), ...newWorkout }, ...workoutsList]);
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
        favouriteWorkout._id === idToToggle
          ? { ...favouriteWorkout, isFavourite: !favouriteWorkout.isFavourite }
          : favouriteWorkout
      )
    );
  }

  const filteredWorkouts = workoutsList.filter((workout) =>
    favouriteWorkouts.find(
      (favouriteWorkout) =>
        favouriteWorkout._id === workout._id && favouriteWorkout.isFavourite
    )
  );

  return (
    <>
      <HeadlineSection>
        <Headline>
          Here is a list
          <br />
          of your
          <br />
          workouts
        </Headline>
        <ButtonsSection>
          <CreateLink href={"/workouts/create"}>
            <Image alt="Edit" width={30} height={30} src="/icons/plus.svg" />
            Create Workout
          </CreateLink>
          <FavouriteButton
            type="button"
            onClick={() => setisFavouritesMode(!isFavouritesMode)}
          >
            <FavouriteIcon
              alt="Favourite"
              width={35}
              height={35}
              src={
                isFavouritesMode
                  ? "/icons/star-filled-white.svg"
                  : "/icons/star-white.svg"
              }
            />
          </FavouriteButton>
        </ButtonsSection>
      </HeadlineSection>
      <WorkoutsList
        // workouts={isFavouritesMode ? filteredWorkouts : workouts}
        workouts={isFavouritesMode ? filteredWorkouts : workoutsList}
        exercises={exercises}
        // onEditWorkout={onEditWorkout}
        // onDeleteWorkout={onDeleteWorkout}
        // favouriteWorkouts={favouriteWorkouts}
        // onToggleFavourite={onToggleFavourite}
        isFavouritesMode={isFavouritesMode}
        //
        // workouts={workoutsList}
        onAddWorkout={handleAddWorkout}
        onEditWorkout={handleEditWorkout}
        onDeleteWorkout={handleDeleteWorkout}
        favouriteWorkouts={favouriteWorkouts}
        onToggleFavourite={handleToggleFavourite}
      />
    </>
  );
}

const HeadlineSection = styled.section`
  width: 85vw;
  max-width: 1000px;
  margin: auto;
`;

const Headline = styled.h1`
  color: var(--dark-brown);
  font-size: xx-large;
  font-weight: normal;
  line-height: 1;
`;

const ButtonsSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const CreateLink = styled(Link)`
  background-color: var(--dark-brown);
  border-radius: 2rem;
  padding: 0 1rem;
  text-decoration: none;
  color: white;
  font-size: larger;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: fit-content;
`;

const FavouriteIcon = styled(Image)`
  border: 1px solid var(--dark-orange);
  background-color: var(--dark-orange);
  border-radius: 50%;
  margin-left: 0.75rem;
  display: block;
`;
