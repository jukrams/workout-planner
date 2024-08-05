import { useState } from "react";
import styled from "styled-components";

export default function FilterList({
  muscleGroups,
  onSelect,
  selectedMuscleGroups,
  onDeselect,
  onClear,
}) {
  return (
    <>
      <MuscleList>
        {muscleGroups.map((muscleGroup) => (
          <MuscleTags key={muscleGroup} onClick={() => onSelect(muscleGroup)}>
            {muscleGroup}
          </MuscleTags>
        ))}
      </MuscleList>
      <SelectedMuscleList>
        {selectedMuscleGroups.length !== 0
          ? selectedMuscleGroups.map((selectedMuscleGroup) => (
              <SelectedMuscleTags
                key={selectedMuscleGroup}
                onClick={() => onDeselect(selectedMuscleGroup)}
              >
                {selectedMuscleGroup} X
              </SelectedMuscleTags>
            ))
          : null}

        {selectedMuscleGroups.length !== 0 ? (
          <ClearButton type="button" onClick={onClear}>
            Clear
          </ClearButton>
        ) : null}
      </SelectedMuscleList>
    </>
  );
}

const MuscleList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  background-color: lightgray;
  margin: 1rem 2rem 0 2rem;
  border-radius: 1rem;
  padding: 1rem;
`;

const MuscleTags = styled.li`
  border: 1px solid red;
  background-color: orange;
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin: 0.25rem;
`;

const ClearButton = styled.button`
  border: 1px solid blue;
  background-color: lightblue;
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin: 0.25rem;
`;

const SelectedMuscleList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0 2rem;
  border-radius: 1rem;
  padding: 1rem;
`;

const SelectedMuscleTags = styled.li`
  border: 1px solid red;
  background-color: orange;
  border-radius: 0.5rem;
  padding: 0.25rem;
  margin: 0.25rem;
`;
