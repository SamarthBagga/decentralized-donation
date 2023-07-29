import { Navbar,Nav, Container, NavbarBrand, NavDropdown} from "react-bootstrap";
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutMutation } from "../slices/usersApiSlice";
import {logout} from '../slices/authSlice.js'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const {userInfo} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/')
        }catch(error){
            console.log(error);
        }
    }
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnselect>
                <Container>
                    <LinkContainer to='/'>
                    <Navbar.Brand>Decentralized Donation</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className="ms-auto">
                            { userInfo?(
                                <>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/withdraw'>
                                        <NavDropdown.Item>
                                            Withdraw
                                        </NavDropdown.Item>                                    
                                </LinkContainer>
                                <LinkContainer to='/register'>
                                <NavDropdown.Item>
                                            Add Admins
                                        </NavDropdown.Item>       
                            </LinkContainer>

                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>
                                </NavDropdown>
                                </>
                            ):(
                                <>
                                <LinkContainer to='/'>
                            <Nav.Link>
                            <FaSignInAlt/>Fund
                            </Nav.Link>
                            </LinkContainer>
                                <LinkContainer to='/login'>
                            <Nav.Link>
                                <FaSignInAlt/>Admin Sign In
                            </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register'>
                            <Nav.Link>
                                <FaSignInAlt/>Add Admins
                            </Nav.Link>
                            </LinkContainer>
                            

                                </>
                            ) }
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
export default Header;