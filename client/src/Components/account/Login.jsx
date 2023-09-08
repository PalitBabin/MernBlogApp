import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    background:#fff;
    border-radius:5px;
`;
const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
display:flex;
flex-direction:column;
flex:1;
padding:25px 35px;
overflow: auto;
& > div, & > button, & > p {
    margin-top: 20px;
}
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: teal;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    &:hover{
        background-color:#64CCC5;
    }
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
    
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`;
const Error = styled(Typography)`
font-size:12px;
color:#ff6161;
font-weight:600;
line-height:0;
margin-top:10px;
`;
const loginInitialValues = {
    username: '',
    password: ''
};
const signupInitialValues = {
    name: '',
    username: '',
    password: ''
};
const Login = ({isUserAuthenticated}) => {

    const [account, toggleAccount] = useState('login');
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);

    const navigate = useNavigate();

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const toggleSignUp = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onValuechange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        const response = await API.userLogin(login);
        if (response?.isSuccess) {
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({ name: response.data.name, username: response.data.username });

            isUserAuthenticated(true);
            navigate("/");

        } else {
             setError("something went wrong! Please try again later");
        }
    }
    const signupUser = async () => {
        const response = await API.userSignup(signup);
        if (response?.isSuccess) {
            setSignup(signupInitialValues);
            toggleAccount('login');
            setError('');
        } else {
            setError('something went wrong! Please try again later')
        }
    }
    return (
        <Box style={{display:"flex"}}>
            <Component>
                <Image src={imageURL} alt='login' />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant='standard' onChange={(e) => onValuechange(e)} name='username' label='Enter Username' autoComplete='off'></TextField>
                            <TextField variant='standard' onChange={(e) => onValuechange(e)} name='password' type='password' label='Enter Password' autoComplete='off'></TextField>
                            {error && <Error>{error}</Error>}
                            <LoginButton variant='contained' onClick={() => loginUser()}>Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignUp()}>Create an account</SignupButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant='standard' label='Enter Name' name='name' onChange={(e) => onInputChange(e)} autoComplete='off'></TextField>
                            <TextField variant='standard' label='Enter Username' name='username' onChange={(e) => onInputChange(e)} autoComplete='off'></TextField>
                            <TextField variant='standard' label='Enter Password' name='password' onChange={(e) => onInputChange(e)} autoComplete='off'></TextField>
                            {error && <Error>{error}</Error>}
                            <SignupButton variant='contained' onClick={() => signupUser()}>Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant='contained' onClick={() => toggleSignUp()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Component>
        </Box>

    )
}

Login.propTypes = {
    isUserAuthenticated:PropTypes.func,
}
export default Login;