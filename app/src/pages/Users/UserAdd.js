import React, {useState} from 'react';
import "./users.css"
import Crud from "../../services/crud.service";

const UserAdd = ({users, setUsers, closeModal}) => {
    const usersCrud = new Crud('users');

    const onChange = (e) => {
        const field = e.target.id;
        setValues({...values,[field]: e.target.value})
    }

    const addUser = () => {
        usersCrud.create(values).then((res)=>{
            setUsers([...users, values])
            setValues({
                id: Date.now(),
                name:'',
                email:'',
                username: '',
            })
            // setShowModal(false);
            closeModal()
        }).catch((err) => console.log(err))
        // setUsers([...users, values])
        // console.log(values.id)
        // setValues({
        //     id: Date.now(),
        //     name:'',
        //     age: '',
        //     country:'',
        // })
        // closeModal()
    }

    const [values, setValues] = useState({
        id: Date.now(),
        name:'',
        email:'',
        username: '',
    });

    return (
        <>
            {Object.keys(values).map((value,index) => {

                if(value === 'id'){
                    return false
                }
                if(value === 'email'){
                    return <input
                        className="mt-2 mb-2"
                        id={value}
                        key={index}
                        value={values[value]}
                        type = "email"
                        placeholder={`Input user ${value}`}
                        onChange={onChange}
                    />
                }
                return <input
                    id={value}
                    key={index}
                    value={values[value]}
                    type ="text"
                    placeholder={`Input user ${value}`}
                    onChange={onChange}
                />
            })
            }
            <button class="m-2 btn btn-primary" onClick={addUser}>Add new user</button>
        </>
    );
};

export default UserAdd;