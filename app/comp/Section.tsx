// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SectionCards() {
  return (
    <div className="flex flex-wrap gap-1 justify-around  w-full ">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card className="@container/card w-50 p-1 gap-0 bg-accent">
          <CardHeader className="">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-1xl font-semibold tabular-nums @[250px]/card:text-3xl ">
              $1,250.00
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
