import Head from 'next/head'
import { Button, Input, Spacer, Text } from "@nextui-org/react";
import { Box } from '@/components/primitives/box';
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

export default function Upload() {
    const [value, setValue] = useState("");

    return (
        <>
            <Head>
                <title>Create post - MiDStackX</title>
                <meta name="description" content="Create a new post for your feed" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box css={{ mx: "auto", maxW: "50rem" }}>
                <Text css={{ textAlign: "center" }} h1>Create new post</Text>
                <Box css={{ mt: "$24" }}>
                    <Text h4>Post Title</Text>
                    <Input clearable bordered placeholder="Your post title..." fullWidth />
                    <Spacer y={2} />
                    <Text h4>Your Content</Text>
                    <MDEditor
                        placeholder="Type your content"
                        value={value}
                        onChange={(val, event) => setValue(val ?? "")}
                    />
                </Box>
                <Button shadow color="primary" auto css={{ mx: "auto", mt: "$12" }}>
                    Upload
                </Button>
            </Box>
        </>
    )
}
