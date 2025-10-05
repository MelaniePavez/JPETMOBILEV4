import * as functions from "firebase-functions";
import Stripe from "stripe";
import cors from "cors";
import express from "express";

const app = express();
const corsHandler = cors({ origin: true });

// Inicializa Stripe con tu clave secreta
const stripe = new Stripe("sk_test_51SEmqiEJtktyj04RZ1q3nZpUBh92NKZELd2qjyHhaL4PZNycgazWZDsbHJoRQxWR56uz3jB299TzlUmgF0HyTvip000cNxeoeK", {
  apiVersion: "2025-09-30.clover",
});

app.use(corsHandler);
app.use(express.json());

// ✅ Endpoint para crear sesión de pago en Stripe
app.post("/createStripeSession", async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "No se recibieron productos válidos." });
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "clp",
        product_data: {
          name: item.productName,
        },
        unit_amount: item.amount,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:8100/success",
      cancel_url: "http://localhost:8100/cancel",
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("🔥 Error al crear sesión Stripe:", error);
    return res.status(500).json({ error: error.message });
  }
});

// Exporta la API como función de Firebase
export const api = functions.https.onRequest(app);
