import { Cars, CustomFilter, Hero, SearchBar } from "@/components";
import { HomePageProps } from "@/types";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }: HomePageProps) {
  // const allCars = await fetchCars({
  //   manufacturer: manufacturer || "",
  //   model: model || "",
  //   fuel: fuel || "",
  //   limit: limit || 10,
  //   year: year || 2023,
  // });
  // const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  // console.log(searchParams);

  return (
    <main className="overflow-hidden scroll-smooth">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container" id="cars">
          <h1 className="text-4x1 font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        <Cars searchParams={searchParams} />
      </div>
    </main>
  );
}
