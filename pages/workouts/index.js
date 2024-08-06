import WorkoutsList from "@/components/WorkoutsList";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

export default function WorkoutsPage({
  workouts,
  exercises,
  onEditWorkout,
  onDeleteWorkout,
}) {
  return (
    <>
      <Headline>
        Here is a list
        <br />
        of your
        <br />
        workouts
      </Headline>

      <CreateLink href={"/workouts/create"}>
        <Image alt="Edit" width={30} height={30} src="/icons/plus.svg" />
        Create Workout
      </CreateLink>

      <WorkoutsList
        workouts={workouts}
        exercises={exercises}
        onEditWorkout={onEditWorkout}
        onDeleteWorkout={onDeleteWorkout}
      />
    </>
  );
}

const Headline = styled.h1`
  color: var(--dark-brown);
  font-size: xx-large;
  font-weight: normal;
  line-height: 1;
  margin-left: 2rem;
`;

const CreateLink = styled(Link)`
  background-color: var(--dark-brown);
  border-radius: 2rem;
  margin: 0 2rem 2rem;
  padding: 0 1rem;
  text-decoration: none;
  color: white;
  font-size: larger;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
`;
