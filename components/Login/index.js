import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";

export default function Login() {
  const { data: session } = useSession();

  function handleSignIn() {
    signIn("github", { callbackUrl: "/exercises" });
  }

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  return (
    <Button onClick={session ? handleSignOut : handleSignIn}>
      {session ? "Log Out" : "Log In with Github"}
    </Button>
  );
}

const Button = styled.button`
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
