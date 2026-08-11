import { useState } from "react";
import { Pagination } from "@codellyson/justui/react";

function Demo() {
  const [page, setPage] = useState(1);
  return (
    <div className="space-y-3">
      <Pagination page={page} total={9} onChange={setPage} />
      <p className="text-xs text-muted">page <code>{page}</code> of 9</p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
