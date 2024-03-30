import React from "react";

import { features } from "@/components/constants";
import styles, { layout } from "../app/style";
import Link from "next/link";
import Image from "next/image";
interface featureTypes {
  index: number;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  content: string;
}
export function FeatureCard(props: featureTypes) {
  return (
    <div
      className={`flex flex-row p-6 rounded-[20px] ${
        props.index !== features.length - 1 ? "mb-6" : "mb-0"
      } feature-card`}
    >
      <div
        className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
      >
        <Image
          src={props.icon}
          alt="star"
          width={32}
          height={32}
          objectFit="contain"
        />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
          {props.title}
        </h4>
        <p className="font-poppins font-normal text-white text-[16px] leading-[24px]">
          {props.content}
        </p>
      </div>
    </div>
  );
}

export default function Business() {
  return (
    <section id="features" className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>
            Redefining the Dog-Walking Experience
        </h2>

        <Link href="/map">
          <button
            type="button"
            className="py-4 px-6 font-poppins font-medium text-[18px] bg-white text-primary rounded-[10px] outline-none"
          >
            Get Started
          </button>
        </Link>
      </div>

      <div className={`${layout.sectionImg} flex-col items-left`}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}
