import Link from "next/link";
import WorkoutForm from "../WorkoutForm";
import WorkoutPreview from "../WorkoutPreview";
import styled from "styled-components";
import ModalDelete from "../ModalDelete";
import { useState } from "react";

export default function WorkoutsList({
  onAddWorkout,
  onDeleteWorkout,
  workouts,
  exercises,
}) {
  const [modalDelete, setModalDelete] = useState(false);
  const [workoutIdToDelete, setWorkoutIdToDelete] = useState(0);
  const [isWorkoutDeleted, setIsWorkoutDeleted] = useState(false);

  const handleDelete = (event) => {
    const id = event.target.dataset.workoutid; // data-workoutid auslesen
    setWorkoutIdToDelete(id); // id speichern
    setModalDelete(true);
  };

  function handleDeleteCancel() {
    setModalDelete(false);
  }

  function handleDeleteConfirm() {
    onDeleteWorkout(workoutIdToDelete);
    setModalDelete(false);
    setIsWorkoutDeleted(true);
  }

  return (
    <>
      {workouts.length != 0 && isWorkoutDeleted && (
        <SuccessMessage>Workout deleted successfully!</SuccessMessage>
      )}

      {workouts.length == 0 && (
        <SuccessMessage>
          Oops! No Workouts yet.<br></br>
          Create a new Workout to start your journey!
        </SuccessMessage>
      )}

      <WorkoutCard>
        <WorkoutForm exercises={exercises} onAddWorkout={onAddWorkout} />
        {workouts.map((workout) => (
          <WorkoutItem key={workout.id}>
            <Actions>
              <DeleteButton data-workoutid={workout.id} onClick={handleDelete}>
                ✘ Delete 
              </DeleteButton>
              <EditLink href={`workouts/${workout.id}/edit`}>
                ✎ Edit 
              </EditLink>
            </Actions>

            <WorkoutPreview
              name={workout.name}
              workoutExercises={workout.exercises}
              exercises={exercises}
              workouts={workouts}
            />
          </WorkoutItem>
        ))}
      </WorkoutCard>
      {modalDelete && (
        <ModalDelete
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
}

const WorkoutCard = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WorkoutItem = styled.li`
  margin: 2rem;
  border: 3px solid black;
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  max-width: 1000px;
  width: 80vw;
  display: flex;
  flex-direction: column;

  &:last-of-type {
    margin-bottom: 5.5rem;
  }
`;

const Actions = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
`;

const DeleteButton = styled.button`
  color: orange;
  font-weight: bold;
  font-size: large;
  border: none;
  background-color: white;
  cursor: pointer;
  type: button;
  margin-right: 20px;
`;

const EditLink = styled(Link)`
  text-decoration: none;
  color: orange;
  font-weight: bold;
  font-size: large;
`;

const SuccessMessage = styled.p`
  border-radius: 15px;
  padding: 15px;
  margin: auto;
  background-color: #bebebe;
  text-align: center;
  line-height: 2rem;
   max-width: 1000px;
  width: 80vw;
`;
