import ExercisesList from "@/components/ExercisesList";
import styled from "styled-components";

export default function HomePage({ exercises }) {
  return (
    <>
      <H1 >WELCOME TO YOUR EXERCISE LIST</H1>
      <ExercisesList exercises={exercises} />
    </>
  );
}

const H1 = styled.h1`
  font-family: 'Verdana', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  width: 80vw;
  color: #4D4020;
  text-align: left;
  margin: 0.5rem 0;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  align-items: center;
`;
