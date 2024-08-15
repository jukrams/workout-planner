import WorkoutsList from "@/components/WorkoutsList";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import { FavouriteButton } from "@/components/Workout";
import { useState } from "react";
import Login from "@/components/Login";

export default function WorkoutsPage({
  workouts,
  exercises,
  onEditWorkout,
  onDeleteWorkout,
  favouriteWorkouts,
  onToggleFavourite,
}) {
  const [isFavouritesMode, setisFavouritesMode] = useState(false);

  const filteredWorkouts = workouts.filter((workout) =>
    favouriteWorkouts.find(
      (favouriteWorkout) =>
        favouriteWorkout.id === workout.id && favouriteWorkout.isFavourite
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
        <Login />
      </HeadlineSection>
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
      <WorkoutsList
        workouts={isFavouritesMode ? filteredWorkouts : workouts}
        exercises={exercises}
        onEditWorkout={onEditWorkout}
        onDeleteWorkout={onDeleteWorkout}
        favouriteWorkouts={favouriteWorkouts}
        onToggleFavourite={onToggleFavourite}
        isFavouritesMode={isFavouritesMode}
      />
    </>
  );
}

const HeadlineSection = styled.section`
  width: 85vw;
  max-width: 1000px;
  margin: 2rem auto auto auto;
  width: 85vw;
  max-width: 1000px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Headline = styled.h1`
  color: var(--dark-brown);
  font-size: xx-large;
  font-weight: normal;
  line-height: 1;
  margin-top: 0;
`;

const ButtonsSection = styled.section`
  display: flex;
  align-items: center;
  margin: auto auto 2rem auto;
  width: 85vw;
  max-width: 1000px;
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
