"use client";
import React, { useEffect, useState } from "react";
import { SearchManufacturer } from "./";
import SearchButton from "./SearchButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { manufacturers } from "@/constants";
import { FilterProps, searchParamsInterface } from "@/types";

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const test = new URLSearchParams(window.location.search);
    const searchParamsObject: searchParamsInterface = {};
    const entriesArray = Array.from(test.entries());

    for (const [key, value] of entriesArray) {
      searchParamsObject[key] = value;
    }

    if (searchParamsObject.manufacturer) {
      manufacturers.forEach((m, i) => {
        const manufacturerParam = searchParamsObject.manufacturer;
        const old = m.includes("-")
          ? m.split("-").join(" ").toLowerCase()
          : m.toLowerCase();
        const param = manufacturerParam.includes("+")
          ? manufacturerParam.split("+").join(" ").toLowerCase()
          : manufacturerParam.toLowerCase();

        if (old === param) setManufacturer(manufacturers[i]);
      });
    }
    if (searchParamsObject.model) {
      const m = searchParamsObject.model;
      m.charAt(0).toUpperCase() + m.slice(1);
      if (m.includes("+")) m.split("+").join(" ");
      setModel(m);
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (manufacturer === "" && model === "")
      return alert("Please fill in the search bar");

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (manufacturer) {
      searchParams.set("manufacturer", manufacturer);
    } else {
      searchParams.delete("manufacturer");
    }
    if (model) {
      searchParams.set("model", model);
    } else {
      searchParams.delete("model");
    }

    const newPathName = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    router.push(newPathName);
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
          alt="car model"
        />
        <input
          type="text"
          name="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
