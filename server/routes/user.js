
import express from "express";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";
import User from "../models/User.js";

const router = express.Router();

// Get trip list

router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(trips);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Cannot find trips!", error: err.message });
  }
});



//add Listing to whishList
router.patch("/:userId/:listingId", async (req, res) => {
  try{
    const {userId, listingId} = req.params;
    const  user = await User.findById(userId)

    const listing = await Listing.findById(listingId).populate("creator")

    const favoriteListing = user.wishList.find((item)=>item._id.toString()===listingId)
    if(favoriteListing){
      user.wishList = user.wishList.filter((item)=>item._id.toString() !==listingId)
      await user.save()
      res.status(200).json({message:"listing removed from wishList", wishList:user.wishList})
    }
    else{
      user.wishList.push(listing)
      await user.save()
      res.status(200).json({message:"listing is added to wishList ", wishList:user.wishList})
    }

  }catch(err){
    console.log(err)

    res.status(404).json({error:err.message})
  }
})





// Get user listing

router.get("/:userId/listing", async (req, res) => {
  try {
    const { userId } = req.params;
    const listing = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(200).json(listing);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Cannot find listing!", error: err.message });
  }
});




// Get reservation list

router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(reservations);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Cannot find reservation!", error: err.message });
  }
});




export default router;


