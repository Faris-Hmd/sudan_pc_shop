import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Import relevant icons for context
import { Package, TrendingUp, Users, DollarSign, Activity } from "lucide-react";

// Data array for dynamic mapping and varied content
const cardData = [
  {
    title: "Total Products",
    icon: Package,
    footerText: "Trending up this month",
    trend: 5,
    isPositive: true,
  },
  {
    title: "Total Sales",
    icon: DollarSign,
    footerText: "Since last week",
    trend: 12,
    isPositive: true,
  },
  {
    title: "Visitors",
    icon: Users,
    footerText: "Last 6 months",
    trend: 2,
    isPositive: true,
  },
  {
    title: "Activity Rate",
    icon: Activity,
    footerText: "Weekly average",
    trend: 8,
    isPositive: false, // Example of a negative trend
  },
];

export default function SectionCards({
  productsNum,
}: {
  productsNum?: number;
}) {
  return (
    // Use a responsive grid layout with gaps for clean separation
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {cardData.map((card, index) => {
        // Use a consistent value for the main metric
        const mainMetric = productsNum ?? 0;
        // Example dynamic metric based on index
        const cardMetric =
          index === 0 || index === 2 ? mainMetric : mainMetric * (index + 1);

        const IconComponent = card.icon;

        // Determine text color based on trend positivity
        const trendColor = card.isPositive ? "text-green-500" : "text-red-500";

        return (
          <Card
            // Added subtle shadow and border for better visual separation and hover effect
            className="shadow-sm rounded-lg border hover:shadow-md transition-shadow duration-300"
            key={index}
          >
            <CardHeader className="px-3 py-0  flex flex-row items-center justify-between space-y-0 ">
              <div className="flex flex-col">
                <CardDescription className="text-sm font-medium text-gray-500">
                  {card.title}
                </CardDescription>
                <CardTitle className="text-2xl md:text-3xl font-bold tabular-nums">
                  {cardMetric.toLocaleString()}
                </CardTitle>
              </div>
              {/* Use icons for immediate visual context */}
              <IconComponent className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardFooter className="flex items-center justify-between p-2 pt-0">
              <div
                className={`flex items-center text-sm font-medium ${trendColor}`}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                {`+${card.trend}%`} {card.footerText}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
