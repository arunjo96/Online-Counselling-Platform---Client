
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <AiOutlineLoading3Quarters className="text-blue-500 text-3xl animate-spin" />
    </div>
  );
};

export const ErrorDisplay = ({ message = "Something went wrong!" }) => {
  return (
    <div className="text-center p-6 text-red-500">
      <AiOutlineClose className="text-4xl mx-auto mb-2" />
      <p className="text-xl">{message}</p>
    </div>
  );
};

