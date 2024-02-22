import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

interface AboutCardProp {
  title: string;
  subTitle: string;
  description: string;
}

export function AboutCard({ title, description, subTitle }: AboutCardProp) {
  return (
    <Card shadow={false} placeholder="">
      <CardBody className="h-[453px] p-5 flex flex-col justify-center items-center rounded-2xl bg-gray-900 " placeholder="">
        <Typography variant="h6" className="mb-4 text-center" color="white" placeholder="">
          {subTitle}
        </Typography>
        <Typography variant="h4" className="text-center" color="white" placeholder="">
          {title}
        </Typography>
        <Typography
          color="white"
          className="mt-2 mb-10 text-base w-full lg:w-8/12 text-center font-normal"
          placeholder=""
        >
          {description}
        </Typography>
        <Button color="white" size="sm" placeholder="">
          view details
        </Button>
      </CardBody>
    </Card>
  );
}


export default AboutCard;
