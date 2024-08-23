import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Navigation() {
  const router = useRouter();

  return (
    <Navbar>
      <NavbarItem $active={router.pathname === "/exercises"}>
        <StyledLink
          $active={router.pathname === "/exercises"}
          href="/exercises"
        >
          Exercises
        </StyledLink>
      </NavbarItem>
      <NavbarItem $active={router.pathname === "/workouts"}>
        <StyledLink $active={router.pathname === "/workouts"} href="/workouts">
          Workouts
        </StyledLink>
      </NavbarItem>
    </Navbar>
  );
}

const Navbar = styled.ul`
  width: 100%;
  height: 4.25rem;
  background-color: var(--light-brown);
  position: fixed;
  bottom: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

const NavbarItem = styled.li`
  background-color: ${(props) =>
    props.$active ? "var(--gray-brown)" : "var(--light-brown)"};
  height: 100%;
  display: flex;
  align-items: center;
  line-height: 1;
  height: 100%;

  &:first-of-type {
    border-top-right-radius: ${(props) => (props.$active ? "1.25rem" : "0")};
    width: ${(props) => (props.$active ? "60%" : "40%")};
    justify-content: flex-start;
    padding-left: 1.5rem;
  }

  &:last-of-type {
    border-top-left-radius: ${(props) => (props.$active ? "1.25rem" : "0")};
    width: ${(props) => (props.$active ? "60%" : "40%")};
    justify-content: flex-end;
    padding-right: 1.5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--dark-brown);
  font-size: 1.4rem;
  color: ${(props) => (props.$active ? "white" : "var(--dark-brown)")};
`;
