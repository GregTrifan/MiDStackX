import { supabase } from "@/utils/supabase/client";
import { BlogPost } from "@/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { title, markdown, userAddress } = req.body as BlogPost;

	if (!title || !markdown || !userAddress) {
		res.status(400).json({ error: "Missing required fields" });
		return;
	}

	try {
		const { count, error } = await supabase.from("posts").insert({
			title,
			markdown,
			userAddress,
		});

		if (error) {
			throw error;
		}

		if (count === 0) {
			throw new Error("No rows were inserted");
		}

		const { data } = await supabase
			.from("posts")
			.select()
			.eq("title", title)
			.eq("userAddress", userAddress);

		res.status(201).json(data![0] as BlogPost);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error inserting blog post" });
	}
}
