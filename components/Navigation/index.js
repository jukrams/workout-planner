import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function Navigation() {
  const router = useRouter();

  return (
    <Navbar>
      <Section $active={router.pathname === "/"}>
        <StyledLink href="/">Exercises</StyledLink>
      </Section>
      <Section $active={router.pathname === "/workouts"}>
        <StyledLink href="/workouts">Workouts</StyledLink>
      </Section>
    </Navbar>
  );
}

const Navbar = styled.ul`
  width: 100%;
  height: 4.25rem;
  background-color: #fbda8b;
  position: fixed;
  bottom: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

const Section = styled.li`
  background-color: ${(props) => (props.$active ? "var(--orange)" : "#FBDA8B")};
  height: 100%;
  display: flex;
  align-items: center;
  line-height: 1;

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
`;
