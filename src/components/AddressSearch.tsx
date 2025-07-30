import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { GarbageContextAPI } from "../context/GarbageContext";
import { useState, useEffect } from "react";

export const AddressSearch: React.FC = () => {
  const { addresses, setAddress } = GarbageContextAPI.use();
  const [selected, setSelected] = useState<{
    id: number;
    address: string;
  } | null>(null);
  const [query, setQuery] = useState("");

  const filteredAddresses =
    query.length < 1
      ? []
      : addresses.filter((option) =>
          option.address.toLowerCase().includes(query.toLowerCase())
        );

  useEffect(() => {
    console.log("Selected address:", selected);
    if (selected) {
      setAddress(selected.id);
    }
  }, [selected, setAddress]);

  return (
    <div className="w-full max-w-md">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <ComboboxInput
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Sök adress..."
            onChange={(event) => setQuery(event.target.value)}
          />
          {filteredAddresses.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 overflow-auto rounded border border-gray-200">
              {filteredAddresses.map((option) => (
                <ComboboxOption
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    `px-4 py-2 cursor-pointer ${
                      active ? "bg-blue-500 text-white" : "bg-white text-black"
                    }`
                  }
                >
                  {option.address}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
};
