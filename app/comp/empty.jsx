import { Search } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export default function EmptyMuted() {
  return (
    <Empty className="from-muted/80 to-background h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>No Products</EmptyTitle>
        <EmptyDescription>try search something</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
