pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StackXOwner is ERC721, ERC721Enumerable {
    using Counters for Counters.Counter;
    using SafeMath for uint256;

    mapping(address => uint256) private _creatorPrices;

    Counters.Counter private _tokenIds;
    mapping(uint256 => address) private _tokenAddresses;

    constructor() ERC721("StackXOwner", "STXO") {}

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _setTokenAddress(
        uint256 tokenId,
        address creatorAddress
    ) internal {
        require(_exists(tokenId), "StackXOwner: token does not exist");
        _tokenAddresses[tokenId] = creatorAddress;
    }

    function getTokenAddress(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "MyToken: token does not exist");
        return _tokenAddresses[tokenId];
    }

    function mint(address creatorAddress) public payable {
        uint256 price = _creatorPrices[creatorAddress];
        require(msg.value >= price, "Insufficient payment");
        _tokenIds.increment();
        _safeMint(msg.sender, _tokenIds.current());
        _setTokenAddress(_tokenIds.current(), creatorAddress);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function setCreatorPrice(uint256 price) public {
        _creatorPrices[msg.sender] = price;
    }

    function getCreatorPrice(
        address creatorAddress
    ) public view returns (uint256) {
        return _creatorPrices[creatorAddress];
    }

    function getOwnedCreators() public view returns (address[] memory) {
        uint256 balance = balanceOf(msg.sender);
        address[] memory result = new address[](balance);
        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
            result[i] = getTokenAddress(tokenId);
        }
        return result;
    }

    receive() external payable {}
}
