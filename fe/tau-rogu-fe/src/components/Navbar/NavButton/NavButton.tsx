import { useNavigate } from "react-router-dom";

type NavButtonProps = {
  text: string;
  route: string;
};

const NavButton = (props: NavButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(props.route);
  };

  return <button onClick={handleClick}>{props.text}</button>;
};

export default NavButton;
