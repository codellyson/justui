import { useState } from "react";
import { Pagination } from "@codellyson/justui/react";

function Demo() {
  const [page, setPage] = useState(9);
  return (
    <div className="space-y-3">
      <Pagination page={page} total={40} onChange={setPage} />
      <p className="text-xs text-muted">
        page <code>{page}</code> of 40 — walk to the middle and back
      </p>
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
