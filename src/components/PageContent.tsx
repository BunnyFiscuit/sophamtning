import React from "react";
import { GarbageContextAPI } from "../context/GarbageContext";
import { frequencyMap } from "../util/frequency-mapper";
import {
  calculateNextPickupDate,
  calculateDaysUntil,
  formatSwedishDate,
  type NextPickup,
} from "../util/pickup-calculator";
import { WelcomeView } from "./WelcomeView";

export const PageContent: React.FC = () => {
  const { data } = GarbageContextAPI.use();

  // Calculate next pickup dates for all bins
  const nextPickups: NextPickup[] = data
    ? data.schedule
        .map((entry) => {
          const nextDate = calculateNextPickupDate(entry.day, entry.frequency);
          return {
            bin: entry.bin,
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
          <div className="text-3xl sm:text-6xl mb-4 sm:mb-12 font-bold text-center px-4 text-green-400">
            {data.address}
          </div>
          <div className="text-2xl sm:text-4xl text-center">Nästa hämtning</div>
          {nextPickup && (
            <div className="text-center mt-2 px-4 mb-4">
              <div className="text-xl sm:text-2xl font-semibold">
                {nextPickup.bin}
              </div>
              <div className="text-2xl sm:text-xl text-green-300">
                {nextPickup.daysUntil === 0
                  ? "Idag"
                  : nextPickup.daysUntil === 1
                  ? "Imorgon"
                  : `Om ${nextPickup.daysUntil} dagar`}
              </div>
              <div className="text-lg sm:text-xl text-slate-400">
                {formatSwedishDate(nextPickup.date)}
              </div>
            </div>
          )}
          {/* Card */}
          <div className="w-full max-w-2xl rounded overflow-hidden shadow-lg bg-green-100 text-black p-2 sm:p-4">
            {/* Mobile: Stack cards, Desktop: Table */}
            <div className="block sm:hidden">
              {data.schedule.map((entry) => {
                const pickup = nextPickups.find((p) => p.bin === entry.bin);
                return (
                  <div
                    key={entry.binNr}
                    className="mb-4 p-3 bg-green-50 rounded border"
                  >
                    <div className="font-semibold text-lg mb-2">
                      {entry.bin}
                    </div>
                    <div className="text-sm mb-1">
                      <span className="font-medium">Schema:</span> {entry.day} (
                      {frequencyMap[entry.frequency] || "Okänd frekvens"})
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Nästa hämtning:</span>{" "}
                      {pickup
                        ? `${formatSwedishDate(pickup.date)} (${
                            pickup.daysUntil
                          } dagar)`
                        : "Beräknas..."}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop: Table */}
            <div className="hidden sm:block">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-green-200">
                    <th className="border px-4 py-2 text-left">Kärl</th>
                    <th className="border px-4 py-2 text-left">Schema</th>
                    <th className="border px-4 py-2 text-left">
                      Nästa hämtning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.schedule.map((entry) => (
                    <tr key={entry.binNr}>
                      <td className="border px-4 py-2">{entry.bin}</td>
                      <td className="border px-4 py-2">
                        {entry.day} (
                        {frequencyMap[entry.frequency] || "Okänd frekvens"})
                      </td>
                      <td className="border px-4 py-2">
                        {(() => {
                          const pickup = nextPickups.find(
                            (p) => p.bin === entry.bin
                          );
                          return pickup
                            ? `${formatSwedishDate(pickup.date)} (${
                                pickup.daysUntil
                              } dagar)`
                            : "Beräknas...";
                        })()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
