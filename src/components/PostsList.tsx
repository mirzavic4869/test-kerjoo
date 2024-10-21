"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postsSlice";

const PostsList = () => {
	const dispatch = useDispatch();
	const { posts, status, error } = useSelector((state) => state.posts);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 10;

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchPosts());
		}
	}, [status, dispatch]);

	const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "failed") {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<input type="text" placeholder="Search by title" className="mb-4 p-2 border border-gray-300" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			<ul>
				{currentPosts.map((post) => (
					<li key={post.id} className="mb-4 p-4 border rounded">
						<h3 className="text-xl font-bold">{post.title}</h3>
						<p>{post.body}</p>
					</li>
				))}
			</ul>
			<div className="pagination">
				{[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, i) => (
					<button key={i} onClick={() => paginate(i + 1)} className={`px-4 py-2 m-1 ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default PostsList;
