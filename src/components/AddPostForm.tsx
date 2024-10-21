"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/postsSlice";

const AddPostForm = () => {
	const { register, handleSubmit, reset } = useForm();
	const dispatch = useDispatch();

	const onSubmit = (data: { title: string; body: string }) => {
		const newPost = {
			id: Math.floor(Math.random() * 1000),
			title: data.title,
			body: data.body,
		};
		dispatch(addPost(newPost));
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full max-w-md mx-auto flex flex-col justify-center">
			<div className="mb-2">
				<label className="block mb-1">Title</label>
				<input
					{...register("title", { required: true })}
					className="bg-[#242c38] mb-8 flex w-full rounded-md border-slate-200 px-3  ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-5  dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 base-regular h-fit border-0 bg-black-400 py-6 pl-20 pr-8 text-white-800 !ring-0 !ring-offset-0 placeholder:text-white-800"
				/>
			</div>
			<div className="mb-2">
				<label className="block mb-1">Body</label>
				<textarea
					{...register("body", { required: true })}
					className="bg-[#242c38] mb-8 flex w-full rounded-md border-slate-200 px-3  ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-5  dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 base-regular h-fit border-0 bg-black-400 py-6 pl-20 pr-8 text-white-800 !ring-0 !ring-offset-0 placeholder:text-white-800"
				/>
			</div>
			<button type="submit" className="bg-gradient-to-r from-[#4c73ff] to-[#389bff] text-white px-4 py-2 rounded-md">
				Add Post
			</button>
		</form>
	);
};

export default AddPostForm;
