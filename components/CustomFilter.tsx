"use client";
import {
  CustomFilterProps,
  FilterProps,
  OptionsProps,
  searchParamsInterface,
} from "@/types";
import { updateSearchParams } from "@/utils";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, use, useEffect, useState } from "react";

const CustomFilter = ({ title, options }: CustomFilterProps) => {
  const test = new URLSearchParams(window.location.search);
  const searchParamsObject: searchParamsInterface = {};

  const [selected, setSelected] = useState<OptionsProps>(options[0]);
  const router = useRouter();

  useEffect(() => {
    for (const [key, value] of test.entries()) {
      searchParamsObject[key] = value;
    }

    if (searchParamsObject.hasOwnProperty(title)) {
      const val =
        searchParamsObject[title].charAt(0).toUpperCase() +
        searchParamsObject[title].slice(1);

      setSelected({ title: val, value: val });
    }
  }, []);

  const handleUpdateParams = (e: { title: string; value: string }) => {
    let newPathName;

    if (e.value === "") {
      const searchParams = new URLSearchParams(window.location.search);
      title === "fuel"
        ? searchParams.delete("fuel")
        : searchParams.delete("year");

      newPathName = `${window.location.pathname}?${searchParams.toString()}`;
    } else {
      newPathName = updateSearchParams(title, e.value.toLowerCase());
    }
    router.push(newPathName);
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image
              src="/chevron-up-down.svg"
              width={20}
              height={20}
              alt="chevron up and down"
              className="ml-4 object-contain"
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? `bg-primary-blue text-white` : `text-gray-900`
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? `font-medium` : `font-normal`
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
