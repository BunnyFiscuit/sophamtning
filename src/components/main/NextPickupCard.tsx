import {
  formatSwedishDate,
  type NextPickup,
} from "../../util/pickup-calculator";

interface NextPickupCardProps {
  nextPickup: NextPickup;
  top?: boolean; // Optional prop for top card styling
}

export const NextPickupCard: React.FC<NextPickupCardProps> = ({
  nextPickup,
  top = true,
}) => {
  return (
    <div
      className={
        "w-full text-center mt-2 px-4 mb-4 " +
        (top ? "border rounded-lg p-6 shadow-lg bg-zinc-900" : "")
      }
    >
      <div
        className={
          "font-semibold" + (top ? " text-2xl sm:text-3xl" : " text-xl")
        }
      >
        {nextPickup.bin} {nextPickup.binNr ? `(kärl ${nextPickup.binNr})` : ""}
      </div>
      <div
        className={
          "mt-2 mb-1 " +
          (nextPickup.daysUntil === 0
            ? "text-green-300 font-semibold"
            : "text-yellow-200") +
          (top ? " sm:text-3xl" : " sm:text-xl")
        }
      >
        {nextPickup.daysUntil === 0
          ? "Idag"
          : nextPickup.daysUntil === 1
          ? "Imorgon"
          : `Om ${nextPickup.daysUntil} dagar`}
      </div>
      <div
        className={"text-slate-400" + (top ? " sm:text-2xl" : " sm:text-lg")}
      >
        {formatSwedishDate(nextPickup.date)}
      </div>
    </div>
  );
};
