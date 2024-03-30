"use client";

import { AiOutlineUser } from "react-icons/ai";

import Image from "next/image";
import Link from "next/link";


import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export type CardListProps = {
  id: string;
  url: string;
  name: string;
  money: number;
  person: number;
};

export default function EventCard({
  id,
  url,
  name,
  money,
  person,
}: CardListProps) {

  return (
    <Link href={`/store/${id}`}>
      <Paper className="w-50 m-5 hover:cursor-pointer max-w-screen-xs">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={url}
            alt="event"
            width={300}
            height={300}
            className="p-5 "
          />
          <Typography className="break-all font-bold" variant="h4">
            {name}
          </Typography>
        </div>
        <p className="pl-6 text-xl font-bold text-dark-blue ">
          Cumulative PAW : $ {money}
        </p>
        <div className="flex flex-row items-center justify-end pb-2">
          <AiOutlineUser className="text-dark-blue" />
          <p className="p-2 font-bold text-dark-blue">{person} people</p>
        </div>
      </Paper>
    </Link>
  );
}
