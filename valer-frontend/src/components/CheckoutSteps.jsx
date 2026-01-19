import { useNavigate } from "react-router-dom";

const CheckoutSteps = ({ step }) => {
  const navigate = useNavigate();

  const steps = [
    { label: "Cart", path: "/cart" },
    { label: "Checkout", path: "/checkout" },
    { label: "Payment", path: "/payment" },
  ];

  return (
    <div className="flex justify-center gap-4 mb-12">
      {steps.map((s, index) => {
        const isActive = index === step;

        return (
          <button
            key={s.label}
            onClick={() => navigate(s.path)}
            className={`
              px-6 py-2 text-sm tracking-wide transition
              rounded-full border
              ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-black"
              }
            `}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
