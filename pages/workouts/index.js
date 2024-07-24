import WorkoutsList from "@/components/WorkoutsList";
import { exercises } from "@/lib/exercises";

export default function WorkoutsPage({ workouts }) {
  return (
    <>
      <h1>Workouts</h1>
      <WorkoutsList workouts={workouts} exercises={exercises} />
    </>
  );
}
