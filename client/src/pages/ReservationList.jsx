

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ListingCard from '../components/ListingCard';
import Loader from '../components/Loader';
import { setReservationList } from '../redux/state';
 
const ReservationList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const reservationList = useSelector((state) => state.user.reservationList);
  const dispatch = useDispatch();

  const getReservationList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:7000/users/${userId}/reservations`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response as JSON
      dispatch(setReservationList(data)); // Use the parsed data
      setLoading(false); // Set loading to false after successful fetch
    } catch (err) {
      console.error('Fetch Reservation list failed!', err.message);
      setLoading(false); // Ensure loading is turned off even if an error occurs
    }
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section className="my-7 p2-10">
        <h3 className="text-4xl font-bold font-serif my-6">Your ReservationList List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reservationList.map(
            (
              {
                listingId,
                hostId,
                startDate,
                endDate,
                totalPrice,
                title,
                description,
                booking = true,
              },
              index // Add index as a fallback
            ) => (
              <ListingCard
                key={`${listingId._id}-${startDate}-${index}`} // Ensure a unique key
                listingId={listingId}
                creator={hostId._id}
                listingPhotoPaths={listingId.listingPhotoPaths}
                city={listingId.city}
                province={listingId.province}
                country={listingId.country}
                category={listingId.category}
                startDate={startDate}
                endDate={endDate}
                totalPrice={totalPrice}
                title={listingId.title}
                description={listingId.description}
                booking={booking}
              />
            )
          )}
        </div>
      </section>
    </>
  );
};

export default ReservationList;



