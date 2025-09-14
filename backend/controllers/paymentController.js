
const Stripe = require("stripe");
const { Service } = require("../models");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { serviceId } = req.body;

    // Find the service
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: service.title,
              description: service.description,
            },
            unit_amount: Math.round(Number(service.price) * 100), // Stripe works in pence
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: "Payment failed" });
  }
};

module.exports = { createCheckoutSession };
