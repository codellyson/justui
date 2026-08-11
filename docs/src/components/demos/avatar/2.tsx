import { Avatar } from "@codellyson/justui/react";

const face = (hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="100%" height="100%" fill="hsl(${hue} 45% 45%)"/><circle cx="48" cy="38" r="16" fill="rgba(255,255,255,.85)"/><ellipse cx="48" cy="86" rx="28" ry="24" fill="rgba(255,255,255,.85)"/></svg>`
  )}`;

export default function JustuiDemo() {
  return (
    <div className="flex items-end gap-4">
    {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
      <div key={size} className="flex flex-col items-center gap-2">
        <Avatar size={size} src={face(150)} name="Ada Lovelace" />
        <span className="font-mono text-[10px] text-muted">{size}</span>
      </div>
    ))}
  </div>
  );
}
