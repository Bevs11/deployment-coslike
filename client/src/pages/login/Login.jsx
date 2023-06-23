import './login.scss';
import { Link } from 'react-router-dom';
import { useContext, useRef } from 'react';
import { AuthContext } from '../../context/authContext';
import { loginCall } from '../../apiCalls';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {

    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        loginCall(
            {email: email.current.value, password: password.current.value}, 
            dispatch
        );
    };
    console.log(user)
    return(
        <div className='body'>
            <div className='login-container'>
                <div className='card'>
                    <div className='form'>
                        <h1>COSLIKE</h1>
                        <h2>Login</h2>
                        <form onSubmit = {handleLogin}>
                            <input 
                                required
                                type='email' 
                                placeholder='Email' 
                                ref={email}/>
                            <input 
                                required
                                minLength ='6'
                                type='password' 
                                placeholder='Password' 
                                ref={password} />
                            <button 
                                type='submit'> {
                                isFetching 
                                ? <CircularProgress size='15px' /> 
                                : 'Login'
                                }
                            </button>
                                Don't have an account?
                                <Link 
                                to='/register'
                                style={{color: 'inherit'}}>
                                Sign up here!
                                </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;