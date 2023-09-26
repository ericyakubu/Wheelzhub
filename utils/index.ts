import { CarCardProps, FilterProps } from "@/types";
import axios from "axios";

export const fetchCars = async (filters: FilterProps) => {
  const { manufacturer, year, model, limit, fuel } = filters;
  const headers = {
    "X-RapidAPI-Key": "a56b411ca0mshc1b94c2fdd2dddcp135d29jsn287d6fce01b2",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const queryManufacturer = manufacturer
    ? `make=${manufacturer}&`
    : "make=acura";
  const queryYear = year ? `year=${year}&` : "";
  const queryModel = model ? `model=${model}&` : "";
  const queryLimit = limit ? `limit=${limit}&` : "";
  const queryFuel = fuel ? `fuel_type=${fuel}&` : "";

  try {
    const response = await axios.get(
      `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${queryManufacturer}${queryYear}${queryModel}${queryLimit}${queryFuel}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.log(`Error fetching cars: ${error}`);
    throw error;
  }
};

export const generateCarImageUrl = (
  car: CarCardProps,
  angle?: string
): string => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, year, model } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);
  return `${url}`;
};

export const calculateCarRent = (city_mpg: number, year: number): string => {
  const basePricePerDay = 50;
  const milegaFactor = 0.1;
  const ageFactor = 0.05;

  const milageRate = city_mpg * milegaFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + milageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};
