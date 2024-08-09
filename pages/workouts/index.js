import WorkoutsList from "@/components/WorkoutsList";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import useLocalStorageState from "use-local-storage-state";
import { FavouriteButton } from "@/components/Workout";
import { useState } from "react";

export default function WorkoutsPage({
  workouts,
  exercises,
  onEditWorkout,
  onDeleteWorkout,
}) {
  const [favouriteWorkouts, setFavouriteWorkouts] = useLocalStorageState(
    "favouriteWorkouts",
    { defaultValue: [] }
  );

  const [favouritesMode, setFavouritesMode] = useState(false);

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
      const workoutToToggle = workouts.find(
        (workout) => workout.id === idToToggle
      );
      setFavouriteWorkouts([workoutToToggle, ...favouriteWorkouts]);
    }
  }

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
            onClick={() => setFavouritesMode(true)}
          >
            <FavouriteIcon
              alt="Favourite"
              width={35}
              height={35}
              src={"/icons/star-filled-white.svg"}
            />
          </FavouriteButton>
        </ButtonsSection>
      </HeadlineSection>
      <WorkoutsList
        workouts={workouts}
        exercises={exercises}
        onEditWorkout={onEditWorkout}
        onDeleteWorkout={onDeleteWorkout}
        favouriteWorkouts={favouriteWorkouts}
        onToggleFavourite={handleToggleFavourite}
        favouritesMode={favouritesMode}
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
