import React from "react";
import Link from "next/link";
import styles from "../app/style";
export default function CTA() {
  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
      <div className='flex-1 flex flex-col'>
        <h2 className={styles.heading2}>Let’s try our service now!</h2>
      </div>

      <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
        <Link href="/map">
        <button
            type="button"
            className="py-4 px-6 font-poppins font-medium text-[18px] bg-white text-primary rounded-[10px] outline-none"
        >
            Get Started
        </button>
        </Link>
      </div>
    </section>
    
  );
}
