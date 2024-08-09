import styled from "styled-components";
import Link from "next/link";

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

export function StartLink() {
  return <StyledLink href="/exercises">Start</StyledLink>;
}

export default function HomePage() {
  return (
    <Background>
      <Section>
        <AppName />
        <AppDescription />
        <StartLink />
      </Section>
    </Background>
  );
}

const Background = styled.section`
  background-color: #fac74e;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
  padding: 1rem;
`;

const Heading = styled.h1`
  font-size: 10vh;
  text-align: center;
  line-height: 0.9;
  color: #4d4020;
  letter-spacing: 0.3vw;
`;
const Text = styled.h2`
  font-weight: 400;
  font-size: 2.8vh;
  text-align: center;
  color: #fff;
  margin-top: -6.5vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 2.5vh;
  background-color: #fdedc8;
  border-radius: 3rem;
  padding-left: 10vw;
  padding-right: 10vw;
  color: #4d4020;
  text-align: center;
  padding-top: 2px;
`;
