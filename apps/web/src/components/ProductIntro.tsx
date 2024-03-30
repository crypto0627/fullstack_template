"use client";

// ProductPage.tsx
import React, { useState, useEffect } from "react";

import Image from "next/image";

import { Divider } from "@mui/material";

import type { nft } from "@/lib/types/db";

function ProductIntro({ nfts = [] }: { nfts: nft[] }) {
  const [selectedProduct, setSelectedProduct] = useState<nft | null>(
    nfts[0] || null,
  );

  useEffect(() => {
    setSelectedProduct(nfts[0] || null);
  }, [nfts]);

  const handleSelectProduct = (product: nft) => {
    setSelectedProduct(product);
  };

  return (
    <div className="pb-12">
      <div className="flex flex-row justify-start space-x-8 pb-2">
        {nfts.map((product) => (
          <button
            key={product.displayId}
            onClick={() => handleSelectProduct(product)}
            className={`pl-2 text-3xl ${
              selectedProduct && selectedProduct.displayId === product.displayId
                ? "font-bold text-white"
                : ""
            } hover:text-light-blue`}
          >
            {product.name}
          </button>
        ))}
      </div>
      <Divider
        variant="middle"
        orientation="horizontal"
        sx={{ borderWidth: 1 }}
      />
      <div>
        {selectedProduct ? (
          <div className="pl-2">
            <p className="flex justify-start p-2 text-2xl font-bold">
              price : $ {selectedProduct.price}
            </p>
            <Image
              src={selectedProduct.imageSrc.replace(
                "ipfs://",
                "https://cloudflare-ipfs.com/ipfs/",
              )}
              alt="product"
              width={200}
              height={200}
            />
            <p className="break-all p-2 text-xl">
              remain : {selectedProduct.totalAmount - selectedProduct.nowAmount}
            </p>
            <p className="break-all p-2 text-xl">
              {selectedProduct.description}
            </p>
          </div>
        ) : (
          <p className="p-2 text-xl">No products.</p>
        )}
      </div>
    </div>
  );
}

export default ProductIntro;
