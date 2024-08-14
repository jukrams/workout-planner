import styled from "styled-components";
import Link from "next/link";
import Login from "@/components/Login";
import { useSession } from "next-auth/react";

export function AppName() {
  return (
    <Heading>
      Work
      <br />
      it
      <br />
      out!
    </Heading>
  );
}

export function AppDescription() {
  return <Text>Your personalized workout planer</Text>;
}

export default function StartPage() {
  const { data: session } = useSession();

  return (
    <Background>
      <Section>
        <AppName />
        <AppDescription />
        {session ? (
          <StyledLink href="/exercises">Start</StyledLink>
        ) : (
          <>
            <Login isHomepage />
            <StyledText>or</StyledText>
            <StyledLink href="/exercises">Start as guest</StyledLink>
          </>
        )}
      </Section>
    </Background>
  );
}

const Background = styled.section`
  background: radial-gradient(
    circle,
    var(--orange) 70%,
    var(--dark-orange) 100%
  );
  min-width: 100%;
  min-height: 100%;
  position: absolute;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12vh;
  padding: 1rem;
`;

const Heading = styled.h1`
  font-size: 10vh;
  text-align: center;
  line-height: 0.9;
  color: var(--dark-brown);
  letter-spacing: 0.3vw;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  cursor: default;
`;

const Text = styled.h2`
  font-weight: 400;
  font-size: 2.8vh;
  text-align: center;
  color: white;
  margin-top: -6.5vh;
  cursor: default;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
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
  }
`;

const StyledText = styled.p`
  color: white;
  line-height: 1;
  margin: 0.5rem 0;
  cursor: default;
`;
