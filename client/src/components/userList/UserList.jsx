import { useEffect } from "react";
import { useState } from "react";
import './userlist.css';
import { BsFillPencilFill } from 'react-icons/bs';
import { GoTrashcan } from 'react-icons/go'
import { Link } from "react-router-dom";
import { Modal } from '../modal/modal';

export const UserList = ()=> {

    const [ users, setUsers ] = useState([]);
    const [ isOpen, setIsOpen ] = useState(false);

    const getUsers = async () =>{
        const response = await fetch('http://localhost:8080/users');
        const data = await response.json();
        setUsers(data.data);
    }

    useEffect(()=>{
        getUsers();
    },[])

    const deleteUser = (id)=>{
        fetch(`http://localhost:8080/${id}`, {method: 'DELETE'})
        .then((response)=> {
            if(!response.ok){
                throw new Error('Something went wrong')
            }else{
                setIsOpen(true)
                setUsers(users.filter(item=>item._id !== id))
            }
        }).catch((e)=>console.log(e))

        console.log('id:',id)
}

    return (
        <div id="#home" className="all">
            <h2 className="title">Users List</h2>
            <div className="userList">
            {isOpen &&
                <Modal setIsOpen={setIsOpen} modalTitle={'User successfully deleted'}>
                    <Link to={'/'}>
                        <button onClick={()=>setIsOpen(false)}>Go back</button>
                    </Link>
                </Modal>}
                {users.map((user)=>{
                    return(
                        <div className="userCard" key={user._id}>
                            <div className="header">
                                <h3>{user.firstName} {user.lastName}</h3>
                                <div className="headerButtons">
                                    <Link to={'/edit-user'}>
                                        <BsFillPencilFill />
                                    </Link>
                                    <GoTrashcan onClick={()=>deleteUser(user._id)}/>
                                </div>
                            </div>
                            <span>{user.email}</span>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}