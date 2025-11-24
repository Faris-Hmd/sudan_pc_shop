import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function RadialCounter({
  percent = 0,
  size = 48,
  stroke = 6,
}: {
  percent?: number;
  size?: number;
  stroke?: number;
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (percent / 100) * circumference;
  const strokeColor = "#3b82f6"; // blue shade
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="inline-block"
    >
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle
          r={radius}
          fill="transparent"
          stroke="#e6eefc"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <circle
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeDashoffset={0}
          transform="rotate(-90)"
        />
        <text
          x="0"
          y="0"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-xs font-medium fill-foreground"
          style={{ fontSize: Math.max(10, size * 0.22) }}
        >
          {`${percent}%`}
        </text>
      </g>
    </svg>
  );
}

export default function SectionCards({
  productsNum,
}: {
  productsNum?: number;
}) {
  return (
    <div className="flex flex-row flex-wrap border rounded overflow-hidden shadow ">
      {Array.from({ length: 4 }).map((_, index) => {
        // derive a small percent for each card (varies by index)
        const base = Math.max(1, productsNum ?? 0);
        const denom = base + (index + 1) * 50; // simple variation so each card differs
        const percent =
          base === 0 ? 0 : Math.min(100, Math.round((base / denom) * 100));

        return (
          <Card
            className="@container/card shadow-0 rounded-none w-1/2  gap-0 p-0.5 border-0 border-b"
            key={index}
          >
            <CardHeader className="p-1 pb-0 flex items-center justify-between">
              <div>
                <CardDescription>Total Products</CardDescription>
                <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-3xl ">
                  {productsNum ?? 0}
                </CardTitle>
              </div>

              {/* small radial counter */}
              <div className="ml-2">
                <RadialCounter percent={percent} size={48} stroke={6} />
              </div>
            </CardHeader>
            <CardFooter className=" flex-col items-start gap-1.5 text-sm p-2 pt-0 pb-0">
              <div className="line-clamp-1 flex gap-1 font-medium">
                {/* Trending up this month <IconTrendingUp className="size-4" /> */}
              </div>
              <div className="text-muted-foreground text-xs">
                <small>Visitors for the last 6 months</small>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
