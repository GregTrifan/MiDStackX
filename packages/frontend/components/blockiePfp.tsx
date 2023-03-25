import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import { Image } from "@nextui-org/react";

const BlockiePfp = ({ address, size }: { address: string, size?: number }) => (
    <Image src={makeBlockie(address)} alt="" maxDelay={10000} showSkeleton height={size ?? 100} width={size ?? 100} />
)

export default BlockiePfp;