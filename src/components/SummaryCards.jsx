export default function SummaryCards({ data }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <Card title="Current Price" value={data.price} />
      <Card title="52W High" value={data.high_52w} />
      <Card title="52W Low" value={data.low_52w} />
      <Card title="Change %" value={data.change_pct} />

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-900 p-4 rounded-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}