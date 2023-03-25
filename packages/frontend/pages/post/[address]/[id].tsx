import { isEthAddressValid } from '@/utils/ethUtils'
import { supabase } from '@/utils/supabase/client'
import { BlogPost } from '@/utils/types'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Text } from '@nextui-org/react'
import AddressPreview from '@/components/addressPreview'
import BlockiePfp from '@/components/blockiePfp'
import { Box } from '@/components/primitives/box'
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";
import dynamic from 'next/dynamic'
import GetNftModal from '@/components/modals/getNftModal'

const MarkdownPreview = dynamic<MarkdownPreviewProps>(
    () => import("@uiw/react-markdown-preview"),
    {
        ssr: false,
    }
);
const PostPage = ({ post }: { post?: BlogPost | null }) => {
    const router = useRouter()
    const { address, id } = router.query
    const [viewable, setViewable] = useState<boolean>(false);
    if (post && typeof address === "string")
        return (
            <Box css={{ mx: "$12" }}>

                <Box css={{ mr: "auto", mw: "min-content", my: "$12" }}>
                    <Box css={{ mt: "auto", mr: "auto", mw: "min-content" }}>
                        <BlockiePfp address={address} size={50} />
                    </Box>
                    <AddressPreview address={address} />
                    {!viewable && (
                        <>
                            <div className="blur-overlay" />
                            <GetNftModal {...{
                                address, viewable, setViewable
                            }} />
                        </>
                    )}
                </Box>
                <Box>
                    <Text h2 css={{
                        mb: "$14",
                        textGradient: "45deg, $primary -20%, $green600 70%",
                    }}>{post.title}</Text>
                    <MarkdownPreview
                        style={{
                            backgroundColor: "transparent"
                        }}
                        source={post.markdown ?? ""} />
                </Box>
            </Box>
        )
    return (
        <Text css={{
            textAlign: "center",
            textGradient: "45deg, $primary -20%, $green600 70%",
        }} h2>No posts avalaible yet</Text>
    )
}
export const getServerSideProps: GetServerSideProps<{ post: BlogPost | null; }> = async (context) => {
    const { address, id } = context.query;
    if (isEthAddressValid(address?.toString() ?? '')) {
        try {
            const { data } = await supabase
                .from('posts')
                .select()
                .eq('userAddress', address?.toString())
                .eq('id', Number(id))
                .limit(1);

            if (data && data.length) {
                const posts = data as BlogPost[]
                /*
                data.map((post: BlogPost) => ({
                ...post,
                markdown: post.markdown!.slice(0, 150) + (post.markdown!.length > 150 ? '...' : ''),
            })) as BlogPost[];
            */
                return {
                    props: {
                        post: posts[0]
                    },
                };

            }

            return {
                props: {
                    post: null,
                },
            };
        } catch (error) {
            console.error(error);
            return {
                props: {
                    post: null,
                },
            };
        }
    } else {
        return {
            props: {
                post: null,
            },
        };
    }
};

export default PostPage