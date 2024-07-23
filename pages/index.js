import ExercisesList from "@/components/ExercisesList";

export default function HomePage({ exercises }) {
  return (
    <>
      <h1>Exercises</h1>
      <ExercisesList exercises={exercises} />
    </>
  );
}
