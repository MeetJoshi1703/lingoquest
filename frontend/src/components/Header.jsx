import {useNavigate} from 'react-router-dom';
import {Navbar,Nav,Container, NavDropdown} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import {LinkContainer} from 'react-router-bootstrap';
import styled from 'styled-components';


const Section = styled.section`
    nav .brand-name{
    width: 20%;
    display: block;
    margin-right: 0;
}
@media screen and (max-width: 769px) {
    .header-img{
        display: none;
    }
    .navbar > .container > form{
        width: 80%;
    }

    .navbar-collapse > .brand-name{
        display: none;
    }
}


.navbar-expand-md .navbar-nav{
    
}

.navbar-expand-md .navbar-collapse{
 
}

.navbar > .container > form{
  min-width: 50%;
}
.navbar-expand-md .navbar-collapse > form{
  
}
.brand-name{
    position: relative;
}

`



const Header = () => {

    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler =async ()=>{
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }
    
  return (
    <Section>
    <header style={{ position: 'fixed', width: '100%', zIndex: 100,top:'0'}}>
        <Navbar bg='light' variant='light' expand='md' collapseOnSelect >
            <Container>
                
                <Navbar.Collapse id='basic-navbar-nav'>
                    <LinkContainer to='/'>    
                        <Navbar.Brand className='brand-name'>    
                            LingoQuest
                        </Navbar.Brand>
                    </LinkContainer>
                </Navbar.Collapse>

                <Navbar.Toggle aria-controls='basic-navbar-nav' />

                
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>    
                    
                    {userInfo? (
                        <NavDropdown title={userInfo.name} id='username'>
                            <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profile</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <LinkContainer to='/login'><Nav.Link>Sign In</Nav.Link></LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    </Section>
  )
}

export default Header