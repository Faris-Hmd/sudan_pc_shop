import { Loader } from "lucide-react";

function loading() {
  return (
    <div className="h-160 w-full flex justify-center items-center">
      <Loader className="animate-spin" size={30} />{" "}
    </div>
  );
}

export default loading;
