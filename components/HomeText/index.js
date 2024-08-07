import styled from "styled-components";
import { koulen } from "../HomeLink";

const Text = styled.h2`
  font-family: ${koulen.style.fontFamily};
  font-weight: 400;
  font-size: 2.8vh;
  text-align: center;
  color: #fff;
  margin-top: -6.5vh;
`;

export default function HomeText() {
  return <Text>Your personalized workout planer</Text>;
}
