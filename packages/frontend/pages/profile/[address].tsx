import AddressPreview from '@/components/addressPreview'
import BlockiePfp from '@/components/blockiePfp'
import PostCard from '@/components/posts/postCard'
import { Box } from '@/components/primitives/box'
import { mockPosts } from '@/mock/mockPosts'
import { BlogPost } from '@/utils/types'
import { Spacer, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { isEthAddressValid } from "@/utils/ethUtils";
import { supabase } from '@/utils/supabase/client'
import { GetServerSideProps } from 'next/types'
const AddressProfile = ({ posts }: { posts: Array<BlogPost> }) => {
    const { address: ethAddress } = useAccount()
    const router = useRouter()
    const { address } = router.query

    if (isEthAddressValid(address?.toString() ?? "") && typeof address === "string")
        return (
            <Box>
                <Spacer y={5} />
                <BlockiePfp address={address} />
                <AddressPreview address={address} />
                <Spacer y={4} />
                {posts.length >= 1 && <Text b h2 css={{ textAlign: "center", mb: "$10" }}>User&apos;s Posts</Text>}
                {posts && posts.map((p, i) => (
                    <PostCard post={p} key={i} />
                ))}
                {(!posts || posts.length < 1) && (
                    <Text css={{
                        textAlign: "center",
                        textGradient: "45deg, $primary -20%, $green600 70%",
                    }} h2>No posts avalaible yet</Text>
                )}
            </Box>
        )
    return (
        <Text>Invalid Profile</Text>
    )
}
export const getServerSideProps: GetServerSideProps<{ posts: BlogPost[] }> = async (context) => {
    const { address } = context.query;
    if (isEthAddressValid(address?.toString() ?? "")) {
        try {
            let { data } = await supabase.from('posts').select().eq('userAddress', address?.toString()).order("created_at", { ascending: false });
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
    else
        return {
            props: {
                posts: []
            }
        }
}

export default AddressProfile