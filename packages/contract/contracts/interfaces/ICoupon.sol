// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import { ICouponEvent } from "./events/ICouponEvent.sol";

interface ICoupon is ICouponEvent {
    /*//////////////////////////////////////////////////////////////////////////
                        EXTERNAL NON-CONSTANT FUNCTIONS
    //////////////////////////////////////////////////////////////////////////*/
    function issuerWithdraw() external;
}
