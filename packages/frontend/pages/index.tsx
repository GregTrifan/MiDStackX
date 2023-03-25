import Head from 'next/head'
import { Spacer, Text } from "@nextui-org/react";
import { isEthAddressValid } from '@/utils/ethUtils';
import { supabase } from '@/utils/supabase/client';
import { BlogPost } from '@/utils/types';
import { GetServerSideProps } from 'next';
import PostCard from '@/components/posts/postCard';


export default function Home({ posts }: { posts: Array<BlogPost> }) {
    return (
        <>
            <Head>
                <title>MiDStackX</title>
                <meta name="description" content="Read curated Feeds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Spacer y={4} />
                <Text css={{ textAlign: "center" }} h1>Recent posts</Text>
                <Spacer y={2} />
                {posts && posts.map((p, i) => (
                    <PostCard post={p} key={i} />
                ))}
                {(!posts || posts.length < 1) && (
                    <Text css={{
                        textAlign: "center",
                        textGradient: "45deg, $primary -20%, $green600 70%",
                    }} h2>No posts avalaible yet</Text>
                )}
            </main>
        </>
    )
}
export const getServerSideProps: GetServerSideProps<{ posts: BlogPost[] }> = async (context) => {
    try {
        let { data } = await supabase.from('posts').select("*").order("created_at", { ascending: false }).limit(10);
        const posts = data!.map((post: BlogPost) => ({
            ...post,
            markdown: post.markdown!.slice(0, 150) + (post.markdown!.length > 150 ? '...' : '')
        })) as BlogPost[];
        return {
            props: {
                posts
            },
        }
    }
    catch {
        return {
            props: {
                posts: []
            }
        }
    }
}
