import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Crud from "../../services/crud.service";

const UserEdit = (props) => {
    const userCrud = new Crud('users')
    const {id} = useParams();
    const [user,setUser] = useState({});
    const [error,setError] = useState('');

    useEffect(() => {
        getUser()
    },[])
    const getUser= () => {
        userCrud.get(`${id}`).then((res) => {
            setUser(res.data);
        }).catch((e) => {
            setError(e.message);
        })
    }
    console.log(user);
    console.log(id);
    return (
        <>
            {error ?
                <h1>
                    {error}
                </h1>
            :
            <div>
                {user.name}
            </div>}
        </>
    );
};

export default UserEdit;