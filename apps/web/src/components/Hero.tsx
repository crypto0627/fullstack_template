import React from "react";
import styles from "../app/style";
import GetStarted from "./GetStarted";
import Link from "next/link";
import Image from "next/image";
export default function Hero() {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 `}
      >
        <div className="flex flex-row justify-between items-center w-full ">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Paws for Points <br className="sm:block hidden" />{" "}
          </h1>
          <div className={`ss:hidden ${styles.flexCenter} `}>
            <Link href="/map">
              <GetStarted />
            </Link>
          </div>
        </div>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Turn every step into love, letting your pets lead you to more rewards.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-1 my-10 relative`}
      >
        <Image
          src="/streamer.png"
          alt="streamer"
          className="rounded-[20px] object-contain"
          height={400}
            width={400}
        />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
      </div>
    </section>
  );
}
