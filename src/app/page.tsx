import AddPostForm from "../components/AddPostForm";
import PostsList from "../components/PostsList";

export default function Home() {
	return (
		<div>
			<h1 className="text-3xl font-bold mt-8 mb-4 text-center text-gradient-to-r from-[#4c73ff] to-[#389bff]">Posts</h1>
			<AddPostForm />
			<PostsList />
		</div>
	);
}
