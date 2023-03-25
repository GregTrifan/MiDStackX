import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import React, { useState } from 'react'

const GetNftModal = ({
    address,
    viewable,
    setViewable
}: {
    address: string,
    viewable: boolean,
    setViewable: (arg: boolean) => any
}) => {
    const mintNft = async () => {
        setViewable(true)
    }
    return (
        <Modal

            aria-labelledby="modal-title"
            open={!viewable}
        >
            <Modal.Header css={{ mt: "$10" }}>
                <Text id="modal-title" size={18}>
                    NFT Required for viewing content
                </Text>
            </Modal.Header>
            <Modal.Body css={{ my: "$5" }}>
                <Button auto onPress={mintNft}>
                    Mint NFT
                </Button>
            </Modal.Body>
        </Modal>
    )
}

export default GetNftModal