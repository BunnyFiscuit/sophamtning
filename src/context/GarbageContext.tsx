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
  id: number;
  address: string;
  city: string;
  schedule: GarbageSchedule[];
}

interface GarbageContextType {
  data: GarbageCollectionEntry | undefined;
  setAddress: (addressId: number) => void;
  addresses: {
    id: number;
    address: string;
  }[];
}

// -- Context ---
const GarbageContext = createContext<GarbageContextType>({
  data: undefined,
  setAddress: () => {},
  addresses: [],
});

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<GarbageCollectionEntry | undefined>(
    undefined
  );
  const addresses = dataRaw.map((entry) => ({
    id: entry.id,
    address: entry.address,
  }));

  useEffect(() => {
    if (dataRaw.length === 1) {
      // Default address
      setData(dataRaw[0]);
    }
  }, []);

  const setAddress = (addressId: number) => {
    const selectedAddress = dataRaw.find((entry) => entry.id === addressId);
    if (selectedAddress) {
      setData(selectedAddress);
    }
  };

  return (
    <GarbageContext.Provider value={{ data, setAddress, addresses }}>
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
