import { Button, Dialog } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <Dialog>
      <Dialog.Target asChild>
        <Button variant="outline">Blurred backdrop, no ✕</Button>
      </Dialog.Target>
      <Dialog.Content withCloseButton={false} overlayClassName="bg-bg/70 backdrop-blur-md" className="max-w-sm">
        <Dialog.Header>
          <Dialog.Title>Confirm</Dialog.Title>
          <Dialog.Description>Escape and click-outside still close it.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild><Button>Got it</Button></Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
