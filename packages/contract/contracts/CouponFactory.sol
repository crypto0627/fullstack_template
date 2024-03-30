// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { Coupon } from "./Coupon.sol";
import { ICouponFactory } from "./interfaces/ICouponFactory.sol";

/// @title CouponFactory
/// @dev Contract for creating and managing Coupons
contract CouponFactory is ICouponFactory, Ownable {
    uint256 public protocolFeeRate = 0.2e18; // 20%
    address fundAsset;
    mapping (string => address) nameToAddress;
    mapping (address => string) addressToName;
    mapping(string => Place) public place;
    mapping (address => uint256) public expiredTime;

    constructor(
        address _fundAsset
    ) Ownable(msg.sender){
        fundAsset = _fundAsset;
    }

    /// @dev Add funds to expand the expiration time
    /// @param months_ Number of months to extend the expiration time
    function register(uint256 months_) external override onlyOwner {
        uint256 amount = calculateRegisterFee(months_);
        IERC20(fundAsset).transferFrom(msg.sender, address(this), amount);
        if (expiredTime[msg.sender] < block.timestamp){
            expiredTime[msg.sender] = block.timestamp;
        }
        expiredTime[msg.sender] += months_ * 30 days;
        emit CouponExtended(msg.sender, expiredTime[msg.sender]);
    }

    /// @dev Calculate the fee for adding funds
    /// @param _month Number of months to extend the expiration time
    /// @return fee_ Fee for adding funds
    function calculateRegisterFee(uint256 _month) public pure returns (uint256) {
        if (_month < 5) {
            if (_month < 3) {
                return _month * 2500;
            }
            return _month * 2000;
        }
        uint256 totalAmount = (_month / 5)*2000;
        if (_month % 5 != 0) {
            _month = _month % 5;
            totalAmount += (_month / 3)*2500;
            if (_month % 3 != 0) {
                totalAmount += (_month % 3)*3000;
            }
        }
        return totalAmount;
    }

    /// @dev Withdraws the entire balance of the specified fund asset to the owner
    function withdraw() external onlyOwner {
        uint256 balance = IERC20(fundAsset).balanceOf(address(this));
        IERC20(fundAsset).transfer(msg.sender, balance);
        emit ProtocolWithdrawn(msg.sender, balance);
    }

    /// @dev Sets the protocol fee rate
    /// @param protocolFeeRate_ New protocol fee rate
    function setProtocolFeeRate(uint256 protocolFeeRate_) external onlyOwner {
        require(protocolFeeRate_ <= 1e18, "CouponFactory: must <= 100%");
        require(protocolFeeRate_ >= 0, "CouponFactory: must >= 0%");
        protocolFeeRate = protocolFeeRate_;
        emit ProtocolFeeRateSet(protocolFeeRate_);
    }
    /// @dev Mint ERC1155 token by Factory
    /// @param _name Name of the Coupon
    /// @param _tokenId Token ID
    /// @param _amount Amount of token
    function mintDonateNFT(string memory _name, uint256 _tokenId, uint256 _amount) external noExpired(msg.sender){
        Coupon(nameToAddress[_name]).mint(msg.sender, _tokenId, _amount);
        emit ERC1155Minted(msg.sender, _name, _amount, _tokenId);
    }

    function addNewERC1155(string memory _ERC1155name, uint256 _mintPrice,uint256 _totalSupplys, string memory _name, string memory _metadataURI) external override noExpired(msg.sender){
        uint256 id = Coupon(nameToAddress[_ERC1155name]).addNewNFT(msg.sender,_mintPrice, _totalSupplys, _name, _metadataURI);
        emit ERC1155AddNewNFT(_ERC1155name, _mintPrice, _totalSupplys, _name, _metadataURI, id);
    }

    /*//////////////////////////////////////////////////////////////////////////
                        EXTERNAL NON-CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev Creates a new Coupon with the provided configurations
    /// @param name Name of the Coupon
    /// @return coupon_ Address of the created Coupon
    function createCoupon(string memory name, uint256 lat, uint256 long) external override noExpired(msg.sender) returns (address coupon_) {
        require(nameToAddress[name] == address(0), "Coupon name already exists");
        require(bytes(addressToName[msg.sender]).length == 0, "Issuer already has a Coupon");
        Coupon coupon = new Coupon(address(this), fundAsset, msg.sender);
        nameToAddress[name] = address(coupon);
        place[name] = Place(lat, long);
        emit CouponCreated(msg.sender, address(coupon), name, lat, long);
        return (address(coupon));
    }
    modifier noExpired(address _address) {
        require(expiredTime[_address] > block.timestamp, "CouponFactory: expired");
        _;
    }
}