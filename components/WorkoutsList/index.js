import Link from "next/link";
import WorkoutForm from "../WorkoutForm";
import WorkoutPreview from "../WorkoutPreview";
import styled from "styled-components";
import ModalDelete from "../ModalDelete";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WorkoutsList({
  onAddWorkout,
  onDeleteWorkout,
  workouts,
  exercises,
}) {
  const [showModal, setShowModal] = useState(false);
  const [workoutIdToDelete, setWorkoutIdToDelete] = useState(0);

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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <WorkoutCard>
        <WorkoutForm exercises={exercises} onAddWorkout={onAddWorkout} />
        {workouts.length == 0 && (
          <AlertMessage>
            Oops! No Workouts yet.<br></br>
            Create a new Workout to start your journey!
          </AlertMessage>
        )}
        {workouts.map((workout) => (
          <WorkoutItem key={workout.id}>
            <Actions>
              <DeleteButton onClick={() => handleDelete(workout.id)}>
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
            {showModal && (
              <ModalDelete
                id={workoutIdToDelete}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
              />
            )}
          </WorkoutItem>
        ))}
      </WorkoutCard>
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

const AlertMessage = styled.p`
  border-radius: 15px;
  padding: 15px;
  margin: auto;
  background-color: #bebebe;
  text-align: center;
  line-height: 2rem;
  max-width: 1000px;
  width: 80vw;
`;
