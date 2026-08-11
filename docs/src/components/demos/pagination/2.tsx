import { Pagination } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="space-y-4">
      <Pagination page={12} total={40} onChange={() => {}} siblings={0} boundaries={1} />
      <Pagination page={12} total={40} onChange={() => {}} />
      <Pagination page={12} total={40} onChange={() => {}} siblings={2} boundaries={3} />
    </div>
  );
}
