import useLocalStorageState from "use-local-storage-state";
import WorkoutsList from "@/components/WorkoutsList";
import { exercises } from "@/lib/exercises";

export default function WorkoutsPage({ workouts }) {
  const [workoutsList, setWorkoutsList] = useLocalStorageState("workoutsList", {
    defaultValue: workouts,
  });
  function handleAddWorkout() {
    event.preventDefault();
  }
  return (
    <>
      <h1>Workouts</h1>
      <WorkoutsList
        workouts={workoutsList}
        exercises={exercises}
        onAddWorkout={handleAddWorkout}
      />
    </>
  );
}
