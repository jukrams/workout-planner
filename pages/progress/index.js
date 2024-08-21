import Calendar from "@/components/Calendar";
import HeadlineSection from "@/components/HeadlineSection";
import styled from "styled-components";

export default function ProgressPage() {
  const weeklyProgress = 2;
  const weeklyGoal = 7;
  const totalWorkouts = 5;

  return (
    <>
      <HeadlineSection isProgressMode />
      <ProgressBox>
        <ProgressText>
          Weekly
          <br />
          Goal
        </ProgressText>
        <ProgressNumbers>
          {weeklyProgress}/{weeklyGoal}
        </ProgressNumbers>
      </ProgressBox>
      <ProgressBox>
        <ProgressText>
          Total
          <br />
          Workouts
        </ProgressText>
        <ProgressNumbers>{totalWorkouts}</ProgressNumbers>
      </ProgressBox>
      <Calendar />
    </>
  );
}

const ProgressBox = styled.section`
  background-color: var(--dark-orange);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85vw;
  max-width: 1000px;
  margin: 1rem auto 0 auto;
  border-radius: 1.5rem;
  color: white;
  padding: 0 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ProgressText = styled.p`
  line-height: 1;
  font-size: xx-large;
  margin: 1.5rem 0.5rem;
`;

const ProgressNumbers = styled.p`
  line-height: 1;
  font-size: 4rem;
  margin: 1.5rem 0.5rem;
`;
