import { useContext } from "react";
import { GuestContext } from "./context";

const useGuests = () => {
  return useContext(GuestContext);
};

export default useGuests;
