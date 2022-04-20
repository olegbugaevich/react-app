import React, {useEffect, useMemo, useState} from 'react';
import "./posts.css"
import MyModal from "../../components/MyModal/MyModal";
import http from "../../http";
import Crud from "../../services/crud.service";
import Spinner from "../../components/Spinner";
import {useSortedAndSearchedPosts} from "../../hooks/usePosts";

const Posts = () => {
    const postsCrud = new Crud('posts');
    const [currentPost, setCurrentPost] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [sorter, setSorter] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [usersPosts, setUsersPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAllPosts();
    },[])

    const fetchAllPosts = () => {
        setLoading(true);
        postsCrud.get('?_page=1&_limit=15').then((res) => {
            console.log(res.data)
            setUsersPosts(res.data)
            setLoading(false);
        })
    }
    const confirmDeletePost = (post) => {
      setCurrentPost(post);
      setShowModal(true);
    }

    const deletePost = () =>{
        postsCrud.delete(currentPost.id).then((res)=>{
            setUsersPosts(usersPosts.filter((post) => post.id !== currentPost.id));
            setShowModal(false);
        }).catch((err) => console.log(err))
    }
    const onSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    const onSort = (e) => {
        setSorter(+e.target.value)
    }
    const sortedAndSearchedPosts = useSortedAndSearchedPosts(usersPosts, sorter,searchQuery)
    return (
        <div className="container">
            <div className="input-group mt-3">
                <span className="input-group-text" id="basic-addon1">Search</span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search post"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={onSearch}
                />
            </div>
            <select className="form-select mt-3"
                    aria-label="Default select example"
                    onChange={onSort}
            >
                <option defaultValue value="0">from Min to Max</option>
                <option value="1">from Max to Min</option>
            </select>
            {loading ? <Spinner/> :
            <div className="posts-container mt-3">
                {sortedAndSearchedPosts.length
                    ? sortedAndSearchedPosts.map((post, id) =>
                        <div className="card" key={post.id}>
                            <div className="card-body">
                                <h5 className="card-title">{post.id}. {post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <button onClick={() => confirmDeletePost(post)} className="btn btn-primary">Delete</button>
                            </div>
                        </div>
                    )
                    : <h3 className="mt-4">Posts not found</h3>}
            </div>}
            <MyModal
                visible={showModal}
                onCancel={()=> setShowModal(false)}
                closeButtonShow
                saveButtonShow
                onConfirm={() => deletePost()}

            ><h4>Do you really delete this post?</h4></MyModal>
        </div>
    );
};

export default Posts;