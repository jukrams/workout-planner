import Link from "next/link";
import styled from "styled-components";
import { Koulen } from "next/font/google";

export const koulen = Koulen({ subsets: ["latin"], weight: "400" });
const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: ${koulen.style.fontFamily};
  font-size: 1.5rem;
  background-color: #fdedc8;
  border-radius: 25px;
  padding-left: 20px;
  padding-right: 20px;
  color: #4d4020;
  text-align: center;
  padding-top: 2px;
`;

export default function HomeLink() {
  return <StyledLink href="/">Start</StyledLink>;
}
