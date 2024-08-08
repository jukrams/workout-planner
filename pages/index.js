import ExercisesList from "@/components/ExercisesList";

import FilterList from "@/components/FilterList";
import { useState } from "react";
import styled from "styled-components";

export default function HomePage({ exercises, muscleGroups }) {
  const [filterMode, setFilterMode] = useState(false);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [muscles, setMuscles] = useState(muscleGroups);

  function handleShowFilter() {
    setFilterMode(!filterMode);
  }

  function handleSelect(muscleGroup) {
    if (!selectedMuscleGroups.includes(muscleGroup)) {
      const newSelectedMuscleGroups = [...selectedMuscleGroups, muscleGroup];
      setSelectedMuscleGroups(newSelectedMuscleGroups);

      setFilteredExercises(
        filteredExercises.filter((filteredExercise) =>
          newSelectedMuscleGroups.every((selectedMuscleGroup) =>
            filteredExercise.muscleGroups.includes(selectedMuscleGroup)
          )
        )
      );

      setMuscles(muscles.filter((muscle) => muscle !== muscleGroup));
    }
  }

  function handleDeselect(muscleGroup) {
    const newSelectedMuscleGroups = selectedMuscleGroups.filter(
      (selectedMuscleGroup) => selectedMuscleGroup !== muscleGroup
    );
    setSelectedMuscleGroups(newSelectedMuscleGroups);

    setFilteredExercises(
      exercises.filter((exercise) =>
        newSelectedMuscleGroups.every((selectedMuscleGroup) =>
          exercise.muscleGroups.includes(selectedMuscleGroup)
        )
      )
    );
    const newMuscles = [...muscles, muscleGroup];
    newMuscles.sort((a, b) => a.localeCompare(b));
    setMuscles(newMuscles);
  }

  function handleClear() {
    setSelectedMuscleGroups([]);
    setFilteredExercises(exercises);
    setMuscles(muscleGroups);
  }

  return (

    <StyledSection>
      <H1 >WELCOME TO YOUR EXERCISE LIST</H1>
      <FilterButton type="button" onClick={handleShowFilter}>
        Filter ☰
      </FilterButton>
      {filterMode ? (
        <FilterList
          muscleGroups={muscles}
          onSelect={handleSelect}
          selectedMuscleGroups={selectedMuscleGroups}
          onDeselect={handleDeselect}
          onClear={handleClear}
        />
      ) : null}
      <ExercisesList exercises={filteredExercises} />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const FilterButton = styled.button`
  border: none;
  background-color: orange;
  border-radius: 0.25rem;
  font-weight: bold;
  padding: 0.25rem;
  align-self: flex-end;
  margin-right: 3.5rem;
  cursor: pointer;
`;

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
  ´;
