import { useForm } from "react-hook-form";

function TradeForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);
    reset(); // Clear form after submit
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-xl font-bold mb-2 text-center">Add New Trade</h2>

      {/* Trade Name */}
      <div>
        <label className="block mb-1 font-medium">Trade Name</label>
        <input
          {...register("name", { required: "Trade name is required" })}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700"
          placeholder="e.g., EUR/USD Long"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Profit */}
      <div>
        <label className="block mb-1 font-medium">Profit (USD)</label>
        <input
          type="number"
          {...register("profit", {
            required: "Profit value is required",
            valueAsNumber: true,
          })}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700"
          placeholder="e.g., 150"
        />
        {errors.profit && <p className="text-red-500 text-sm">{errors.profit.message}</p>}
      </div>

      {/* Date */}
      <div>
        <label className="block mb-1 font-medium">Date</label>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-400 dark:bg-gray-700"
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
      >
        Add Trade
      </button>
    </form>
  );
}

export default TradeForm;
