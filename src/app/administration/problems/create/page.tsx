import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createProblem } from "@/features/administration/actions/createProblem";

export default function CreateProblemPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
      <h2 className="text-5xl mb-4">Submit a Problem</h2>
      <form
        className="p-8 flex flex-col gap-4 min-w-[1024px]"
        action={createProblem}
      >
        {/* Title */}
        <div className="flex">
          <Label
            htmlFor="title"
            className="text-md font-semibold w-[16rem] mt-2"
          >
            Title :
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Enter problem title"
            required
          />
        </div>

        {/* Problem Statement */}
        <div className="flex">
          <Label
            htmlFor="problemStatement"
            className="text-md font-semibold w-[16rem] mt-2"
          >
            Problem Statement :
          </Label>
          <Textarea
            id="problemStatement"
            name="problemStatement"
            placeholder="Describe the problem"
            rows={6}
            required
          />
        </div>

        {/* Input Format */}
        <div className="flex">
          <Label
            htmlFor="inputFormat"
            className="text-md font-semibold w-[16rem] mt-2"
          >
            Input Format :
          </Label>
          <Textarea
            id="inputFormat"
            name="inputFormat"
            placeholder="Describe the input format"
            rows={6}
            required
          />
        </div>

        {/* Output Format */}
        <div className="flex">
          <Label
            htmlFor="outputFormat"
            className="text-md font-semibold w-[16rem] mt-2"
          >
            Output Format :
          </Label>
          {/* //disable scrolling in x direction */}
          <Textarea
            id="outputFormat"
            name="outputFormat"
            placeholder="Describe the output format"
            rows={6}
            required
          />
        </div>

        {/* Constraints */}
        <div className="flex">
          <Label
            htmlFor="constraints"
            className="text-md font-semibold w-[16rem] mt-2"
          >
            Constraints :
          </Label>
          <Textarea
            id="constraints"
            name="constraints"
            placeholder="Specify the constraints"
            rows={6}
            required
          />
        </div>

        {/* Submit */}
        <div className="">
          <Button>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
