import WorkoutForm from "@/components/WorkoutForm";
import Link from "next/link";
import styled from "styled-components";

export default function CreateWorkout({ exercises, onAddWorkout }) {
  return (
    <>
      <BackLink href={"/workouts"}>←</BackLink>
      <h1>Create your workout</h1>
      <WorkoutForm exercises={exercises} onAddWorkout={onAddWorkout} />
    </>
  );
}

const BackLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 3rem;
`;
