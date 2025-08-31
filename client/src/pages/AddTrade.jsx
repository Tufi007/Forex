import { useState } from "react";
import TradeForm from "../components/TradeForm";

function AddTrade() {
  const [trades, setTrades] = useState([]);

  const handleAddTrade = (trade) => {
    setTrades([...trades, trade]); // Add new trade to state
    console.log("Trade Added:", trade);
  };

  return (
    <div className="space-y-6">
      <TradeForm onSubmit={handleAddTrade} />

      {/* Show added trades */}
      <div className="max-w-md mx-auto mt-6">
        <h3 className="text-lg font-bold mb-2">Recent Trades</h3>
        {trades.length === 0 && <p>No trades yet</p>}
        <ul className="space-y-2">
          {trades.map((t, index) => (
            <li
              key={index}
              className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
            >
              {t.date} - {t.name} - ${t.profit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AddTrade;
