import { mintPass } from "@/utils/contracts/contractCalls";
import { Modal, Button, Text, Loading } from "@nextui-org/react";
import React, { useState } from 'react'
import { useSigner } from "wagmi";

const GetNftModal = ({
    address,
    viewable,
    setViewable
}: {
    address: string,
    viewable: boolean,
    setViewable: (arg: boolean) => any
}) => {
    const { data: signer } = useSigner()
    const [loading, setLoading] = useState<boolean>(false);
    const mintNft = async () => {
        setLoading(true);
        try {

            await mintPass(signer!, address)
            setViewable(true)
        }
        catch {
            setViewable(false)
        }
        setLoading(false);
    }
    return (
        <Modal
            closeButton={false}
            preventClose
            aria-labelledby="modal-title"
            open={!viewable}
        >
            <Modal.Header css={{ mt: "$10" }}>
                <Text id="modal-title" size={18}>
                    Creator Pass Required for viewing content
                </Text>
            </Modal.Header>
            <Modal.Body css={{ my: "$5" }}>
                {!loading ? (<Button auto onPress={mintNft}>
                    Mint NFT
                </Button>) : (<Loading color="primary" textColor="primary">
                    Approve Txn...
                </Loading>)}
            </Modal.Body>
        </Modal>
    )
}

export default GetNftModal