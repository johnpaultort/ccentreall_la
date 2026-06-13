// ============================================================
// products.js
//  name: name of item being sold
//  price: TBD (45 was an estimate)
//  image: path to image
//  description: Vintage T or message from oscar
//   stripeLink: TBD
//   tag: "blank", "limited"
//   soldOut: set to true to show "Sold Out" on the card
// ============================================================

const products = [
  {
    id: 1,
    name: "INSIDEOUT",                   
    price: 45,                          
    image: "images/insideout.png",
    description: "Vintage Distressed T, with a catch its inside out",
    stripeLink: "#",
    tag: "limited",
    soldOut: false,
    sizes: ["1", "2", "3"]
  }
]