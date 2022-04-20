import React, {useContext, useEffect, useState} from 'react';
import "./users.css"
import {Link} from "react-router-dom";
import Crud from "../../services/crud.service";
import MyModal from "../../components/MyModal/MyModal";
import AuthContext from "../../context/context";

const UserList = ({users, setUsers, sortedAndSearchedUsers}) => {
    const usersCrud = new Crud('users');
    const [showModal, setShowModal] = useState(false)
    const [currentPost, setCurrentPost] = useState(null)

    useEffect(() => {
        fetchAllUsers();
    },[])

    const fetchAllUsers = () => {
        usersCrud.get('?_page=1&_limit=15').then((res) => {
            console.log(res.data)
            setUsers(res.data)
        })
    }
    const confirmDeletePost = (user) => {
        setCurrentPost(user);
        setShowModal(true);
    }
    const deletePost = () =>{
            usersCrud.delete(currentPost.id).then((res) => {
                setUsers(users.filter((user) => user.id !== currentPost.id));
                setShowModal(false);
            }).catch((err) => console.log(err))
    }
    return (
        <>
            <table className="m-2 table table-hover">
                <thead>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                </thead>
                <tbody>
                {sortedAndSearchedUsers.map((user,index) =>
                    <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.id}</Link></td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td><button onClick={() => confirmDeletePost(user)} className="btn btn-danger">Delete</button></td>
                    </tr>)}
                </tbody>
            </table>
            <MyModal
                visible={showModal}
                onCancel={()=> setShowModal(false)}
                closeButtonShow
                saveButtonShow
                onConfirm={() => deletePost()}

            ><h4>Do you really delete this post?</h4></MyModal>
        </>

    )
};

export default UserList;