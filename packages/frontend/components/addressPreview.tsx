import React from 'react'
import { Box } from './primitives/box';
import { Button, Text } from '@nextui-org/react';
import { BiCopyAlt } from "react-icons/bi"
import toast from 'react-hot-toast';
const AddressPreview = ({ address, showClipboard = true }: { address: string, showClipboard?: boolean }) => {
    const shortenedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    function copyToClipboard() {
        navigator.clipboard.writeText(address);
        toast.success('Successfully toasted!')
    }

    return (
        <Box css={{ display: "flex", justifyContent: "center" }}>
            <Text size="$xl">{shortenedAddress}</Text>
            {showClipboard && (<Box onClick={() => copyToClipboard()} css={{ mt: "auto", mx: "$2", color: "$code" }}>
                <BiCopyAlt size={20} />
            </Box>)}
        </Box>
    )
}

export default AddressPreview