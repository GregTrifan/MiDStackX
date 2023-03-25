import AddressPreview from '@/components/addressPreview'
import BlockiePfp from '@/components/blockiePfp'
import PostCard from '@/components/posts/postCard'
import { Box } from '@/components/primitives/box'
import { mockPosts } from '@/mock/mockPosts'
import { fetchAddressPosts } from '@/utils/posts/utils'
import { BlogPost } from '@/utils/types'
import { Spacer, Text } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const ProfilePage = () => {
    const { address: ethAddress, isConnected } = useAccount()
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        setShow(true);
        (async () => {
            try {
                if (ethAddress) {
                    const fetchedPosts = await fetchAddressPosts(ethAddress);
                    setPosts(fetchedPosts)
                }
                else {
                    setPosts([])
                }
            } catch (error) {
                setPosts([])
            }
        })();
    }, [ethAddress]);
    return (
        <Box>

            {show && (<>
                {ethAddress ?
                    (
                        <Box>
                            <Spacer y={5} />
                            <BlockiePfp address={ethAddress} />
                            <AddressPreview address={ethAddress} />
                            <Spacer y={4} />
                            <Text b h2 css={{ textAlign: "center", mb: "$10" }}>Your Posts</Text>
                            {posts.map((p, i) => (
                                <PostCard post={p} key={i} />
                            ))}
                        </Box>
                    )
                    : (
                        <Text>Connect your Wallet</Text>
                    )}
            </>)}
        </Box>
    )
}

export default ProfilePage