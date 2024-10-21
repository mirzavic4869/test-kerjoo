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
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
			</div>
		);
	}
	if (status === "failed") {
		return <div className="text-red-500 text-center text-xl mt-4">Error: {error}</div>;
	}

	return (
		<div className="p-4 mt-20">
			<input
				type="text"
				placeholder="Search by title"
				className="bg-[#242c38] mb-8 flex w-full max-w-lg mx-auto rounded-md border-slate-200 px-3  ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-5  dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 base-regular h-fit border-0 bg-black-400 py-6 pl-20 pr-8 text-white-800 !ring-0 !ring-offset-0 placeholder:text-white-800"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{currentPosts.map((post) => (
					<li key={post.id} className="shadow backdrop-blur-3xl transition-all hover:shadow-lg mb-4 p-6 rounded-md bg-opacity-50 bg-gradient-to-b from-[#161E2C] to-[#111721]">
						<h3 className="text-2xl font-bold text-white mb-2">{post.title}</h3>
						<p className="text-[#a4b8d5]">{post.body}</p>
					</li>
				))}
			</ul>
			<div className="mx-auto flex flex-wrap justify-center">
				{[...Array(Math.ceil(filteredPosts.length / postsPerPage))].map((_, i) => (
					<button key={i} onClick={() => paginate(i + 1)} className={`px-4 py-2 m-1 ${currentPage === i + 1 ? " bg-gradient-to-r from-[#4c73ff] to-[#389bff] rounded-full text-white" : "text-zinc-600"}`}>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	);
};

export default PostsList;
