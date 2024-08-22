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
        <FilterHeading>
          Select one or more <br /> muscle-groups
        </FilterHeading>
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
                {selectedMuscleGroup} ✘
              </SelectedMuscleTags>
            ))}
            <ClearButton type="button" onClick={onClear}>
              Clear all
            </ClearButton>
          </>
        )}
      </SelectedMuscleList>
    </>
  );
}

const FilterHeading = styled.p`
  font-size: x-large;
  width: 100%;
  line-height: 1;
  color: var(--dark-orange);
  padding-left: 0.5rem;
  margin: 0.5rem 0 1rem 0;
`;

const MuscleTagList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  background-color: var(--light-orange);
  margin: 1rem auto 0 auto;
  border-radius: 1rem;
  padding: 1rem;
  max-width: 1000px;
  width: 85vw;
`;

const MuscleTags = styled.li`
  border: 1.5px solid var(--dark-brown);
  color: var(--dark-brown);
  background-color: none;
  border-radius: 25px;
  padding: 0 0.5rem;
  margin: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: var(--gray-brown);
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border: 1.5px solid var(--gray-brown);
  }
`;

const ClearButton = styled.button`
  border: 1.5px solid var(--gray-brown);
  color: var(--dark-brown);
  background-color: white;
  border-radius: 25px;
  padding: 0 0.5rem;
  margin: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: var(--dark-orange);
    border: 1.5px solid var(--dark-orange);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const SelectedMuscleList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem auto 0 auto;
  max-width: 1000px;
  width: 85vw;
`;

const SelectedMuscleTags = styled.li`
  border: 1.5px solid var(--gray-brown);
  color: white;
  background-color: var(--gray-brown);
  border-radius: 25px;
  padding: 0 0.5rem;
  margin: 0.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--dark-brown);
    border: 1.5px solid var(--dark-brown);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;
