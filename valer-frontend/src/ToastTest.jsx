import { toast } from "react-toastify";

export default function ToastTest() {
  return (
    <button
      style={{
        padding: "20px",
        background: "black",
        color: "white",
        fontSize: "16px",
      }}
      onClick={() => toast("🔥 TOAST IS WORKING")}
    >
      TEST TOAST
    </button>
  );
}
