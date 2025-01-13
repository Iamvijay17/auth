import React from 'react';
import { useSelector } from "react-redux";
import AccommodationCard from '../../../components/AccommodationCard';

const Destination = () => {

  const designations = useSelector((state) => state.designations);

  const popularDestinations = designations["data"].filter(designation => designation.popular);

  
  return (
    <div className='p-12'>
      {/* Popular Destinations Section */}
      <section>
        <h3 className="text-2xl font-semibold mb-6">Popular Destinations</h3>
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          {popularDestinations?.length > 0 ? (
            popularDestinations?.map((designation) => (
              <AccommodationCard key={designation.id} data={designation} />
            ))
          ) : (
            <p>No popular destinations available.</p>
          )}
        </div>
      </section>

      {/* All Destinations Section */}
      <section className="mt-12">
        <h3 className="text-2xl font-semibold mb-6">All Destinations</h3>
        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          {designations["data"].map((designation) => (
            <AccommodationCard key={designation.id} data={designation} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Destination;
