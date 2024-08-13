import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Login({ homepage }) {
  const { data: session } = useSession();
  const router = useRouter();

  function handleSignIn() {
    signIn("github", { callbackUrl: "/exercises" });
  }

  if (session) {
    return (
      <>
        <StyledButton onClick={() => signOut()}>Log out</StyledButton>
      </>
    );
  }
  return (
    <>
      <StyledButton onClick={handleSignIn}>
        {homepage ? "Log In with Github" : "Log In"}
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  border: none;
  font-size: 2.5vh;
  background-color: var(--light-orange);
  border-radius: 3rem;
  color: var(--dark-brown);
  text-align: center;
  width: 200px;
  height: fit-content;
  padding: 3px 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: var(--dark-orange);
    transform: scale(1.05);
    cursor: pointer;
  }
`;
