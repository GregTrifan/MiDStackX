import { Navbar, Button, Link, Text } from "@nextui-org/react";
import React from 'react'
import Image from "next/image";
import { Box } from "./primitives/box";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const AppHeader = () => {
    const collapseItems = [
        "Features",
        "Customers",
        "Pricing",
        "Company",
        "Legal",
        "Team",
        "Help & Feedback",
        "Login",
        "Sign Up",
    ];

    return (
        <Navbar isBordered variant="sticky" maxWidth="fluid">
            <Navbar.Brand>
                <Navbar.Toggle aria-label="toggle navigation" />
                <Image src="/logo.png" alt="MIDSTACKX" width={200} height={25} style={{ marginLeft: "1rem" }} />
            </Navbar.Brand>
            <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
                <Navbar.Link href="#">Features</Navbar.Link>
                <Navbar.Link isActive href="#">
                    Customers
                </Navbar.Link>
                <Navbar.Link href="#">Pricing</Navbar.Link>
                <Navbar.Link href="#">Company</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <ConnectButton accountStatus={{
                    smallScreen: 'avatar',
                    largeScreen: 'full',
                }} />
            </Navbar.Content>
            <Navbar.Collapse>
                {collapseItems.map((item, index) => (
                    <Navbar.CollapseItem key={item}>
                        <Link
                            color="inherit"
                            css={{
                                minWidth: "100%",
                            }}
                            href="#"
                        >
                            {item}
                        </Link>
                    </Navbar.CollapseItem>
                ))}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default AppHeader