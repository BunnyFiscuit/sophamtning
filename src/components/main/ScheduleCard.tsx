import { GarbageContextAPI } from "../../context/GarbageContext";
import { frequencyMap } from "../../util/frequency-mapper";
import {
  formatSwedishDate,
  type NextPickup,
} from "../../util/pickup-calculator";

interface ScheduleCardProps {
  nextPickups: NextPickup[];
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ nextPickups }) => {
  const { data } = GarbageContextAPI.use();
  return (
    <>
      {data && (
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
                  <div className="font-semibold text-lg mb-2">{entry.bin}</div>
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
                  <th className="border px-4 py-2 text-left">Nästa hämtning</th>
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
          <p className="mt-4">Undantag finns inte med i denna schema.</p>
        </div>
      )}
    </>
  );
};
