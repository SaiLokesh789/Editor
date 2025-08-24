import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ContestDetails = {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  createdBy: string;
  createdByName: string;
  description: string;
  prizes: string;
  rules: string;
  scoring: string;
  createdAt: Date;
  updatedAt: Date;
};

function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().slice(0, 10);
}

function formatTime(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toTimeString().slice(0, 5);
}

export default function ContestDetailsOverviewEditForm({
  contestDetails,
}: {
  contestDetails: ContestDetails;
}) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Contest Details</h2>
      <form className="flex flex-col gap-6">
        {/* Name */}
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contest Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter contest name"
            required
            defaultValue={contestDetails.name}
            className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition"
          />
        </div>
        {/* Start Time */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date
            </Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              required
              defaultValue={formatDate(contestDetails.startTime)}
              className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition"
            />
          </div>
          <div className="flex-1">
            <Label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Time
            </Label>
            <Input
              id="startTime"
              name="startTime"
              type="time"
              required
              defaultValue={formatTime(contestDetails.startTime)}
              className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition"
            />
          </div>
        </div>
        {/* End Time */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date
            </Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              required
              defaultValue={formatDate(contestDetails.endTime)}
              className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition"
            />
          </div>
          <div className="flex-1">
            <Label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Time
            </Label>
            <Input
              id="endTime"
              name="endTime"
              type="time"
              required
              defaultValue={formatTime(contestDetails.endTime)}
              className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition"
            />
          </div>
        </div>
        <hr />
        {/* Description */}
        <div className="flex items-start gap-4">
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1 min-w-[120px] pt-2"
          >
            Description
          </Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Enter contest description"
            required
            defaultValue={contestDetails.description || ""}
            className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition min-h-[120px]"
          />
        </div>
        {/* Prizes */}
        <div className="flex items-start gap-4">
          <Label
            htmlFor="prizes"
            className="block text-sm font-medium text-gray-700 mb-1 min-w-[120px] pt-2"
          >
            Prizes
          </Label>
          <Textarea
            id="prizes"
            name="prizes"
            placeholder="Enter contest prizes"
            defaultValue={contestDetails.prizes || ""}
            className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition min-h-[120px]"
          />
        </div>
        {/* Rules */}
        <div className="flex items-start gap-4">
          <Label
            htmlFor="rules"
            className="block text-sm font-medium text-gray-700 mb-1 min-w-[120px] pt-2"
          >
            Rules
          </Label>
          <Textarea
            id="rules"
            name="rules"
            placeholder="Enter contest rules"
            defaultValue={contestDetails.rules || ""}
            className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition min-h-[120px]"
          />
        </div>
        {/* Scoring */}
        <div className="flex items-start gap-4">
          <Label
            htmlFor="scoring"
            className="block text-sm font-medium text-gray-700 mb-1 min-w-[120px] pt-2"
          >
            Scoring
          </Label>
          <Textarea
            id="scoring"
            name="scoring"
            placeholder="Enter contest scoring details"
            defaultValue={contestDetails.scoring || ""}
            className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition min-h-[140px]"
          />
        </div>
        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-4 w-full rounded-lg bg-black text-white font-semibold py-3 hover:bg-gray-900 transition"
        >
          Edit Contest
        </Button>
      </form>
    </div>
  );
}
