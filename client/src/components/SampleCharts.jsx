import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Trade A", profit: 400 },
  { name: "Trade B", profit: 300 },
  { name: "Trade C", profit: -200 },
  { name: "Trade D", profit: 800 },
];

function SampleChart() {
  return (
    <div className="w-full h-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="profit" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SampleChart;
