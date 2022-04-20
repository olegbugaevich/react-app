import {useMemo} from "react";

export const useSortedPosts =(posts, sorter) => {
    return useMemo(() => {
        if (sorter) {
            return [...posts].sort((a, b) => b.id - a.id)
        }
        return posts
    }, [sorter, posts])
}
export const useSortedAndSearchedPosts = (posts,sorter, query) => {
    const sortedPosts = useSortedPosts(posts,sorter)
    return useMemo(() => {
        return sortedPosts.filter((post) => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])
}