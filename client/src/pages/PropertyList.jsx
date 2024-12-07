import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import ListingCard from "../components/ListingCard"; // Import ListingCard
import Loader from '../components/Loader';
import { setPropertyList } from "../redux/state";

const PropertyList = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user);
  const propertyList = user?.propertyList
  const dispatch = useDispatch()



 const getPropertyList = async () =>{
  try{
    const response = await fetch(`http://localhost:7000/users/${user._id}/listing`, {
      method:"GET",

    })

    const data = await response.json()
    dispatch(setPropertyList(data))
    setLoading(false)

  }catch(err){
    console.log('fetch all properties failed', err.message)

  }
 }


useEffect(()=>{
  getPropertyList()
}, [])


  return loading ? (<Loader />) : (
    <>
      <Header />
      <section className="pt-10">
        <h3 className="text-3xl  font-black font-serif font-semibold">
          Your Property List
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {propertyList?.map(
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

export default PropertyList;
