import { isEthAddressValid } from "@/utils/ethUtils";
import { supabase } from "@/utils/supabase/client";
import { BlogPost } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address } = req.query;
	if (isEthAddressValid(address?.toString() ?? "")) {
		try {
			const { data } = await supabase
				.from("posts")
				.select("*")
				.eq("userAddress", address)
				.order("created_at", { ascending: false });
			const posts = data!.map((post: BlogPost) => ({
				...post,
				markdown:
					post.markdown!.slice(0, 150) +
					(post.markdown!.length > 150 ? "..." : ""),
			})) as BlogPost[];
			res.status(200).json(posts);
		} catch (error) {
			res.status(500).json({ message: "Failed to fetch posts." });
		}
	} else {
		res.status(400).json({ message: "Invalid Ethereum address." });
	}
}
