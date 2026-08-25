import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const EnrollmentTrendChart = ({ data }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-xl">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Enrollment Trend
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Monthly enrollment activity
        </p>
      </div>

      <div className="h-[350px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="month"
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              allowDecimals={false}
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8" }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
              labelStyle={{
                color: "#cbd5e1",
              }}
            />

            <Line
              type="monotone"
              dataKey="enrollments"
              stroke="#a78bfa"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#a78bfa",
              }}
              activeDot={{
                r: 7,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default EnrollmentTrendChart;