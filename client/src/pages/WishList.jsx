import { useSelector } from "react-redux";
import Header from "../components/Header";
import ListingCard from "../components/ListingCard"; // Import ListingCard

const WishList = () => {
  const wishList = useSelector((state) => state.user.wishList);

  return (
    <>
      <Header />
      <section className="pt-10">
        <h3 className="text-3xl  font-black font-serif font-semibold">
          Your Wish List
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {wishList?.map(
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

export default WishList;
