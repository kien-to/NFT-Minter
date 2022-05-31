pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFTMint is ERC721,ERC721Enumerable {

    string[] public nfts;

    mapping(string => bool) _nftExists;

    constructor() ERC721("NFTMint", "MNFT"){
    }

    function mint(string memory nft) public {
        require(!_nftExists[nft]);
        nfts.push(nft);
        uint _id = nfts.length - 1;
        _mint(msg.sender, _id);
        _nftExists[nft] = true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}