import styled from "styled-components";
import Link from "next/link";
import WorkoutPreview from "../WorkoutPreview";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalDelete from "../ModalDelete";
import Image from "next/image";

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
      {workouts.map((workout, index) => (
        <WorkoutCard key={workout.id} $even={index % 2 === 0}>
          <IconsSection>
            <EditButton href={`workouts/${workout.id}/edit`}>
              <Icon
                alt="Edit"
                width={35}
                height={35}
                src={
                  index % 2 === 0 ? "/icons/edit.svg" : "/icons/edit-orange.svg"
                }
                $even={index % 2 === 0}
              />
            </EditButton>
            <DeleteButton
              type="button"
              onClick={() => handleDelete(workout.id)}
            >
              <Icon
                alt="Delete"
                width={35}
                height={35}
                src={
                  index % 2 === 0
                    ? "/icons/delete.svg"
                    : "/icons/delete-orange.svg"
                }
                $even={index % 2 === 0}
              />
            </DeleteButton>
          </IconsSection>
          <WorkoutPreview
            name={workout.name}
            workoutExercises={workout.exercises}
            exercises={exercises}
            workouts={workouts}
            even={index % 2 === 0}
          />
        </WorkoutCard>
      ))}
      {showModal && (
        <ModalDelete
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
}

const WorkoutCard = styled.li`
  background-color: ${(props) =>
    props.$even ? "var(--dark-orange)" : "var(--light-orange)"};
  margin-bottom: 3rem;
  border-radius: 1.5rem;
  padding: 1rem 2rem;
  width: 80vw;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  position: relative;

  &:last-of-type {
    margin-bottom: 5.5rem;
  }
`;

const Icon = styled(Image)`
  border: ${(props) =>
    props.$even ? "1px solid white" : "1px solid var(--dark-orange)"};
  border-radius: 50%;
  padding: 0.25rem;
`;

const IconsSection = styled.section`
  position: absolute;
  display: flex;
  width: fit-content;
  right: 1.5rem;
`;

const DeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  height: fit-content;
  height: 35px;
  width: 35px;
`;

const EditButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  height: fit-content;
  height: 35px;
  width: 35px;
`;
