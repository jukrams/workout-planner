import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function HeadlineSection({ isEditMode, isProgressMode }) {
  return (
    <StyledSection>
      <BackLink
        href={"/workouts"}
        $edit={isEditMode}
        $progress={isProgressMode}
      >
        <Image
          src={
            isEditMode || isProgressMode
              ? "/icons/back-arrow-white.svg"
              : "/icons/back-arrow-orange.svg"
          }
          width={40}
          height={40}
          alt="Back"
        />
      </BackLink>
      {isEditMode ? (
        <Headline $edit={isEditMode}>
          Edit
          <br />
          your
          <br />
          workout
        </Headline>
      ) : isProgressMode ? (
        <Headline $progress={isProgressMode}>
          Check
          <br />
          your
          <br />
          progress
        </Headline>
      ) : (
        <Headline>
          Create
          <br />
          your
          <br />
          workout
        </Headline>
      )}
    </StyledSection>
  );
}

const StyledSection = styled.section`
  width: 85vw;
  max-width: 1000px;
  margin: 1.5rem auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Headline = styled.h1`
  color: ${(props) =>
    props.$edit ? "var(--dark-orange)" : "var(--dark-brown)"};
  font-size: xxx-large;
  font-weight: normal;
  line-height: 0.8;
  text-align: end;
  margin: 0;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  background-color: ${(props) =>
    props.$edit
      ? "var(--dark-orange)"
      : props.$progress
      ? "var(--orange)"
      : "#fef3d8"};
  height: 45px;
  width: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;
