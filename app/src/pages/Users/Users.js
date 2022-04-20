import React, {useMemo, useState} from 'react';
import UserList from "./UserList";
import UserAdd from "./UserAdd";
import "./users.css"
import UserSortAndSearch from "./UserSortAndSearch";
import MyModal from "../../components/MyModal/MyModal";

const Users = () => {
    const [showModal, setShowModal] = useState(false)
    const [users, setUsers] = useState([])

    const [sorter, setSorter] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const sortedUsers = useMemo(() => {
        if (sorter === 2) {
            return [...users].sort((a, b) => b.id - a.id)
        } else if (sorter === 1) {
            return [...users].sort((a, b) => a.id - b.id)
        }
        return users
    }, [sorter, users])

    const sortedAndSearchedUsers = useMemo(() => {
        return sortedUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, sortedUsers])

    return (
        <div className="container">
            <button
                className="btn btn-primary mt-3"
                onClick={() => setShowModal(true)}
                >Add User</button>
            <MyModal
                visible={showModal}
                onCancel={()=> setShowModal(false)}
                closeButtonShow

            >
                <UserAdd users = {users} setUsers = {setUsers} closeModal={() => setShowModal(false)}/>
            </MyModal>

            <UserSortAndSearch setSorter={setSorter} setSearchQuery={setSearchQuery}/>
            <UserList users={users} setUsers = {setUsers} sortedAndSearchedUsers={sortedAndSearchedUsers}/>
        </div>
    );
};

export default Users;