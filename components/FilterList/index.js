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
      <MuscleTagList>
        {muscleGroups.map((muscleGroup) => (
          <MuscleTags key={muscleGroup} onClick={() => onSelect(muscleGroup)}>
            {muscleGroup}
          </MuscleTags>
        ))}
      </MuscleTagList>
      <SelectedMuscleList>
        {selectedMuscleGroups.length !== 0 && (
          <>
            {selectedMuscleGroups.map((selectedMuscleGroup) => (
              <SelectedMuscleTags
                key={selectedMuscleGroup}
                onClick={() => onDeselect(selectedMuscleGroup)}
              >
                {selectedMuscleGroup} X
              </SelectedMuscleTags>
            ))}
            <ClearButton type="button" onClick={onClear}>
              Clear
            </ClearButton>
          </>
        )}
      </SelectedMuscleList>
    </>
  );
}

const MuscleTagList = styled.ul`
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
  cursor: pointer;
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
