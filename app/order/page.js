import OrderDemo from "../../components/order-demo";

export const metadata = {
  title: "Interactive Order Demo",
  description:
    "Try Open Order's guided, diner-facing restaurant ordering experience.",
  alternates: {
    canonical: "/order",
  },
};

export default function OrderPage() {
  return <OrderDemo />;
}
