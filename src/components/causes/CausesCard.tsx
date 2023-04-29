import { HiSparkles } from "react-icons/hi";

interface ICauses {
  type: string;
  description: string;
}

interface MyProps {
  cause: ICauses;
}

export default function CausesCard({ cause }: MyProps) {
  return (
    <div className="rounded-md p-3 w-96 overflow-wrap break-word bg-white shadow-lg border-1 flex flex-col justify-start gap-x-2 items-start text-xs">
      <div className="flex gap-1 justify-center items-center">
        <div className="p-1 border-1 rounded-full bg-gray-300">
          <HiSparkles />
        </div>
        <div>
          <h6>{cause.type}</h6>
        </div>
      </div>
      <div className="">
        {cause.description}
      </div>
    </div>
  );
}
