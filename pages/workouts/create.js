import WorkoutForm from "@/components/WorkoutForm";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

export default function CreateWorkout({ exercises, onAddWorkout }) {
  return (
    <Background>
      <HeadlineSection>
        <BackLink href={"/workouts"}>
          <Image
            src="/icons/back-arrow-orange.svg"
            width={40}
            height={40}
            alt="Back"
          />
        </BackLink>
        <Headline>
          Create
          <br />
          your
          <br />
          workout
        </Headline>
      </HeadlineSection>
      <WorkoutForm exercises={exercises} onAddWorkout={onAddWorkout} />
    </Background>
  );
}

const Background = styled.section`
  background-color: var(--orange);
  min-height: 100vh;
  min-width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;

const HeadlineSection = styled.section`
  width: 85vw;
  max-width: 1000px;
  margin: 1.5rem auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Headline = styled.h1`
  color: var(--dark-brown);
  font-size: xxx-large;
  font-weight: normal;
  line-height: 0.8;
  text-align: end;
  margin: 0;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  background-color: #fef3d8;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
