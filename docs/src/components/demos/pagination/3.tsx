import { Pagination } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="space-y-4">
      <Pagination size="xs" page={3} total={12} onChange={() => {}} />
      <Pagination size="sm" page={3} total={12} onChange={() => {}} />
      <Pagination size="lg" page={3} total={12} onChange={() => {}} />
      <Pagination page={3} total={12} onChange={() => {}} withControls={false} />
      <Pagination page={3} total={12} onChange={() => {}} disabled />
    </div>
  );
}
