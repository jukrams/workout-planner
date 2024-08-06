import WorkoutsList from "@/components/WorkoutsList";

export default function WorkoutsPage({
  workouts,
  exercises,
  onAddWorkout,
  onEditWorkout,
  onDeleteWorkout

}) {
  return (
    <>
      <h1>Workouts</h1>
      <WorkoutsList
        workouts={workouts}
        exercises={exercises}
        onAddWorkout={onAddWorkout}
        onEditWorkout={onEditWorkout}
        onDeleteWorkout={onDeleteWorkout}
      />
    </>
  );
}
