import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";

export default function Login({ isHomepage }) {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);

  async function handleSignIn() {
    signIn("github", { callbackUrl: "/exercises" });
  }

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  const ButtonComponent = isHomepage ? HomepageButton : AnimatedButton;

  return (
    <ButtonComponent
      onClick={session ? handleSignOut : handleSignIn}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
      $isHovered={isHovered}
    >
      {session ? (
        isHomepage ? (
          "Log Out"
        ) : (
          <>
            <span className="text">Log Out</span>
            <Image
              alt="Log Out"
              width={35}
              height={35}
              src={"/icons/account-white.svg"}
            />
          </>
        )
      ) : isHomepage ? (
        "Log In with Github"
      ) : (
        <>
          <span className="text">Log In</span>
          <Image
            alt="Log In"
            width={35}
            height={35}
            src={"/icons/account-white.svg"}
          />
        </>
      )}
    </ButtonComponent>
  );
}

const HomepageButton = styled.button`
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

const AnimatedButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  transition: width 0.3s ease, background-color 0.2s ease;
  background-color: var(--orange);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden;

  background-color: ${({ $isHovered }) =>
    $isHovered ? "var(--dark-orange)" : "var(--orange)"};
  border-radius: ${({ $isHovered }) => ($isHovered ? "2rem" : "50%")};

  width: fit-content;
  height: fit-content;

  &:hover {
    background-color: var(--dark-orange);
    border-radius: 2rem;
  }

  &:hover .text {
    opacity: 1;
    max-width: 200px;
    margin: 0 0.2rem;
  }

  .text {
    color: white;
    font-size: large;
    opacity: 0;
    max-width: 0;
    white-space: nowrap;
    overflow: hidden;
    transition: opacity 0.3s ease, margin-left 0.3s ease, max-width 0.3s ease;
  }
`;
