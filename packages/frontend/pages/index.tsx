import Head from 'next/head'
import { Text } from "@nextui-org/react";


export default function Home() {
    return (
        <>
            <Head>
                <title>MiDStackX</title>
                <meta name="description" content="Read curated Feeds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main >
                <Text css={{ textAlign: "center" }} h1>Lorem Ipsum</Text>
            </main>
        </>
    )
}
