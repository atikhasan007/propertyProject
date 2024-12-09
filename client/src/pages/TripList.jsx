

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Header from '../components/Header';
// import ListingCard from '../components/ListingCard';
// import Loader from '../components/Loader';
// import { setTripList } from '../redux/state';
 
// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);
//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost:7000/users/${userId}/trips`, {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json(); // Parse the response as JSON
//       dispatch(setTripList(data)); // Use the parsed data
//       setLoading(false); // Set loading to false after successful fetch
//     } catch (err) {
//       console.error('Fetch trip list failed!', err.message);
//       setLoading(false); // Ensure loading is turned off even if an error occurs
//     }
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Header />
//       <section className="my-7 p2-10">
//         <h3 className="text-4xl font-bold font-serif my-6">Your Trip List</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
//           {tripList.map(
//             (
//               {
//                 listingId,
//                 hostId,
//                 startDate,
//                 endDate,
//                 totalPrice,
//                 title,
//                 description,
//                 booking = true,
//               },
//               index // Add index as a fallback
//             ) => (
//               <ListingCard
//                 key={`${listingId._id}-${startDate}-${index}`} // Ensure a unique key
//                 listingId={listingId}
//                 creator={hostId._id}
//                 listingPhotoPaths={listingId.listingPhotoPaths}
//                 city={listingId.city}
//                 province={listingId.province}
//                 country={listingId.country}
//                 category={listingId.category}
//                 startDate={startDate}
//                 endDate={endDate}
//                 totalPrice={totalPrice}
//                 title={listingId.title}
//                 description={listingId.description}
//                 booking={booking}
//               />
//             )
            
//           )}
//           <button>payment system </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default TripList;



// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Header from '../components/Header';
// import ListingCard from '../components/ListingCard';
// import Loader from '../components/Loader';
// import { setTripList } from '../redux/state';

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);
//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost:7000/users/${userId}/trips`, {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Filter out duplicates based on `listingId._id`
//       const uniqueTrips = Array.from(
//         new Map(data.map((trip) => [trip.listingId._id, trip])).values()
//       );

//       dispatch(setTripList(uniqueTrips)); // Use filtered unique trips
//       setLoading(false);
//     } catch (err) {
//       console.error('Fetch trip list failed!', err.message);
//       setLoading(false);
//     }
//   };

//   const handlePayment = () => {
//     // Logic to handle payment, such as redirecting to a payment page
//     console.log('Proceed to payment...');
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Header />
//       <section className="my-7 p2-10">
//         <h3 className="text-4xl font-bold font-serif my-6">Your Trip List</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {tripList.map(
//             (
//               {
//                 listingId,
//                 hostId,
//                 startDate,
//                 endDate,
//                 totalPrice,
//                 title,
//                 description,
//                 booking = true,
//               },
//               index
//             ) => (
//               <ListingCard
//                 key={`${listingId._id}-${startDate}-${index}`}
//                 listingId={listingId}
//                 creator={hostId._id}
//                 listingPhotoPaths={listingId.listingPhotoPaths}
//                 city={listingId.city}
//                 province={listingId.province}
//                 country={listingId.country}
//                 category={listingId.category}
//                 startDate={startDate}
//                 endDate={endDate}
//                 totalPrice={totalPrice}
//                 title={listingId.title}
//                 description={listingId.description}
//                 booking={booking}
//               />
//             )
//           )}
//         </div>
//         {/* Payment button */}
//         <div className="text-center mt-6">
//           <button
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
//             onClick={handlePayment}
//           >
//             Proceed to Payment
//           </button>
//         </div>
//       </section>
//     </>
//   );
// };

// export default TripList;


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Header from '../components/Header';
// import ListingCard from '../components/ListingCard';
// import Loader from '../components/Loader';
// import { setTripList } from '../redux/state';

// const TripList = () => {
//   const [loading, setLoading] = useState(true);
//   const userId = useSelector((state) => state.user._id);
//   const tripList = useSelector((state) => state.user.tripList);
//   const dispatch = useDispatch();

