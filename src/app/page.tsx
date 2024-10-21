import AddPostForm from "../components/AddPostForm";
import PostsList from "../components/PostsList";

export default function Home() {
	return (
		<div>
			<h1 className="text-3xl font-bold mb-4 text-center">Posts</h1>
			<AddPostForm />
			<PostsList />
		</div>
	);
}
