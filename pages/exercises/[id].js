import Link from "next/link";
import styled from "styled-components";
import ExerciseDetails from "@/components/ExerciseDetails";
import { useRouter } from "next/router";

export default function DetailsPage({ exercises }) {
  const router = useRouter();
  const { id } = router.query;
  if (!id) { return <p>Loading...</p>; }
  const exercise = exercises.find((exercise) => exercise.id === id);
  return (
    <>
      <ExerciseDetailsHeading>
        <StyledBackLink href={"/"}>←</StyledBackLink>
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
