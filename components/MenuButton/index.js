import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function MenuButton({ isExercisesPage }) {
  const { data: session } = useSession();

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  function handleSignIn() {
    signIn("github", {
      callbackUrl: isExercisesPage ? "/exercises" : "/workouts",
    });
  }

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
  }

  function handleDropdown() {
    setIsOpenDropdown(!isOpenDropdown);
  }

  return (
    <MenuSection>
      <Button onClick={handleDropdown}>
        <Image
          alt="Profile Menu"
          width={35}
          height={35}
          src={"/icons/account-white.svg"}
        />
        <Image
          alt="Arrow"
          width={32}
          height={32}
          src={
            isOpenDropdown
              ? "/icons/arrow-up-white.svg"
              : "/icons/arrow-down-white.svg"
          }
        />
      </Button>
      <Menu $isOpen={isOpenDropdown}>
        <StyledButton onClick={session ? handleSignOut : handleSignIn}>
          {session ? "Log Out" : "Log In"}
        </StyledButton>
        {session ? <StyledLink href={"/progress"}>Progress</StyledLink> : null}
      </Menu>
    </MenuSection>
  );
}

const MenuSection = styled.section`
  display: flex;
  flex-direction: column;
  z-index: 3;
  align-items: flex-end;
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.5rem;
  border-radius: 2rem;
  background-color: var(--gray-brown);
  transition: width 0.3s ease, background-color 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden;
  width: fit-content;
  height: fit-content;

  &:hover {
    background-color: var(--dark-brown);
    cursor: pointer;
  }
`;

const Menu = styled.section`
  background-color: var(--light-orange);
  width: fit-content;
  height: fit-content;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-end;
  margin-top: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 1.75rem;
  padding: 1rem;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  text-decoration: underline;
  color: var(--dark-orange);
  width: 100%;
  text-align: end;
  line-height: 1;
  border-radius: 0.5rem;
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
  font-size: large;

  &:hover {
    color: var(--dark-brown);
    cursor: pointer;
  }
`;

const StyledLink = styled(Link)`
  color: var(--dark-orange);
  width: 100%;
  text-align: end;
  line-height: 1;
  border-radius: 0.5rem;
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
  font-size: large;

  &:hover {
    color: var(--dark-brown);
    cursor: pointer;
  }
`;
