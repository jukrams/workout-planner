import Login from "../Login";
import Navigation from "../Navigation";

export default function Layout({ children, showNavbar }) {
  return (
    <>
      <main>
        <Login />
        {children}
      </main>
      {showNavbar && <Navigation />}
    </>
  );
}
