import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#a855f7",
  "#f97316",
  "#ef4444",
  "#06b6d4",
  "#eab308",
  "#ec4899",
];

const CourseDistributionChart = ({ data }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-xl">

      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white">
          Course Distribution
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Enrollment distribution by course
        </p>
      </div>

      <div className="h-[350px] w-full">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="enrollments"
              nameKey="course"
              cx="50%"
              cy="45%"
              innerRadius={75}
              outerRadius={120}
              paddingAngle={3}
              labelLine={false}
            >

              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value, name) => [
                value,
                name,
              ]}
            />

            <Legend
              verticalAlign="bottom"
              height={50}
              wrapperStyle={{
                color: "#cbd5e1",
              }}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default CourseDistributionChart;