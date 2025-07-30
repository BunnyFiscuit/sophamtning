/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import dataRaw from "../data/garbage-collection-data.json";

// --- Types ---
export interface GarbageSchedule {
  bin: string;
  binNr: string;
  day: string;
  frequency: string;
}

export interface GarbageCollectionEntry {
  address: string;
  city: string;
  schedule: GarbageSchedule[];
}

interface GarbageContextType {
  data: GarbageCollectionEntry | undefined;
  search: (query: string) => GarbageCollectionEntry | undefined;
}

// -- Context ---
const GarbageContext = createContext<GarbageContextType>({
  data: undefined,
  search: () => undefined,
});

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<GarbageCollectionEntry | undefined>(
    undefined
  );

  useEffect(() => {
    if (dataRaw.length === 1) {
      // Default address
      setData(dataRaw[0]);
    }
  }, []);

  const search = (query: string): GarbageCollectionEntry | undefined => {
    if (!query) {
      setData(undefined);
      return undefined;
    }
    return dataRaw.find((entry) =>
      entry.address.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <GarbageContext.Provider value={{ data, search }}>
      {children}
    </GarbageContext.Provider>
  );
};

// --- Hook ---
const use = () => useContext(GarbageContext);

export const GarbageContextAPI = {
  Provider,
  use,
};
