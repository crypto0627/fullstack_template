// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { ICouponFactoryEvent } from "./events/ICouponFactoryEvent.sol";
interface ICouponFactory is ICouponFactoryEvent {
    struct Place{
        // decimal 8
        uint256 Latitude;
        uint256 Longitude;
    }
    /*//////////////////////////////////////////////////////////////////////////
                        EXTERNAL NON-CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function register(uint256 months_) external;

    function createCoupon(string memory _name, uint256 latitude_, uint256 longitude_) external returns (address Coupon_);

    function setProtocolFeeRate(uint256 protocolFeeRate_) external;

    function mintDonateNFT(string memory _name, uint256 _tokenId, uint256 _amount) external;

    function addNewERC1155(string memory _ERC1155name, uint256 _mintPrice,uint256 _totalSupplys, string memory _name, string memory _metadataURI) external;

    /*//////////////////////////////////////////////////////////////////////////
                        EXTERNAL CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    function protocolFeeRate() external view returns (uint256 protocolFeeRate_);
}
