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
    <div className="flex flex-wrap gap-1 justify-around  w-full mt-1 ">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card className="@container/card w-48  p-1 gap-0 bg-accent" key={index}>
          <CardHeader className="">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-3xl ">
              {productsNum ?? 0}
            </CardTitle>
          </CardHeader>
          <CardFooter className=" flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-1 font-medium">
              {/* Trending up this month <IconTrendingUp className="size-4" /> */}
            </div>
            <div className="text-muted-foreground text-sm">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
