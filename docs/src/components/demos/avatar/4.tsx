import { Avatar, WithBadge } from "@codellyson/justui/react";

const face = (hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="100%" height="100%" fill="hsl(${hue} 45% 45%)"/><circle cx="48" cy="38" r="16" fill="rgba(255,255,255,.85)"/><ellipse cx="48" cy="86" rx="28" ry="24" fill="rgba(255,255,255,.85)"/></svg>`
  )}`;

export default function JustuiDemo() {
  return (
    <div className="flex items-center gap-6">
    <WithBadge badge="" color="green" position="bottom-right" badgeClassName="h-3 w-3 min-w-0 p-0">
      <Avatar src={face(150)} name="Ada Lovelace" />
    </WithBadge>
    <WithBadge badge="" color="gray" position="bottom-right" badgeClassName="h-3 w-3 min-w-0 p-0">
      <Avatar name="Bo Nguyen" />
    </WithBadge>
    <WithBadge badge="3" color="red">
      <Avatar name="Cy Park" radius="md" />
    </WithBadge>
  </div>
  );
}
