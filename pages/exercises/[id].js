import Link from "next/link";
import styled from "styled-components";
import ExerciseDetails from "@/components/ExerciseDetails";
import { useRouter } from "next/router";

export default function DetailsPage({ exercises }) {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <p>Loading...</p>;
  }
  const exercise = exercises.find((exercise) => exercise.id === id);
  return (
    <>
      <HeaderContainer>
        <StyledBackLink href={"/"}>
          <img src="/icons/back-arrow-white.svg" alt="Back" />
        </StyledBackLink>
      </HeaderContainer>
      <ExerciseDetailsContainer>
        <ExerciseDetails exercise={exercise} />
      </ExerciseDetailsContainer>
    </>
  );
}

const StyledBackLink = styled(Link)`
  text-decoration: none;
  background-color: #FAC74E;
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 1000;
`;

const ExerciseDetailsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 1;
`;
