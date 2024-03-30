// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface ICouponFactoryEvent {
    event CouponExtended(address issuer_, uint256 expiredTime_);

    event CouponCreated(address issuer_, address coupon_, string name_, uint256 latitude_, uint256 longitude_);

    event ProtocolFeeRateSet(uint256 protocolFeeRate_);

    event ProtocolWithdrawn(address   to_, uint256 amount_);

    event ERC1155Minted(address to_, string ERC1155name_, uint256 amount_, uint256 tokenId_);

    event ERC1155BatchMinted(address to_, string ERC1155name_, uint256[] amounts_, uint256[] tokenId_);

    event ERC1155AddNewNFT(string ERC1155name_, uint256   mintPrice_,uint256 totalSupplys_ , string name_, string metadataURI_, uint256 tokenId_);
}