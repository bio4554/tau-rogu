import NavButton from "./NavButton/NavButton";

const Navbar = () => {
  return (
    <div>
      <NavButton text="Home" route="/"></NavButton>
      <NavButton text="Login" route="/login"></NavButton>
    </div>
  );
};

export default Navbar;
