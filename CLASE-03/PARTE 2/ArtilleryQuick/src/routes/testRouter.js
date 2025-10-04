import { Router } from "express";
export const router = Router();

//
// Simulated product catalog (could be replaced by DB in the future)
// ------------------------------------------------------------------
const productsCatalog = [
  { id: 1, name: "Concrete", price: 120 },
  { id: 2, name: "Rebar", price: 250 },
  { id: 3, name: "Gravel", price: 90 },
  { id: 4, name: "Plywood", price: 160 },
  { id: 5, name: "Insulation Foam", price: 320 },
];


//
// Route: GET /products/filter
// -------------------------------------------------------------------
// Description: Returns products filtered by name and/or maximum price
//* Route de dificultad simple que no requiere de una gran carga de procesamiento
router.get("/products/filter", (req, res) => {
  const { name, maxPrice } = req.query;

  // Basic input validation
  const priceLimit = maxPrice ? parseFloat(maxPrice) : null;
  if (maxPrice && isNaN(priceLimit)) {
    return res.status(400).json({ error: "maxPrice must be a valid number" });
  }

  const results = productsCatalog.filter(product => {
    const matchesName = name ? product.name.toLowerCase().includes(name.toLowerCase()) : true;
    const matchesPrice = priceLimit !== null ? product.price <= priceLimit : true;
    return matchesName && matchesPrice;
  });

  return res.status(200).json({ count: results.length, products: results });
});


//
// Route: GET /engineering/structural-analysis
// -------------------------------------------------------------------
// Description: Performs a heavy structural load simulation for a building
//* Route de dificultad alta que simula un análisis estructural complejo
router.get("/engineering/structural-analysis", (req, res) => {
  console.time("Structural load simulation");

  let totalLoad = 0;
  const iterations = 75_000_000;

  for (let i = 0; i < iterations; i++) {
    // Simulated dynamic force computation (e.g. wind + material stress + gravity)
    const dynamicForce = Math.log(i + 1) * Math.sin(i % 360) * 0.75;
    const gravityEffect = Math.sqrt(i % 5000) * 9.81;
    const stressFactor = Math.pow((i % 1000) / 1000, 2) * 500;

    totalLoad += dynamicForce + gravityEffect + stressFactor;
  }

  console.timeEnd("Structural load simulation");

  return res.status(200).json({
    message: "Structural simulation complete",
    simulatedLoad: totalLoad.toFixed(2),
    unit: "kN", // kilonewtons as example
  });
});

