import styled from "styled-components";
import { koulen } from "../HomeLink";

const Text = styled.h2`
  font-family: ${koulen.style.fontFamily};
  font-weight: 400;
  font-size: 24px;
  text-align: center;
  color: #fff;
`;

export default function HomeText() {
  return <Text>Your personalized workout planer</Text>;
}
