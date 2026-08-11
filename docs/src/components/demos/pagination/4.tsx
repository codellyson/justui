import { Pagination } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <div className="space-y-2">
      <Pagination page={1} total={1} onChange={() => {}} />
      <p className="text-xs text-muted">↑ nothing above this line — total is 1</p>
      <Pagination page={1} total={2} onChange={() => {}} />
    </div>
  );
}
