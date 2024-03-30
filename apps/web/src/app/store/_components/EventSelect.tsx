"use client";

import * as React from "react";

import { Box, Grid } from "@mui/material";

import type { allEventDto } from "@/lib/types/db";

import EventCard from "./EventCard";



function EventGrid({ events }: { events: allEventDto[] }) {
  return (
    <Grid container spacing={3} direction="row" justifyContent="flex-start">
      {events &&
        events.map((e) => {
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              className="item-grid"
              key={e.displayId}
            >
              <EventCard
                id={e.displayId}
                url={e.imageSrc}
                name={e.title}
                money={e.currentValue}
                person={e.transactionCount}
              />
            </Grid>
          );
        })}
    </Grid>
  );
}

export default function EventSelect({ events }: { events: allEventDto[] }) {


  return (
    <Box sx={{ width: "100%" }}>
        <EventGrid events={events} />
    </Box>
  );
}
