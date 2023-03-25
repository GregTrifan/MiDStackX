import axios from "axios";
import { BlogPost } from "../types";

export const fetchAddressPosts = async (
	address: string
): Promise<BlogPost[]> => {
	const response = await axios.get<BlogPost[]>(`/api/posts?address=${address}`);
	return response.data;
};
export const addPost = async (post: BlogPost): Promise<BlogPost> => {
	const response = await axios.post("/api/addPost", post);
	return response.data;
};
