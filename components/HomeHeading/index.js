import styled from "styled-components";
import { koulen } from "../HomeLink";

const Heading = styled.h1`
  font-family: ${koulen.style.fontFamily};
  font-size: 10vh;
  text-align: center;
  line-height: 0.9;
  color: #4d4020;
  letter-spacing: 0.3vw;
`;

export default function HomeHeading() {
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
