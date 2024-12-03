import { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setLogin } from '../redux/state';
const Login = () => {

const [email, setEmail] = useState("")
const [password , setPassword] = useState("")
const navigate = useNavigate()
 const dispatch = useDispatch()


const handleSubmit = async (e) =>{
  e.preventDefault()
  try{
    const response = await fetch('http://localhost:7000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    //get data after fetching
    const loggedIn = await response.json()
    if(loggedIn){
      dispatch(
        setLogin({ 
          user:loggedIn.user,
          token:loggedIn.token
        })
      )
      navigate("/")
    }


  }catch(err){
    console.log("Login Failed",err.message)
  }

 };

  return (
    <div className='absolute h-full w-full bg-black/40 z-50 flex justify-center items-center'>
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 bg-white w-[380px] p-8 rounded-lg shadow-xl text-sm'>
        <div>
          <h3 className='text-2xl font-semibold text-center mb-6 text-gray-700'>Login</h3>
        </div>
  
        <input
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          name='email'
          value={email}
          placeholder='Email Address'
          required
          className='bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-secondary'
        />
  
        <input
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          required
          className='bg-gray-100 border border-gray-300 p-3 rounded-md outline-none focus:ring-2 focus:ring-secondary'
        />
  
        <button
          type='submit'
          className='bg-secondary text-white py-3 rounded-md mt-4 hover:bg-secondary-dark transition-all duration-300'
        >
          Login
        </button>
  
        <div className='text-center text-gray-600 mt-4'>
           Don't have an account?{' '}
          <Link to={'/register'} className='text-secondary font-semibold hover:underline'>
            Register
          </Link>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default Login;
 