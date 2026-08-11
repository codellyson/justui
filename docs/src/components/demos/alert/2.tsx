import { useState } from "react";
import { Alert, Button } from "@codellyson/justui/react";
import { InformationCircleIcon } from "../../icons";

function Demo() {
  const [shown, setShown] = useState(true);
  return (
    <div className="w-full space-y-3">
      {shown ? (
        <Alert title="Dismissible" color="blue" icon={<InformationCircleIcon />} withCloseButton onClose={() => setShown(false)}>
          Close me.
        </Alert>
      ) : (
        <Button size="xs" variant="outline" onClick={() => setShown(true)}>Bring it back</Button>
      )}
      <Alert color="gray" title="Read-only mode — you can browse but not edit." />
    </div>
  );
}

export default function JustuiDemo() {
  return (
    <Demo />
  );
}
