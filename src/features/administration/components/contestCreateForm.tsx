import createContest from "../actions/createContest";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function ContestCreateForm() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 py-8">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl p-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create a Contest
        </h2>
        <p className="text-gray-500 mb-8">
          Fill in the details below to launch a new contest.
        </p>
        <form className="flex flex-col gap-6" action={createContest}>
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
                className="w-full rounded-lg border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-4 w-full rounded-lg bg-black text-white font-semibold py-3 hover:bg-gray-900 transition"
          >
            Create Contest
          </Button>
        </form>
      </div>
    </div>
  );
}
