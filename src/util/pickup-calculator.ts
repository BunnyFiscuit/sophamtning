/**
 * Utility functions for calculating next garbage pickup dates
 */

export interface NextPickup {
  bin: string;
  date: Date;
  daysUntil: number;
}

/**
 * Get the current week number (ISO week)
 */
export function getCurrentWeekNumber(date: Date = new Date()): number {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

/**
 * Convert Swedish day names to day numbers (0 = Sunday, 1 = Monday, etc.)
 */
export function dayNameToNumber(dayName: string): number {
  const dayMap: Record<string, number> = {
    Söndag: 0,
    Måndag: 1,
    Tisdag: 2,
    Onsdag: 3,
    Torsdag: 4,
    Fredag: 5,
    Lördag: 6,
  };
  return dayMap[dayName] ?? -1;
}

/**
 * Check if a week number matches the frequency pattern
 * Using week 15 as the reference start week
 */
export function weekMatchesFrequency(
  weekNumber: number,
  frequency: string
): boolean {
  const startWeek = 15;
  const weeksSinceStart = weekNumber - startWeek;

  switch (frequency) {
    case "odd_weeks":
      // Check if the weeks since start week is even (meaning odd pattern from start)
      return weeksSinceStart % 2 === 0;
    case "even_weeks":
      // Check if the weeks since start week is odd (meaning even pattern from start)
      return weeksSinceStart % 2 === 1;
    case "every_4th_week":
      return weeksSinceStart % 4 === 0;
    default:
      return false;
  }
}

/**
 * Calculate the next pickup date for a specific bin
 */
export function calculateNextPickupDate(
  day: string,
  frequency: string,
  fromDate: Date = new Date()
): Date {
  const targetDayNumber = dayNameToNumber(day);
  if (targetDayNumber === -1) {
    throw new Error(`Invalid day name: ${day}`);
  }

  const currentDate = new Date(fromDate);
  currentDate.setHours(0, 0, 0, 0);

  // Look ahead up to 8 weeks to find the next valid pickup
  for (let daysAhead = 0; daysAhead <= 56; daysAhead++) {
    const checkDate = new Date(currentDate);
    checkDate.setDate(currentDate.getDate() + daysAhead);

    // Check if this is the correct day of week
    if (checkDate.getDay() === targetDayNumber) {
      const weekNumber = getCurrentWeekNumber(checkDate);

      // Check if this week matches the frequency
      if (weekMatchesFrequency(weekNumber, frequency)) {
        // Don't return today's date if it's already passed (assume pickup is in the morning)
        if (daysAhead > 0 || checkDate.getTime() > fromDate.getTime()) {
          return checkDate;
        }
      }
    }
  }

  // Fallback - shouldn't happen with valid data
  throw new Error(
    `Could not calculate next pickup for ${day} with frequency ${frequency}`
  );
}

/**
 * Calculate days until a future date
 */
export function calculateDaysUntil(
  targetDate: Date,
  fromDate: Date = new Date()
): number {
  const diffTime = targetDate.getTime() - fromDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Format a date in Swedish format
 */
export function formatSwedishDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("sv-SE", options);
}
