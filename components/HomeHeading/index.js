import styled from "styled-components";
import { koulen } from "../HomeLink";

const Heading = styled.h1`
  font-family: ${koulen.style.fontFamily};
  font-size: 100px;
  text-align: center;
  line-height: 9vh;
  color: #4d4020;
  margin-bottom: -0.5rem;
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
