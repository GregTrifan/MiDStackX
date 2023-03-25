import AddressPreview from '@/components/addressPreview'
import BlockiePfp from '@/components/blockiePfp'
import PostCard from '@/components/posts/postCard'
import { Box } from '@/components/primitives/box'
import { getOwnedCreators } from '@/utils/contracts/contractCalls'
import { fetchAddressPosts } from '@/utils/posts/utils'
import { BlogPost } from '@/utils/types'
import { Button, Grid, Spacer, Text } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import Link from 'next/link'

type AlertType = "error" | "primary" | "secondary" | "success" | "warning";

function getRandomAlertType(): AlertType {
    const alertTypes: AlertType[] = ["error", "primary", "secondary", "success", "warning"];
    const randomIndex = Math.floor(Math.random() * alertTypes.length);
    return alertTypes[randomIndex];
}

const ProfilePage = () => {
    const { address: ethAddress } = useAccount()
    const { data: signer } = useSigner()
    const [show, setShow] = useState(false);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [ownedStreams, setOwnedStreams] = useState<string[]>([]);
    useEffect(() => {
        setShow(true);
        (async () => {
            try {
                if (ethAddress) {
                    const fetchedPosts = await fetchAddressPosts(ethAddress);
                    setPosts(fetchedPosts)
                    const grabbedCreators = await getOwnedCreators(signer!);
                    setOwnedStreams(grabbedCreators);
                } else {
                    setPosts([])
                }
            } catch (error) {
                setPosts([])
            }
        })();
    }, [ethAddress, signer]);
    return (
        <Box>

            {show && (<>
                {ethAddress ?
                    (
                        <Box>
                            <Spacer y={5} />
                            <BlockiePfp address={ethAddress} />
                            <AddressPreview address={ethAddress} />

                            {ownedStreams.length > 0 && (<>
                                <Spacer y={4} />
                                <Text b h2 css={{ textAlign: "center", mb: "$10" }}>Owned creator passes</Text>
                                <Grid.Container gap={2} justify="center">
                                    {ownedStreams.map((address, i) => (
                                        <Grid key={i}>
                                            <Button as={Link} href={`profile/${address}`} shadow color={getRandomAlertType()} auto css={{ py: "$14" }}>
                                                <AddressPreview address={address} showClipboard={false} />
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid.Container>
                            </>)}
                            <Spacer y={4} />
                            <Text b h2 css={{ textAlign: "center", mb: "$10" }}>Your Posts</Text>
                            {posts.length < 1 && (
                                <Text css={{
                                    textAlign: "center",
                                    textGradient: "45deg, $primary -20%, $green600 70%",
                                }} h2>No posts created yet</Text>
                            )}
                            {posts.map((p, i) => (
                                <PostCard post={p} key={i} />
                            ))}
                        </Box>
                    )
                    : (
                        <Text css={{
                            textAlign: "center",
                            textGradient: "45deg, $primary -20%, $green600 70%",
                        }} h2>Connect wallet to access this page</Text>
                    )}
            </>)}
        </Box>
    )
}

export default ProfilePage