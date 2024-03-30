"use client";

import Image from "next/image";
import ProductIntro from "../../../components/ProductIntro";
import Divider from "@mui/material/Divider";

function EventsIdPage() {
  const dbEvent = {
    id: 1,
    displayId: "21",
    description: "test",
    title: "Awesome Doge",
    startDate: 1632921600000,
    endDate: 1632921600000,
    targetValue: 100,
    currentValue: 2000,
    nfts: [
      {
        id: 1,
        displayId: "1",
        name: "test",
        totalAmount: 100,
        nowAmount: 20,
        price: 100,
        description: "test",
        imageSrc: "https://ipfs.io/ipfs/QmYpqWt83WEuvuEwGM3Hn3UYtCiuxy4Fw8CphsV1m9XPmJ",
      },
    ],
    eventAddress: "0x123",
  };

  function formatTimestamp(timestamp: number) {
    const date = new Date(Number(timestamp));
    return date.toLocaleDateString();
  }

  if (!dbEvent) {
    return <div>loading...</div>;
  }
  const closed = dbEvent.endDate < new Date().getTime();


  return (
    <div className="flex min-h-screen flex-col items-center text-dimWhite">
      <div className="flex flex-row justify-center">
        <div className="pr-24">
          <Image
            src="/events.jpeg"
            alt="event"
            width={400}
            height={400}
            className="p-5 "
          />
        </div>
        {!closed ? (
          <div className="flex flex-col justify-center">
            <p className="p-4 text-6xl font-bold">{dbEvent?.title}</p>
            <div className="flex flex-row items-center p-4">
              <div className="pl-8">
                <p className="text-md pb-2">{`Target Amount: PAW $ ${dbEvent?.targetValue}`}</p>
                <p className="pt-2 text-xl font-bold">{`Current Amount: PAW $ ${dbEvent?.currentValue}`}</p>
              </div>
            </div>
            <p className="text-md p-2">
              {`duration: ${formatTimestamp(
                dbEvent.startDate,
              )} – ${formatTimestamp(dbEvent.endDate)}`}
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <p className="p-4 text-6xl font-bold">{dbEvent?.title}</p>
            <p className="p-2 text-xl font-bold">{`Total Vault : PAW $ ${dbEvent?.currentValue}`}</p>
          </div>
        )}
      </div>
      <div className="flex w-[50%] flex-col justify-start p-8">
        <p className="flex justify-start p-2 text-4xl font-bold">Description</p>
        <Divider
          variant="middle"
          orientation="horizontal"
          sx={{ borderWidth: 1 }}
        />
        <p className="break-all p-2 text-xl">{dbEvent.description}</p>
      </div>
      <div className="justify-cent flex w-[50%] flex-col p-10">
        <ProductIntro nfts={dbEvent.nfts} />
      </div>
    </div>
  );
}

export default EventsIdPage;
