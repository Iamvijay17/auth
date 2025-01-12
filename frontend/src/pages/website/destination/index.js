import React from 'react';
import { useSelector } from "react-redux";
import AccommodationCard from '../../../components/AccommodationCard';

const Destination = () => {

  const designations = useSelector((state) => state.designations);

  console.log(designations);

  return (
    <div className='p-12'>
      <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {designations["data"].map((designation) => (
          <AccommodationCard key={designation.id} data={designation}/>
        ))}
      </div>
    </div>
  );
};

export default Destination;
