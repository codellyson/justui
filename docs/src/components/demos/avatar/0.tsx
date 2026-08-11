import { Avatar } from "@codellyson/justui/react";

const face = (hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="100%" height="100%" fill="hsl(${hue} 45% 45%)"/><circle cx="48" cy="38" r="16" fill="rgba(255,255,255,.85)"/><ellipse cx="48" cy="86" rx="28" ry="24" fill="rgba(255,255,255,.85)"/></svg>`
  )}`;

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-4">
    <Avatar src={face(210)} name="Ada Lovelace" />
    <Avatar name="Ada Lovelace" />
    <Avatar name="Grace" />
    <Avatar />
    <Avatar name="Ada Lovelace" radius="md" />
  </div>
  );
}
