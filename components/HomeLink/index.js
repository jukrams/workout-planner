import Link from "next/link";
import styled from "styled-components";
import { Koulen } from "next/font/google";

export const koulen = Koulen({ subsets: ["latin"], weight: "400" });
const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${koulen.style.fontFamily};
  font-size: 2.5vh;
  background-color: #fdedc8;
  border-radius: 3rem;
  padding-left: 10vw;
  padding-right: 10vw;
  color: #4d4020;
  text-align: center;
  padding-top: 2px;
`;

export default function HomeLink() {
  return <StyledLink href="/exercises">Start</StyledLink>;
}
