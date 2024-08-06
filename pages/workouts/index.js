import WorkoutsList from "@/components/WorkoutsList";
import Link from "next/link";

export default function WorkoutsPage({
  workouts,
  exercises,
  onEditWorkout,
  onDeleteWorkout,
}) {
  return (
    <>
      <h1>Workouts</h1>
      <button>
        <Link href={"/workouts/create"}>➕ Create Workout</Link>
      </button>
      <WorkoutsList
        workouts={workouts}
        exercises={exercises}
        onEditWorkout={onEditWorkout}
        onDeleteWorkout={onDeleteWorkout}
      />
    </>
  );
}
