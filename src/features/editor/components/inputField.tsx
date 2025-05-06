import { Textarea } from "@/components/ui/textarea";
import { use, useEffect } from "react";

export default function InputField({
  setInput,
  probId,
}: {
  setInput: (input: string) => void;
  probId: string;
}) {
  const input = "2\nhi\nhello";

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    setInput(input);
  }, []);

  return (
    <Textarea
      className="h-24 resize-none"
      onChange={handleInputChange}
      defaultValue={input}
    />
  );
}
