export default async function validateContestTimes(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string
): Promise<string | null> {
  const start = new Date(`${startDate}T${startTime}`);
  const end = new Date(`${endDate}T${endTime}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid date or time format.";
  }

  if (start >= end) {
    return "Start time must be before end time.";
  }

  return null; // No errors
}
