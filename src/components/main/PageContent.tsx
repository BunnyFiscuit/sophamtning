import React, { useState } from "react";
import { GarbageContextAPI } from "../../context/GarbageContext";
import {
  calculateNextPickupDate,
  calculateDaysUntil,
  type NextPickup,
} from "../../util/pickup-calculator";
import { WelcomeView } from "./WelcomeView";
import { ScheduleCard } from "./ScheduleCard";
import { NextPickupCard } from "./NextPickupCard";

export const PageContent: React.FC = () => {
  const { data } = GarbageContextAPI.use();
  const [showSchedule, setShowSchedule] = useState(false);

  // Calculate next pickup dates for all bins
  const nextPickups: NextPickup[] = data
    ? data.schedule
        .map((entry) => {
          const nextDate = calculateNextPickupDate(entry.day, entry.frequency);
          return {
            bin: entry.bin,
            binNr: entry.binNr,
            date: nextDate,
            daysUntil: calculateDaysUntil(nextDate),
          };
        })
        .sort((a, b) => a.daysUntil - b.daysUntil)
    : [];

  const nextPickup = nextPickups[0]; // Soonest pickup

  return (
    <>
      {!data && <WelcomeView />}
      {data && (
        <div
          className="flex items-center justify-center flex-col p-2 sm:p-8 w-full"
          style={{ minHeight: "50vh" }}
        >
          <div className="text-4xl sm:text-6xl mb-4 sm:mb-12 font-bold text-center px-4 text-green-400">
            {data.address}
          </div>
          <div className="text-2xl sm:text-4xl text-center">Nästa hämtning</div>
          {nextPickup && <NextPickupCard nextPickup={nextPickup} />}
          {nextPickups[1] && (
            <NextPickupCard nextPickup={nextPickups[1]} top={false} />
          )}
          {showSchedule && <ScheduleCard nextPickups={nextPickups} />}
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className="mt-4 px-4 py-2 bg-green-700 text-white rounded"
          >
            {showSchedule ? "Dölj schema" : "Visa schema"}
          </button>
        </div>
      )}
    </>
  );
};
