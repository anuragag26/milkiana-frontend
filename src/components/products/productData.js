import milk2000 from "../../assets/images/products/2000.jpg"
import milk4000 from "../../assets/images/products/4000.jpg"
import milk6000 from "../../assets/images/products/6000.jpg"


const products = [
  {
    id: 1,
    name: "Milkiana 2000",
    milkRange: "5 – 8 Litres",
    description: "Balanced nutrition for low milk yield cattle.",
    benefits: ["Mineral enriched", "Improves digestion"],
    image: milk2000
  },
  {
    id: 2,
    name: "Milkiana 4000",
    milkRange: "8 – 12 Litres",
    description: "Improves milk quality and fat percentage.",
    benefits: ["High energy", "Better milk fat"],
    image: milk4000
  },
  {
    id: 3,
    name: "Milkiana 6000",
    milkRange: "12 – 18 Litres",
    description: "For high-yield cattle with better productivity.",
    benefits: ["High protein", "Boosts immunity"],
    image: milk6000
  }
];

export default products;
