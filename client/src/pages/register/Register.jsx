import './register.scss';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';

const Register = () => {
    
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const handleRegister = async (e) => {
        e.preventDefault();
        if(confirmPassword.current.value !== password.current.value){
            confirmPassword.current.setCustomValidity(`Password doesn't match`)
        } else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try{
                await axios.post('http://localhost:8080/api/v1/auth/register', user);
            } catch(error) {
                console.log("error in registration", error)
            }
        }
    }

    return(
        <div className='body'>
            <div className='register-container'>
                <div className='card'>
                    <div className='form'>
                        <h1>COSLIKE</h1>
                        <h2>Sign up</h2>
                        <form>
                            <input 
                                type='text'
                                required
                                ref={username} 
                                placeholder='Username' 
                            />
                            <input 
                                type='email' 
                                required
                                ref={email}
                                placeholder='Email'
                            />
                            <input 
                                type='password'
                                required 
                                ref={password} 
                                placeholder='Password'
                                minLength='6'
                            />
                            <input 
                                type='password' 
                                required
                                ref={confirmPassword} 
                                placeholder='Confirm Password' 
                            />
                            <button onClick={handleRegister}>Register</button>
                            Already have an account?
                            <Link 
                            to='/login'
                            style={{color: 'inherit'}}>
                                Login here!
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;