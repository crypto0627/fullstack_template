// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { UD60x18, ud } from "@prb/math/src/UD60x18.sol";

import { ICouponFactory } from "./interfaces/ICouponFactory.sol";
import { ICoupon } from "./interfaces/ICoupon.sol";

/// @title Coupon
/// @dev Contract for creating and managing Coupons
contract Coupon is ERC1155, ICoupon {
    IERC20 public fundAsset;
    address public issuer;
    uint256 public totalDeposit;
    struct NFT {
        uint256 mintPrice;
        uint256 totalSupplys;
        uint256 totalMinted;
        string name;
        string metadataURI;
    }

    NFT[] public nfts;

    mapping(address => uint256) public userDepositAmounts;

    mapping(string => uint256) public nameToId;

    ICouponFactory private _CouponFactory;

    /// @dev Modifier to check if the message sender is the issuer
    modifier onlyIssuer() {
        require(msg.sender == issuer, "only issuer");
        _;
    }

    modifier onlyCouponFactory() {
        require(msg.sender == address(_CouponFactory), "only CouponFactory");
        _;
    }

    /// @dev Constructor to initialize the Coupon contract
    /// @param CouponFactory_ Address of the Coupon factory
    /// @param _fundAsset Address of the fund
    /// @param _issuer Address of the issuer
    constructor(address CouponFactory_, address _fundAsset, address _issuer) ERC1155("") {
        require(_fundAsset != address(0), "fund is 0x00");
        require(_issuer != address(0), "issuer is 0x00");

        _CouponFactory = ICouponFactory(CouponFactory_);
        fundAsset = IERC20(_fundAsset);
        issuer = _issuer;
    }

    /*//////////////////////////////////////////////////////////////////////////
                        EXTERNAL NON-CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/

    /// @dev Add new NFT to the Coupon
    /// @param _minter Address of the minter
    /// @param _mintPrice Price to mint the NFT
    /// @param _totalSupplys Total supply of the NFT
    /// @param _name Name of the NFT
    /// @param _metadataURI URI of the NFT metadata
    /// @return id ID of the NFT
    function addNewNFT(address _minter ,uint256 _mintPrice,uint256 _totalSupplys, string memory _name, string memory _metadataURI) public onlyCouponFactory returns (uint256 id){
        require(_minter == issuer, "only issuer");
        NFT memory newNFT;
        newNFT = NFT({
                mintPrice: _mintPrice,
                totalSupplys: _totalSupplys,
                totalMinted: 0,
                name: _name,
                metadataURI: _metadataURI
            });
        nfts.push(newNFT);
        id = nfts.length - 1;
        nameToId[_name] = id;
    }

    /// @dev mint NFTs to the specified address.
    /// @param to_ the address to mint NFTs to.
    /// @param id_ the id of the NFT to mint.
    /// @param amount_ the amount of NFTs to mint.
    /// @return true if the minting was successful.
    function mint(address to_, uint256 id_, uint256 amount_) external returns (bool) {
        require(to_ != address(0), "to is 0x00");
        require(amount_ > 0, "amount must > zero");
        require(nfts[id_].totalMinted + amount_ <= nfts[id_].totalSupplys, "exceed total supply");  

        uint256 transferAmount = nfts[id_].mintPrice * amount_;

        require(
            fundAsset.transferFrom(to_, address(this), transferAmount), "transfer fund failed"
        );

        _mint(to_, id_, amount_, "");
        // emit Mint(to_, id_, amount_);

        userDepositAmounts[to_] += transferAmount;
        nfts[id_].totalMinted += amount_;
        totalDeposit += transferAmount;

        return true;
    }

    /// @dev withdraw the fund from the Coupon if the Coupon is closed and the target is reached.
    /// @notice this function can only be called by the issuer.
    function issuerWithdraw() external override onlyIssuer {
        uint256 protocolFeeRate = _CouponFactory.protocolFeeRate();
        uint256 withdrawAmount = fundAsset.balanceOf(address(this));

        uint256 protocolFee = withdrawAmount * protocolFeeRate / 1e18;
        withdrawAmount -= protocolFee;

        require(withdrawAmount > 0, "no fund");
        require(fundAsset.transfer(issuer, withdrawAmount), "transfer fund failed");

        if (protocolFee > 0) {
            require(fundAsset.transfer(address(_CouponFactory), protocolFee), "transfer fee failed");
        }

        emit IssuerWithdrawal(issuer, withdrawAmount);
    }

    /*//////////////////////////////////////////////////////////////////////////
                        EXTERNAL CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function uri(uint256 id_) public view override returns (string memory uri_) {
        return nfts[id_].metadataURI;
    }
}
