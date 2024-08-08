import HomeHeading from "@/components/HomeHeading";
import HomeLink from "@/components/HomeLink";
import HomeText from "@/components/HomeText";
import styled from "styled-components";

const HomeBody = styled.section`
  background-color: #fac74e;
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  box-sizing: border-box;
`;

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
  padding: 1rem;
`;
export default function HomePage() {
  return (
    <>
      <HomeBody>
        <HomeSection>
          <HomeHeading />
          <HomeText />
          <HomeLink />
        </HomeSection>
      </HomeBody>
    </>
  );
}
