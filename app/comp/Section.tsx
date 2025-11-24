// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SectionCards({
  productsNum,
}: {
  productsNum?: number;
}) {
  return (
    <div className="flex flex-row flex-wrap border rounded overflow-hidden shadow ">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card
          className="@container/card shadow-0 rounded-none w-1/2  gap-0 p-0.5 border-0 border-b"
          key={index}
        >
          <CardHeader className="p-1 pb-0">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-3xl ">
              {productsNum ?? 0}
            </CardTitle>
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
      ))}
    </div>
  );
}
