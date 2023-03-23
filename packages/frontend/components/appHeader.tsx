import { Navbar, Button, Link, Text } from "@nextui-org/react";
import React from 'react'
import Image from "next/image";
import { Box } from "./primitives/box";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const AppHeader = () => {
    const LinkItems: { label: string, link: string }[] = [
        {
            label: "Create Post",
            link: "/upload"
        },
        {
            label: "Profile",
            link: "/profile"
        },
    ];

    return (
        <Navbar isBordered variant="sticky" maxWidth="fluid">
            <Navbar.Brand>
                <Navbar.Toggle aria-label="toggle navigation" css={{ "@sm": { display: "none" } }} />
                <Image src="/logo.png" alt="MIDSTACKX" width={150} height={18.5} style={{ marginLeft: "0.5rem" }} />
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn={"sm"} variant="underline">
                {LinkItems.map((item, index) => (
                    <Navbar.Link href={item.link} key={index}>
                        {item.label}
                    </Navbar.Link>
                ))}
            </Navbar.Content>
            <Navbar.Content>
                <ConnectButton accountStatus={{
                    smallScreen: 'avatar',
                    largeScreen: 'full',
                }} />
            </Navbar.Content>
            <Navbar.Collapse>
                {LinkItems.map((item, index) => (
                    <Navbar.CollapseItem key={index}>
                        <Link
                            color="inherit"
                            css={{
                                minWidth: "100%",
                            }}
                            href={item.link}
                        >
                            {item.label}
                        </Link>
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppHeader