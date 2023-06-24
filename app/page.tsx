import Image from 'next/image';
import { Hero, CustomFilter, SearchBar, CarCard, ShowMore } from '@/components';
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';

export default async function Home({searchParams}:any) {
  const allCars = await fetchCars({
    manufacturer:searchParams.manufacturer || "",
    year:searchParams.year || 2022,
    fuel:searchParams.fuel || "",
    limit:searchParams.limit || 10,
    model:searchParams.model || "",
  });
  const isArrayEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars ;


  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className="home__text-container">
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the Cars you might like.</p>
        </div>
        <div className='home__filters'>
          <SearchBar />

          <div className='home__filter-container'>
            <CustomFilter title="Fuel" options={fuels} />
            <CustomFilter title="Year" options={yearsOfProduction} />
          </div>
        </div>

        {!isArrayEmpty? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, index) =>(<CarCard car={car} key={index} />))}
            </div>
            <ShowMore
              pageNumber = {(searchParams.limit || 10)/10}
              isNext = {(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ):(
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold' >Oops, No Results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}

      </div>
    </main>
  )
}
