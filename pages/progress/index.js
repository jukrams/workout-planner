import Calendar from "@/components/Calendar";
import HeadlineSection from "@/components/HeadlineSection";
import styled from "styled-components";
import useSWR from "swr";

export default function ProgressPage() {
  const { data: progress, isLoading } = useSWR("/api/progress");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(progress);

  const weeklyWorkouts = 7;
  const weeklyProgress = progress[0].completedWorkoutsThisWeek;

  const totalWorkouts =
    progress && Array.isArray(progress[0].completedWorkouts)
      ? progress[0].completedWorkouts.length
      : 0;

  return (
    <>
      <HeadlineSection isProgressMode />
      <ProgressBox>
        <ProgressText>
          Weekly
          <br />
          Workouts
        </ProgressText>
        <ProgressNumbers>
          {weeklyProgress}/{weeklyWorkouts}
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
