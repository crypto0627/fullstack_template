import React from "react";
import Image from "next/image";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
} from "@material-tailwind/react";


interface BlogPostCardProps {
  img: string;
  tag: string;
  title: string;
  desc: string;
  author: { name: string; img: string };
  date: string;
}

export function BlogPostCard({
  img,
  tag,
  title,
  desc,
  author,
  date,
}: BlogPostCardProps) {
  return (
    <Card shadow={true} placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
      <CardHeader placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full scale-110 object-cover"
        />
      </CardHeader>
      <CardBody className="p-6" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
        <Typography variant="small" color="blue" className="mb-2 !font-medium" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
          {tag}
        </Typography>
        <Typography
          as="a"
          href="#"
          variant="h5"
          color="blue-gray"
          className="mb-2 normal-case transition-colors hover:text-gray-900"
          placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}
        >
          {title}
        </Typography>
        <Typography className="mb-6 font-normal !text-gray-500" placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
          {desc}
        </Typography>
        <div className="flex items-center gap-4">
          <Avatar
            size="sm"
            variant="circular"
            src={author.img}
            alt={author.name}
            placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}
          />
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-0.5 !font-medium"
              placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}
            >
              {author.name}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs !text-gray-500 font-normal"
              placeholder="" onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}
            >
              {date}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}


export default BlogPostCard;