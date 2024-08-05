import WorkoutForm from "../WorkoutForm";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Workout from "../Workout";

export default function WorkoutsList({
  onAddWorkout,
  onDeleteWorkout,
  workouts,
  exercises,
}) {
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
        <Workout
          onDeleteWorkout={onDeleteWorkout}
          workouts={workouts}
          exercises={exercises}
        />
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
