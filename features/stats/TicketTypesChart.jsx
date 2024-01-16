import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function TicketTypesChart({ data }) {
  return (
    <>
      <ResponsiveContainer width={400} height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="label"
            dataKey="ticketsNo"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default TicketTypesChart;
