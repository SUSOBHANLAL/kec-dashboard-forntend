export default function SummaryCards({ data }) {
  return (
    <div className="grid grid-cols-5 gap-4">
      <Card title="Price" value={data.price} />
      <Card title="Change %" value={data.change_pct} />
      <Card title="Volume" value={data.volume} />
      <Card title="52W High" value={data.high_52w} />
      <Card title="52W Low" value={data.low_52w} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-xl font-bold">{value}</h2>
    </div>
  );
}