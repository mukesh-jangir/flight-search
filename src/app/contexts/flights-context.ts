import { createContext } from "react";
import { FlightsStateProps } from "../models/flight-parameters";

export const FlightsContext = createContext<FlightsStateProps>({} as any);