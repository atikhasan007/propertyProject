import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import ListingCard from "../components/ListingCard"; // Import ListingCard
import { setListings } from "../redux/state";

const Search = () => {

  const [loading , setLoading] = useState(true)
  const {search} = useParams();
  const listings = useSelector((state) => state.listings);
  const dispatch = useDispatch();

const getSearchListing = async () =>{
  try{
    const response = await fetch(`http://localhost:7000/listing/search/${search}`,{
      method:"GET"
    })

    const data = await response.json()
    dispatch(setListings({listings:data}))
    setLoading(false)

  }catch(err){
    console.log("Fetch Search List Failed", err.message)

  }
}






useEffect(()=>{
  getSearchListing()
},[search])


  return (
    <>
      <Header />
      <section className="pt-10">
        <h3 className="text-3xl  font-black font-serif font-semibold">
          {search}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {listings?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,
              type,
              price,
              title,
              description,
              booking = false,
            }) => (
              <ListingCard
                key={_id}
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}
                type={type}
                price={price}
                title={title}
                description={description}
                booking={booking}
              />
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Search;  
