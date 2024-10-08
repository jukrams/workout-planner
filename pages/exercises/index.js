import ExercisesList from "@/components/ExercisesList";
import FilterList from "@/components/FilterList";
import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import SearchBar from "@/components/SearchBar";
import MenuButton from "@/components/MenuButton";

export default function HomePage({ muscleGroups }) {
  const { data: session } = useSession();
  const { data: exercises = [], isLoading: exerciseIsLoading } =
    useSWR("/api/exercises");

  const [filterMode, setFilterMode] = useState(false);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([exercises]);
  const [muscles, setMuscles] = useState(muscleGroups);
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (!exerciseIsLoading && exercises.length > 0) {
      setFilteredExercises(exercises);
    }
  }, [exercises, exerciseIsLoading]);

  if (exerciseIsLoading) {
    return <p>Loading...</p>;
  }

  function handleShowFilter() {
    if (!filterApplied) {
      setFilterApplied(true);
    }
    setFilterMode(!filterMode);
  }

  function handleSelect(muscleGroup) {
    if (!selectedMuscleGroups.includes(muscleGroup)) {
      const newSelectedMuscleGroups = [...selectedMuscleGroups, muscleGroup];
      setSelectedMuscleGroups(newSelectedMuscleGroups);

      setFilteredExercises(
        exercises.filter((exercise) =>
          newSelectedMuscleGroups.every((selectedMuscleGroup) =>
            exercise.muscleGroups.includes(selectedMuscleGroup)
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

  function handleSearch(input) {
    if (!filterApplied) {
      setFilterApplied(true);
    }
    setSearchInput(input);
    const lowercasedInput = input.toLowerCase();
    const filtered = exercises.filter((exercise) =>
      exercise.name.toLowerCase().startsWith(lowercasedInput)
    );
    setFilteredExercises(filtered);
  }

  return (
    <StyledSection>
      <HeadlineSection>
        {session ? (
          <H1>
            WELCOME TO YOUR <br />
            EXERCISE LIST, <Username>{session.user.name}</Username>!
          </H1>
        ) : (
          <H1>
            {" "}
            WELCOME TO YOUR <br />
            EXERCISE LIST
          </H1>
        )}
        <MenuButton isExercisesPage />
      </HeadlineSection>
      <ControlsContainer>
        <SearchBar searchInput={searchInput} onSearch={handleSearch} />
        <FilterButton type="button" onClick={handleShowFilter}>
          Filter ☰
        </FilterButton>
      </ControlsContainer>
      {filterMode ? (
        <FilterList
          muscleGroups={muscles}
          onSelect={handleSelect}
          selectedMuscleGroups={selectedMuscleGroups}
          onDeselect={handleDeselect}
          onClear={handleClear}
        />
      ) : null}
      <ExercisesList
        exercises={filterApplied ? filteredExercises : exercises}
        exerciseIsLoading={exerciseIsLoading}
      />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;
  width: 85vw;
  max-width: 1000px;
`;

const FilterButton = styled.button`
  font-size: x-large;
  border: none;
  background-color: white;
  color: var(--dark-brown);
  border-radius: 0.25rem;
  padding: 0.5rem 0;
  cursor: pointer;
`;

const H1 = styled.h1`
  color: var(--dark-brown);
  font-size: xx-large;
  font-weight: normal;
  line-height: 1;
  margin-top: 0;
  max-width: 65%;
`;

const Username = styled.span`
  color: var(--dark-orange);
`;

const HeadlineSection = styled.section`
  width: 85vw;
  max-width: 1000px;
  margin: 2rem auto auto auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
