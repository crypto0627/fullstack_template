"use client";
import React, { useState } from 'react'
import { close, menu } from '../app/assets'
import { navLinks } from './constants'
import Image from 'next/image'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from 'next/link';
interface navLinksTypes {
  id: string
  title: string
}
export default function Navbar() {

  const [active, setActive] = useState<string>('Home')
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <nav className='w-full flex py-6 justify-between items-center navbar bg-lightBlack'>
      <Image
        src="/pawpoint.png"
        alt="Pawpoint Logo"
        width={100}
        height={50}
        className='ml-6'
      />
      <h1 className="text-2xl text-white font-bold">Pawpoint</h1>
      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav: navLinksTypes, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-white text-[16px] ${active === nav.title ? 'text-white' : 'text-dimWhite'
              } ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}
          >
            <Link href={`${nav.id}`}>
              {nav.title}
            </Link>
          </li>
        ))}
        <li className='font-poppins font-normal cursor-pointer text-white text-[16px] ml-6 mr-6'>
          <div className="flex flex-row space-x-8">
            <ConnectButton />
          </div>
        </li>
      </ul>

      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <Image
          src={toggle ? close : menu}
          alt='menu'
          width={30}
          height={30}
          className='object-contain mr-6 cursor-pointer'
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${!toggle ? 'hidden' : 'flex'
            } p-6 bg-silver absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className='list-none flex justify-end items-start flex-1 flex-col z-50'>
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] text-midnight ${active === nav.title ? 'text-white' : 'text-dimWhite'
                  } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                onClick={() => setActive(nav.title)}
              >
                <Link href={`${nav.id}`}>
                  {nav.title}
                </Link>
              </li>
            ))}
            <li className='font-poppins font-medium cursor-pointer text-[16px] mt-5'>
                <ConnectButton  chainStatus="none" showBalance={false}/>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
