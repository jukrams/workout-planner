import styled from "styled-components";
import Link from "next/link";
import WorkoutPreview from "../WorkoutPreview";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalDelete from "../ModalDelete";

export default function Workout({ workouts, onDeleteWorkout, exercises }) {
  const [showModal, setShowModal] = useState(false);
  const [workoutIdToDelete, setWorkoutIdToDelete] = useState(null);

  const handleDelete = (id) => {
    setWorkoutIdToDelete(id);
    setShowModal(true);
  };

  function handleDeleteCancel() {
    setShowModal(false);
    setWorkoutIdToDelete(null);
  }

  function successMessage() {
    toast.success("Workout deleted successfully!");
  }

  function handleDeleteConfirm() {
    onDeleteWorkout(workoutIdToDelete);
    setShowModal(false);
    setWorkoutIdToDelete(null);
    successMessage();
  }
  return (
    <>
      {showModal && (
        <ModalDelete
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id}>
          <Actions>
            <DeleteButton
              type="button"
              onClick={() => handleDelete(workout.id)}
            >
              ✘ Delete
            </DeleteButton>
            <EditLink href={`workouts/${workout.id}/edit`}>✎ Edit</EditLink>
          </Actions>
          <WorkoutPreview
            name={workout.name}
            workoutExercises={workout.exercises}
            exercises={exercises}
            workouts={workouts}
          />
        </WorkoutItem>
      ))}
    </>
  );
}

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
  margin-right: 20px;
`;

const EditLink = styled(Link)`
  text-decoration: none;
  color: orange;
  font-weight: bold;
  font-size: large;
`;
