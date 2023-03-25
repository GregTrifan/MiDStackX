import { BlogPost } from '@/utils/types'
import { Button, Card, Row, Text } from '@nextui-org/react'
import dynamic from 'next/dynamic';
import Link from 'next/link'
import React from 'react'
import { MarkdownPreviewProps } from "@uiw/react-markdown-preview";

const MarkdownPreview = dynamic<MarkdownPreviewProps>(
    () => import("@uiw/react-markdown-preview"),
    {
        ssr: false,
    }
);
const PostCard = ({ post }: { post: BlogPost }) => {
    return (
        <Card css={{ mw: "50rem", mx: "auto", my: "$8" }}>
            <Card.Header>
                <Text b>{post.title}</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
                <MarkdownPreview
                    style={{
                        backgroundColor: "transparent"
                    }}
                    source={post.markdown!.slice(0, 150) + '...'} />
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Row justify="flex-end">
                    <Button as={Link} flat
                        auto href={`/post/${post.userAddress}/${post.id}`} size="sm">
                        Read more
                    </Button>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default PostCard