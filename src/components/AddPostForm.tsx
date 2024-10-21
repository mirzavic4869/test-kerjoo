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
		<form onSubmit={handleSubmit(onSubmit)} className="p-4">
			<div className="mb-4">
				<label className="block mb-1">Title</label>
				<input {...register("title", { required: true })} className="border p-2 w-full" />
			</div>
			<div className="mb-4">
				<label className="block mb-1">Body</label>
				<textarea {...register("body", { required: true })} className="border p-2 w-full" />
			</div>
			<button type="submit" className="bg-blue-500 text-white px-4 py-2">
				Add Post
			</button>
		</form>
	);
};

export default AddPostForm;
