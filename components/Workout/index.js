import styled from "styled-components";
import Link from "next/link";
import WorkoutPreview from "../WorkoutPreview";
import { useState } from "react";
import { toast } from "react-toastify";
import ModalDelete from "../ModalDelete";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Workout({
  workouts,
  onDeleteWorkout,
  exercises,
  favouriteWorkouts,
  onToggleFavourite,
}) {
  const [showModal, setShowModal] = useState(false);
  const [workoutIdToDelete, setWorkoutIdToDelete] = useState(null);

  const { data: session } = useSession();

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
        <WorkoutCard key={workout._id} $even={index % 2 === 0}>
          {session && (
            <IconsSection>
              <FavouriteButton
                type="button"
                onClick={() => onToggleFavourite(workout._id)}
              >
                <Icon
                  alt="Favourite"
                  width={35}
                  height={35}
                  src={
                    index % 2 === 0
                      ? favouriteWorkouts.find(
                          (favouriteWorkout) =>
                            favouriteWorkout._id === workout._id &&
                            favouriteWorkout.isFavourite
                        )
                        ? "/icons/star-filled-white.svg"
                        : "/icons/star-white.svg"
                      : favouriteWorkouts.find(
                          (favouriteWorkout) =>
                            favouriteWorkout._id === workout._id &&
                            favouriteWorkout.isFavourite
                        )
                      ? "/icons/star-filled-orange.svg"
                      : "/icons/star-orange.svg"
                  }
                  $even={index % 2 === 0}
                  $favouriteIcon
                />
              </FavouriteButton>
              <EditButton href={`workouts/${workout._id}/edit`}>
                <Icon
                  alt="Edit"
                  width={35}
                  height={35}
                  src={
                    index % 2 === 0
                      ? "/icons/edit.svg"
                      : "/icons/edit-orange.svg"
                  }
                  $even={index % 2 === 0}
                />
              </EditButton>
              <DeleteButton
                type="button"
                onClick={() => handleDelete(workout._id)}
              >
                <Icon
                  alt="Delete"
                  width={36}
                  height={36}
                  src={
                    index % 2 === 0
                      ? "/icons/delete.svg"
                      : "/icons/delete-orange.svg"
                  }
                  $even={index % 2 === 0}
                />
              </DeleteButton>
            </IconsSection>
          )}
          <WorkoutPreview
            name={workout.name}
            workoutExercises={workout.exercises}
            exercises={exercises}
            workouts={workouts}
            even={index % 2 === 0}
            _id={workout._id}
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

export const Icon = styled(Image)`
  border: ${(props) =>
    props.$even ? "1px solid white" : "1px solid var(--dark-orange)"};
  border-radius: 50%;
  padding: ${(props) => (props.$favouriteIcon ? "0" : "0.25rem")};
`;

const IconsSection = styled.section`
  position: absolute;
  display: flex;
  align-items: center;
  width: fit-content;
  right: 1.5rem;
`;

const DeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  height: fit-content;
  margin-bottom: 0.2rem;
`;

const EditButton = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  height: fit-content;
`;

export const FavouriteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  height: fit-content;
`;
