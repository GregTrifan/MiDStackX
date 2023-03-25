import { Signer, ethers } from "ethers";
import contractDeployments from "./hardhat_contracts.json";
import toast from "react-hot-toast";

async function getContract(signer: Signer) {
	const networkId = await signer.getChainId();
	if (networkId === 31337 || networkId === 997) {
		const contractAddress =
			contractDeployments[networkId][0].contracts.StackXOwner.address;
		const contractAbi =
			contractDeployments[networkId][0].contracts.StackXOwner.abi;
		return new ethers.Contract(contractAddress, contractAbi, signer);
	}
	return null;
}

export async function mintPass(
	signer: Signer,
	creatorAddress: string
): Promise<any> {
	const contract = await getContract(signer);
	if (contract !== null) {
		try {
			const creatorPrice = await contract.getCreatorPrice(creatorAddress);
			const tx = await contract.mint(creatorAddress, {
				value: creatorPrice,
				gasLimit: 5000000,
			});
			await tx.wait();
		} catch (e) {
			console.log(e);
			toast.error("Failed contract call");
			throw Error();
		}
	} else {
		toast.error("Change to an compatible network");
		throw Error();
	}
}
export async function checkOwnership(signer: Signer, creatorAddress: string) {
	const contract = await getContract(signer);
	if (contract !== null) {
		try {
			const ownedCreators: string[] = await contract.getOwnedCreators();
			if (ownedCreators.includes(creatorAddress)) return true;
			return false;
		} catch {
			toast.error("Failed contract call");
			throw Error();
		}
	} else {
		toast.error("Change to an compatible network");
		throw Error();
	}
}
export async function getOwnedCreators(signer: Signer) {
	const contract = await getContract(signer);
	if (contract !== null) {
		try {
			const ownedCreators: string[] = await contract.getOwnedCreators();
			return ownedCreators;
		} catch {
			toast.error("Failed contract call");
			throw Error();
		}
	} else {
		toast.error("Change to an compatible network");
		throw Error();
	}
}
