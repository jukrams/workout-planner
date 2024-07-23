import { useRouter } from "next/router";
export default function DetailsPage({ exercises }) {
  const router = useRouter();
  const { id } = router.query;
  const exercise = exercises.find((exercise) => exercise.id === id);
  return <h1></h1>;
}
