import React from "react";
import { AddressSearch } from "./AddressSearch";

export const PageHeader: React.FC = () => {
  return (
    <header>
      <div
        className="flex flex-col sm:flex-row justify-between items-center px-4 pt-4 sm:p-8 text-white gap-4 sm:gap-0"
        style={{ backgroundColor: "#242424" }}
      >
        <AddressSearch />
        <a href="/">
          <h1 className="text-xl sm:text-3xl font-bold">Sophämtningsschema</h1>
        </a>
      </div>
    </header>
  );
};
