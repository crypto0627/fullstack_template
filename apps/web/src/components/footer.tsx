/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import styles from "../app/style";
import { socialMedia } from "./constants";

interface socialMediaTypes {
  id: string;
  icon: any;
  link: string;
}
console.log(socialMedia);
export default function Footer() {
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
      <div className={`${styles.flexCenter} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex flex-col justify-start mr-10 items-center">
          <Image src="/pawpoint.png" alt="logo" width={200} height={50} />
          <p className={`${styles.paragraph} mt-4`}>
            A new way to make the experience of dog-walking easy, enjoyable, and safe.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-poppins font-normal text-center text-[18px] leading-[27px] text-white">
          Copyright Ⓒ 2024 Pawpoint. All Rights Reserved.
        </p>

        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((social: socialMediaTypes, index) => (
            <Image
              key={social.id}
              src={social.icon}
              alt={social.id}
              width={21}
              height={21}
              className={`object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
              onClick={() => window.open(social.link)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