//   const getTripList = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`http://localhost:7000/users/${userId}/trips`, {
//         method: 'GET',
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       // Filter out duplicates based on `listingId._id`
//       const uniqueTrips = Array.from(
//         new Map(data.map((trip) => [trip.listingId._id, trip])).values()
//       );

//       dispatch(setTripList(uniqueTrips)); // Use filtered unique trips
//       setLoading(false);
//     } catch (err) {
//       console.error('Fetch trip list failed!', err.message);
//       setLoading(false);
//     }
//   };

//   const handlePayment = (trip) => {
//     // Logic to handle payment for a specific trip
//     console.log(`Proceed to payment for trip: ${trip.listingId.title}`);
//   };

//   useEffect(() => {
//     getTripList();
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <>
//       <Header />
//       <section className="my-7 p2-10">
//         <h3 className="text-4xl font-bold font-serif my-6">Your Trip List</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {tripList.map(
//             (
//               {
//                 listingId,
//                 hostId,
//                 startDate,
//                 endDate,
//                 totalPrice,
//                 title,
//                 description,
//                 booking = true,
//               },
//               index
//             ) => (
//               <div key={`${listingId._id}-${startDate}-${index}`}>
//                 <ListingCard
//                   listingId={listingId}
//                   creator={hostId._id}
//                   listingPhotoPaths={listingId.listingPhotoPaths}
//                   city={listingId.city}
//                   province={listingId.province}
//                   country={listingId.country}
//                   category={listingId.category}
//                   startDate={startDate}
//                   endDate={endDate}
//                   totalPrice={totalPrice}
//                   title={listingId.title}
//                   description={listingId.description}
//                   booking={booking}
//                 />
//                 {/* Payment button */}
//                 <div className="text-center mt-4">
//                   <button
//                     className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
//                     onClick={() => handlePayment({ listingId, title })}
//                   >
//                     Pay for {listingId.title}
//                   </button>
//                 </div>
//               </div>
//             )
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default TripList;





import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import ListingCard from '../components/ListingCard';
import Loader from '../components/Loader';
import { setTripList } from '../redux/state';

const TripList = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null); // Track selected trip for payment
  const userId = useSelector((state) => state.user._id);
  const tripList = useSelector((state) => state.user.tripList);
  const dispatch = useDispatch();

  const getTripList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:7000/users/${userId}/trips`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Filter out duplicates based on `listingId._id`
      const uniqueTrips = Array.from(
        new Map(data.map((trip) => [trip.listingId._id, trip])).values()
      );

      dispatch(setTripList(uniqueTrips)); // Use filtered unique trips
      setLoading(false);
    } catch (err) {
      console.error('Fetch trip list failed!', err.message);
      setLoading(false);
    }
  };

  const handlePaymentClick = (trip) => {
    setSelectedTrip(trip); // Set the selected trip for payment modal
  };

  const handlePaymentOptionClick = (method) => {
    console.log(`Payment selected: ${method} for trip: ${selectedTrip.listingId.title}`);
    // Implement further payment logic (e.g., API call to initiate payment)
    setSelectedTrip(null); // Close the modal after selection
  };

  useEffect(() => {
    getTripList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section className="my-7 p2-10">
        <h3 className="text-4xl font-bold font-serif my-6">Your Trip List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tripList.map(
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
              index
            ) => (
              <div key={`${listingId._id}-${startDate}-${index}`}>
                <ListingCard
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
                {/* Payment button */}
                <div className="text-center mt-4">
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600"
                    onClick={() => handlePaymentClick({ listingId, title })}
                  >
                    Pay for {listingId.title}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Payment Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Choose Payment Method</h3>
            <p className="mb-6">For: {selectedTrip.listingId.title}</p>
            <div className="space-y-4">
              <button
                className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600"
                onClick={() => handlePaymentOptionClick('Bkash')}
              >
                Pay with Bkash
              </button>
              <button
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
                onClick={() => handlePaymentOptionClick('Nagad')}
              >
                Pay with Nagad
              </button>
              <button
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                onClick={() => handlePaymentOptionClick('Card')}
              >
                Pay with Credit/Debit Card
              </button>
            </div>
            <button
              className="mt-6 w-full px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600"
              onClick={() => setSelectedTrip(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TripList;
