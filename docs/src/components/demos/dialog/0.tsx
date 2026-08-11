import { Button, Dialog, Input } from "@codellyson/justui/react";

export default function JustuiDemo() {
  return (
    <Dialog>
      <Dialog.Target asChild>
        <Button>Invite a teammate</Button>
      </Dialog.Target>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Invite a teammate</Dialog.Title>
          <Dialog.Description>
            They'll get an email with a link that expires in 7 days.
          </Dialog.Description>
        </Dialog.Header>
        <Input label="Email" placeholder="teammate@example.com" />
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="ghost" color="gray">Cancel</Button>
          </Dialog.Close>
          <Button>Send invite</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
