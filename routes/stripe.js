const router = require("express").Router();
const stripe = require("stripe")("sk_test_51Og2DhSBnGhSHA9CDhQHng1dNFyu50J7MlBnPRB27kTVdciH3bgvdP5s6Og2MdPvsenKPOczfHXkNvJmVSO8NZAc00BKRmCidf");

router.post("/payment", (req, res) => {
  console.log(req.body.tokenId)
  console.log("t")
  stripe.charges.create(
    {
      source: req.body.tokenId,
      // payment_method_types: ['card'],
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        // console.log(stripeErr)
        res.status(500).json(stripeErr);

      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});
// router.post('/payment', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     // success_url: `${YOUR_DOMAIN}?success=true`,
//     // cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });
module.exports = router;