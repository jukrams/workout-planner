import Link from "next/link";
import styled from "styled-components";
import ExerciseDetails from "@/components/ExerciseDetails";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DetailsPage() {
  const { data: exercises } = useSWR("/api/exercises");
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <p>Loading...</p>;
  }
  const exercise = exercises.find((exercise) => exercise._id === id);
  return (
    <>
      <ExerciseDetailsHeading>
        <StyledBackLink href={"/exercises"}>←</StyledBackLink>
        <h1>{exercise.name}</h1>
      </ExerciseDetailsHeading>
      <ExerciseDetailsContainer>
        <ExerciseDetails exercise={exercise} />
      </ExerciseDetailsContainer>
    </>
  );
}
const StyledBackLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 3rem;
`;
const ExerciseDetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ExerciseDetailsHeading = styled.section`
  display: flex;
  justify-content: space-between;
  margin: 0 4.5rem;
`;
