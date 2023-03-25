const ethAddressRegex = /^(0x)?[0-9a-fA-F]{40}$/;

export const isEthAddressValid = (address: string) => {
	return ethAddressRegex.test(address);
};
