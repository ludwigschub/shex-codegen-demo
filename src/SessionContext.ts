import { Session } from "@inrupt/solid-client-authn-browser";
import React from "react";

export const SessionContext = React.createContext<Session | null>(null);
