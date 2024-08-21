import Link from "next/link";
import styled from "styled-components";
import ExerciseDetails from "@/components/ExerciseDetails";
import { useRouter } from "next/router";
import BackIcon from "public/icons/back-arrow-white.svg";

export default function DetailsPage({ exercises }) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>Loading...</p>;
  }

  const exercise = exercises.find((exercise) => exercise.id === id);

  return (
    <>
      <StyledBackLink href="/exercises">
        <BackIcon /> {}
      </StyledBackLink>
      <ExerciseDetails exercise={exercise} />
    </>
  );
}

const StyledBackLink = styled(Link)`
  text-decoration: none;
  background-color: var(--orange);
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  left: 20px;
`;
