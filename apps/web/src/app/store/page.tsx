"use client";

// import { useEffect, useState } from "react";

// import type { allEventDto } from "@/lib/types/db";

import EventSelect from "./_components/EventSelect";

function EventsPage() {
  // const [dbEvents, setDbEvents] = useState<allEventDto[]>([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("/api/events");
  //     const data = await response.json();
  //     setDbEvents(data);
  //   };
  //   fetchData();
  // }, []);
  const dbEvents = [
      {
        id: 1,
        displayId: "21",
        description: "test",
        title: "Awesome Doge",
        startDate: 1632921600000,
        endDate: 1632921600000,
        targetValue: 100,
        currentValue: 2000,
        imageSrc: "https://ipfs.io/ipfs/QmYpqWt83WEuvuEwGM3Hn3UYtCiuxy4Fw8CphsV1m9XPmJ", 
        transactionCount: 0,
        status: "pending",
      },
      {
        id: 2,
        displayId: "22",
        description: "test",
        title: "test Doggy",
        startDate: 1632921600000,
        endDate: 1632921600000,
        targetValue: 100,
        currentValue: 200,
        imageSrc: "https://ipfs.io/ipfs/QmYpqWt83WEuvuEwGM3Hn3UYtCiuxy4Fw8CphsV1m9XPmJ",
        transactionCount: 0,
        status: "pending",
      },
      {
        id: 3,
        displayId: "23",
        description: "test",
        title: "Amidoggy test",
        startDate: 1632921600000,
        endDate: 1632921600000,
        targetValue: 100,
        currentValue: 20000,
        imageSrc: "https://ipfs.io/ipfs/QmYpqWt83WEuvuEwGM3Hn3UYtCiuxy4Fw8CphsV1m9XPmJ",
        transactionCount: 0,
        status: "pending",
      }
    ];
  return (
    <main className="flex bg-dark-gray min-h-screen flex-col items-center ">
      <div className="w-[100%]">
        <EventSelect events={dbEvents} />
      </div>
    </main>
  );
}

export default EventsPage;
