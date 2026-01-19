import { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";
import { ShopContext } from "../context/ShopContext";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, clearCart } = useContext(ShopContext);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      navigate("/", { replace: true });
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axios.post(
          `${backendUrl}/order/verify`,
          { session_id: sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          clearCart();
          navigate("/order-success", { replace: true });
        }
      } catch (error) {
        console.error("❌ STRIPE VERIFY FAILED:", error);
        navigate("/", { replace: true });
      }
    };

    verifyPayment();
  }, [navigate, searchParams, token, clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-500">Verifying payment…</p>
    </div>
  );
};

export default Verify;
