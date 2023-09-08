import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";


const Component = styled(AppBar)`
    background: #FFFFFF;
    color: #000;  
`;

const Container = styled(Toolbar)`
position:relative;
display: flex;
justify-content: center; 
align-items: center;
& > a {
    padding: 20px;
    color: #000;
    text-decoration: none;
}
`;
const NavLink = styled(Link)`
  padding: 20px;
  color: #000;
  text-decoration: none;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    bottom:10px;
    left: 0;
    width: 0;
    height: 3px;
    background-color: teal;
    transition: width 0.5s ease;
  }

  &:hover {
    color: teal; 
  }

  &:hover:before {
    width: 100%;
  }
`;

const Header = () => {
    return (
        <Component>
            <Container>
                    <NavLink to="/">HOME</NavLink>
                    <NavLink to="/about">ABOUT</NavLink>
                    <NavLink to="/contact">CONTACT</NavLink>
                    <NavLink to="/login">LOGOUT</NavLink>
            </Container>
            
        </Component>
    )
}
export default Header;