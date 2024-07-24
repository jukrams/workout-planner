import Link from "next/link";
import styled from "styled-components";

export default function Navigation() {
  return (
    <Navbar>
      <li>
        <StyledLink href="/">Exercises</StyledLink>
      </li>
      <li>
        <StyledLink href="/workouts">Workouts</StyledLink>
      </li>
    </Navbar>
  );
}

const Navbar = styled.ul`
  width: 100%;
  background-color: #fdfd96;
  height: 4.5rem;
  position: fixed;
  bottom: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: Verdana;
  color: black;
  font-size: large;
  height: 100%;
`;
