import Navigation from "../Navigation";

export default function Layout({ children, showNavbar }) {
  return (
    <>
      <main>{children}</main>
      {showNavbar && <Navigation />}
    </>
  );
}
