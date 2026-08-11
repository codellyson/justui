import { useState } from "react";
import { Textarea } from "@codellyson/justui/react";

function Demo() {
  const [notes, setNotes] = useState('');
  const tooLong = notes.length > 80;
  return (
    <div className="w-full max-w-sm space-y-2">
      <Textarea
        label="Notes"
        value={notes}
        onChange={setNotes}
        rows={4}
        error={tooLong && 'Keep it under 80 characters.'}
        description={`${notes.length}/80`}
      />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
