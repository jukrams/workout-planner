import ExercisePreview from "../ExercisePreview";

export default function ExercisesList({ exercises }) {
  return (
    <>
      <ul>
        {exercises.map((exercise) => (
          <ExercisePreview key={exercise.id} exercise={exercise} />
        ))}
      </ul>
    </>
  );
}
