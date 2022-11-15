import { useState } from 'react'
import Modal from '../modal/modal';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../adduser/adduser.css'
import { appendErrors, set, useForm } from 'react-hook-form';
import { schema } from '../adduser/validations';
import { joiResolver } from '@hookform/resolvers/joi';
import { signUp, logIn } from '../../context/auth/AuthThunks';



export const SignUp = ()=> {

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isOpen, setIsOpen ] = useState(false);
    const [ success, isSuccess ] = useState(false);
    const [ fetching, isFetching ] = useState(false);


    // const [ error, setError ] = useState(false);

    // const { regNew, suError } = useAuth();

    const navigate = useNavigate()

    const signUp = (e)=>{
        e.preventdefault();
        isFetching(true);
        signUp(email,password);
        fetch('http://localhost:8080', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                })})

                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if(data.error===false){
                        isSuccess(true)
                        setIsOpen(true)
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                    isSuccess(false);
                });
                navigate('/')
                isFetching(false);
    }

    const handleClose = ()=>{
        setIsOpen(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: joiResolver(schema)
    });

    return (
        <div className="all">
            {fetching && <p>...loading</p>}
            {isOpen &&
            <Modal setIsOpen={setIsOpen} modalTitle={success===true? "Success" : "Something went wrong"}>
                <p>{success ? "New account created" : null}</p>
                <div className='addModalButtons'>
                    <Link to={'/'}>
                        <button onClick={handleClose}>Go back</button>
                    </Link>
                </div>
            </Modal>}
            <div className="title">
                <h2>Sign up</h2>
            </div>
            {/* {error && <p className='error'>An error ocurred while creating the user</p>} */}
            <div className="form">
                <form action="" onSubmit={handleSubmit(signUp)}>
                    <label htmlFor="">First Name</label>
                    <input type="text" {...register('firstName')} name="firstName" error={appendErrors.firstName?.message} value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                        {errors.firstName && <span>{errors.firstName?.message}</span>}
                    <label htmlFor="">Last Name</label>
                    <input type="text" {...register('lastName')} name="lastName" error={appendErrors.lastName?.message} value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                        {errors.lastName && <span>{errors.lastName?.message}</span>}
                    <label htmlFor="">Email</label>
                    <input type="mail" {...register('email')} name="email" error={appendErrors.email?.message} value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                        {errors.email && <span>{errors.email?.message}</span>}
                    <label htmlFor="">Password</label>
                    <input type="password" {...register('password')} error={appendErrors.password?.message} value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        {errors.password && <span>{errors.password?.message}</span>}
                    <div className='formButtons'>
                        <button action="submit" type="submit" onClick={signUp}>Sign up</button>
                        <Link to={'/'}>
                            <button>Go back</button>
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    )
}