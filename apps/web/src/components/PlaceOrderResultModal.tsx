import Modal from "react-modal";
import { PlaceOrderResult } from "./CartPriceSummaryContainer/CartPriceSummaryContainer";
import Button from "./common/Button";

interface PlaceOrderResultModalProps {
  result?: PlaceOrderResult;
  onRequestClose: () => void;
}
const PlaceOrderResultModal: React.FC<PlaceOrderResultModalProps> = ({
  result,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={!!result}
      onRequestClose={onRequestClose}
      contentLabel="Place Order Result"
      style={{
        content: {
          top: "30%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#ececec",
          border: "1px solid #8c8c8c",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
        },
      }}
    >
      <h2
        className={`text-lg font-semibold ${result?.error ? "text-red-700" : "text-green-700"}`}
      >
        {result?.error
          ? "Oops! Something Went Wrong"
          : "Order Placed Successfully"}
      </h2>
      <p>{result?.error ? result.message : "Thank you for shopping with us"}</p>
      <div className="pt-3 flex justify-center">
        <Button className="bg-blue-500 py-1 px-4 m-1" onClick={onRequestClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default PlaceOrderResultModal;
