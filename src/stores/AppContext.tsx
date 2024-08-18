import { ApplicationContextInterface } from "@interfaces/ApplicationContextInterface";
import { createContext } from "react";

export const ApplicationContext = createContext<ApplicationContextInterface|null>(null);