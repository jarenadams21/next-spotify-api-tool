import {useState} from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(true);

    const {login, signup, currentUser} = useAuth()
    console.log(currentUser)

    async function submitHandler() {
        if (!email || !password) {
            setError('Please enter email and password');
             return 
            }

            if (isLoggingIn) {
                try {
                    return await login(email, password);
                } catch (error) {
                    setError('Incorrect email or password')
                }
                return;
            }
            
            await signup(email, password);
    }

    return (
        <div className="flex bg-green-100 gap-2 sm:gap-4 flex-col text-xs sm:text-sm justify-center items-center">
            <h1 className='font-extrabold select-none text-2xl sm:text-4xl uppercase'>
                {isLoggingIn ? 'Login' : 'Register'}
                </h1>
            { error && <div className="w-full max-w-[40ch]
            border-rose-400 border border-solid text-center text-rose-400 py-2">{error}</div> }
            <input type="text"
            placeholder="react-monkey@zaza.com . . ." 
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
            }}
            className='outline-none
            text-slate-900 p-2 w-full max-w-[30ch]
            duration-300 border-b-2 border-solid border-white focus:border-indigo-300'/>
            <input type="text"
            placeholder="securePassword1234" 
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
            }}
            className='outline-none
            text-slate-900 p-2 w-full max-w-[30ch]
            duration-300 border-b-2 border-solid border-white focus:border-indigo-300'/>
            <button
            onClick={submitHandler} 
            className="w-full max-w-[30ch] border py-1 border-white-400 border-solid uppercase
            relative after:absolute after:top-0 after:right-full after:bg-white
            after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full
            after:duration-300">
                <h2 className="relative z-20">Go</h2>
                </button>
                <h2 className="duration-300 hover:scale-110 cursor-pointer"
                onClick={() => setIsLoggingIn(!isLoggingIn)}
                >{isLoggingIn ? 'Login' : 'Register'}</h2>
        </div>
    )
}