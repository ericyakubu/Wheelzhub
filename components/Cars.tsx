import { fetchCars } from "@/utils";
import { CarCard, ShowMore } from ".";
import { HomePageProps } from "@/types";

const Cars = async ({ searchParams }: HomePageProps) => {
  const { manufacturer, model, fuel, year, limit } = searchParams;

  const checkModel = model ? model : manufacturer ? "" : "Tiguan";
  const checkManufacturer = manufacturer
    ? manufacturer
    : model
    ? ""
    : "Volkswagen";

  const allCars = await fetchCars({
    manufacturer: checkManufacturer,
    model: checkModel,
    fuel: fuel || "",
    limit: limit || 10,
    year: year || 2023,
  });

  const error = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  if (!error)
    return (
      <section>
        <div className="home__cars-wrapper">
          {allCars.map((car, i) => (
            <CarCard car={car} key={`car ${i}`} />
          ))}
        </div>

        <ShowMore
          pageNumber={(searchParams.limit || 10) / 10}
          isNext={(searchParams.limit || 10) > allCars.length}
        />
      </section>
    );

  if (error)
    return (
      <div className="home__error-container">
        <h2 className="text-black text-1 font-bold">Oops, no results</h2>
        <p>{allCars?.message}</p>
      </div>
    );
};

export default Cars;
