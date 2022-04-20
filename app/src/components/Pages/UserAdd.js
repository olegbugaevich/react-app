import React, {useState} from 'react';
import "./users.css"

const UserAdd = ({users, setUsers}) => {
    const [user,setUser] = useState({});

    const onChange = (e) => {
        const field = e.target.id;
        setUser({...user,[field]: e.target.value})
    }

    const addUser = () => {
        setUsers([...users, user])
    }

    const values = {
        name:'text',
        age: 'number',
        country:'text',
    };
    console.log(user);
    return (
        <>
            {Object.keys(values).map((value,index) =>
                <input
                    id={value}
                    key={index}
                    type={values[value]}
                    placeholder={`Input user ${value}`}
                    onChange={onChange}
                />
            )}
            <button onClick={addUser}>Add new user</button>

        </>
    );
};

export default UserAdd;