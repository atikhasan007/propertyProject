





import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaPersonShelter } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdBed, MdOutlineBathroom, MdOutlineBedroomChild } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../assets/data";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  const getListingDetails = async () => {
    try {
      const response = await fetch(`http://localhost:7000/listing/${listingId}`, {
        method: "GET",
      });
      const data = await response.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details failed", err.message);
    }
  };

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (range) => {
    setDateRange([range.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round((end - start) / (1000 * 60 * 60 * 24));

  const customerId = useSelector((state) => state?.user?._id);
  const isOwner = listing?.creator?._id === customerId;

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
        title: listing.title,
        description: listing.description,
      };

      const response = await fetch("http://localhost:7000/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <section className="container mx-auto flex flex-col md:flex-row px-4 py-8 gap-8">
        {/* Left Side */}
        <div className="space-y-8 w-full md:w-2/3">
          {/* Listing Header */}
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-gray-900">{listing.title}</h3>
            <div className="flex items-center space-x-2 text-gray-500">
              <HiOutlineLocationMarker className="text-lg text-blue-500" />
              <p className="text-sm">
                {listing.type}, {listing.city}, {listing.province}, {listing.country}
              </p>
            </div>
          </div>

          {/* Listing Details */}
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="flex items-center space-x-2">
              <FaPersonShelter className="text-xl text-blue-500" />
              <p>{listing.guestCount} guests</p>
            </div>
            <div className="flex items-center space-x-2">
              <MdOutlineBedroomChild className="text-xl text-blue-500" />
              <p>{listing.bedroomCount} bedrooms</p>
            </div>
            <div className="flex items-center space-x-2">
              <MdBed className="text-xl text-blue-500" />
              <p>{listing.bedCount} beds</p>
            </div>
            <div className="flex items-center space-x-2">
              <MdOutlineBathroom className="text-xl text-blue-500" />
              <p>{listing.bathroomCount} bathrooms</p>
            </div>
          </div>

          {/* Host Information */}
          <div className="flex items-center space-x-4">
            <img
              src={`http://localhost:7000/${listing?.creator?.profileImagePath?.replace(
                "public",
                ""
              )}`}
              alt="creator"
              className="h-16 w-16 rounded-full object-cover border border-gray-200"
            />
            <h5 className="text-gray-800 text-lg">
              Hosted by {listing.creator.firstName} {listing.creator.lastName}
            </h5>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">{listing.description}</p>

          {/* Amenities */}
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-4">What this place offers</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {listing.amenities?.[0]?.split(",").map((item, i) => {
                const facility = facilities.find((f) => f.name === item);
                return (
                  <li
                    key={i}
                    className="flex items-center space-x-3 bg-yellow-200  shadow hover:shadow-2xl p-4 rounded-lg"
                  >
                    <div className="text-lg text-blue-500">{facility?.icon || "🏠"}</div>
                    <p className="text-gray-700">{item}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Booking Container */}
          <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-200">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">How long do you want to stay?</h4>
            <div className="mb-6">
              <DateRange ranges={dateRange} onChange={handleSelect} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-800">Total Stay:</span>
                <span className="text-gray-700">
                  ৳ {listing.price} x {dayCount} {dayCount > 1 ? "nights" : "night"}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-4">
                <span className="text-gray-800 font-semibold">Total Price:</span>
                <span className="text-green-600 font-bold">৳ {listing.price * dayCount}</span>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`mt-6 w-full py-3 text-white rounded-lg ${
                isOwner
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={isOwner}
            >
              {isOwner ? "You can't book your own property" : "Book the visit"}
            </button>
          </div>
        </div>

        {/* Right Image Gallery */}
        <div className="w-full md:w-1/3 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {listing.listingPhotoPaths?.map((item, index) => (
              <div
                key={index}
                className={`${index === 0 ? "col-span-2" : ""} h-40 md:h-60`}
              >
                <img
                  src={`http://localhost:7000/${item.replace("public", "")}`}
                  alt="Listing"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default ListingDetails;
