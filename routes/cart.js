const Cart = require("../models/Cart");
const { verifyTokenAndAuthorisation, verifyTokenAndAdmin, verifyToken } = require("./verifyToken");

const router = require("express").Router();



// CREATE

router.post("/",verifyToken , async (req,res)=>{
    const newCart = new Cart (req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// UPDATE
router.put("/:id",verifyTokenAndAuthorisation, async (req,res)=>{
    
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true});
        // {new:true} YE to return the updated cart
        res.status(200).json(updatedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
}
)

// DELETE 

router.delete("/:id",verifyTokenAndAuthorisation, async (req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted.....");
    }
    catch(err){
        res.status(500).json(err);
    }


})


// GET USER CART

router.get("/find/:userId",verifyTokenAndAuthorisation,async (req,res)=>{
    try{
        const product = await Cart.findOne({userID: req.params.userId});

         // IF EVERYTHING IS OKAY
         res.status(200).json(Cart);
    }
    catch(err){
        res.status(500).json(err);
    }

})
// GET ALL 

router.get("/",verifyTokenAndAdmin, async (req,res)=>{
   
    try{
       const carts = await Cart.find();
        res.status(200).json(carts);  
    }
    catch(err){
        res.status(500).json(err);
    }

})

module.exports = router;