import Head from 'next/head'
import { Button, Input, Loading, Spacer, Text } from "@nextui-org/react";
import { Box } from '@/components/primitives/box';
import dynamic from "next/dynamic";
import { useState } from "react";
import { BlogPost } from '@/utils/types';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import { addPost } from '@/utils/posts/utils';
import { useRouter } from 'next/router';

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function Upload() {
    const [blogPost, setBlogPost] = useState<BlogPost>({ title: '', markdown: '' })
    const { address: ethAddress } = useAccount()
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const handleSubmit = async () => {
        if (!blogPost.title || !blogPost.markdown) {
            toast.error('Please fill out all fields');
            return;
        }
        setLoading(true);
        try {
            const response = await addPost({ ...blogPost, userAddress: ethAddress });
            if (response.id) {
                toast.success('Post created successfully, redirecting to profile...');
                setSubmitted(true)
                await setTimeout(() => {
                    router.push("/profile");
                }, 700)
            } else {
                toast.error('Error creating post');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error creating post');
        }
        setLoading(false);
    };

    return (
        <>
            <Head>
                <title>Create post - MiDStackX</title>
                <meta name="description" content="Create a new post for your feed" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {ethAddress ?
                (
                    <Box css={{ mx: "auto", maxW: "50rem" }}>
                        <Text css={{ textAlign: "center" }} h1>Create new post</Text>
                        <Box css={{ mt: "$24" }}>
                            <Text h4>Post Title</Text>
                            <Input clearable bordered
                                placeholder="Your post title..."
                                value={blogPost?.title ?? ""}
                                onChange={(e) => setBlogPost({ ...blogPost, title: e.target.value })}
                                fullWidth />
                            <Spacer y={2} />
                            <Text h4>Your Content</Text>
                            <MDEditor
                                style={{ backgroundColor: "transparent", borderRadius: 0 }}
                                placeholder="Type your content"
                                value={blogPost?.markdown ?? ""}
                                onChange={(val, event) => setBlogPost({ ...blogPost, markdown: val ?? "" })}
                            />
                            { }
                        </Box>
                        {!loading ? (<Button shadow color="primary" disabled={submitted} auto css={{ mx: "auto", mt: "$12" }} onClick={handleSubmit}>
                            Upload
                        </Button>) : (<Box css={{ textAlign: "center", mx: "auto" }}>
                            <Loading color="primary" textColor="primary">
                                Uploading post...
                            </Loading>
                        </Box>)}

                    </Box>)
                : (
                    <Text css={{
                        textAlign: "center",
                        textGradient: "45deg, $primary -20%, $green600 70%",
                    }} h2>Connect your wallet</Text>
                )}
        </>
    )
}
