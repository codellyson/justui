import { Avatar, AvatarGroup } from "@codellyson/justui/react";

const face = (hue) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="100%" height="100%" fill="hsl(${hue} 45% 45%)"/><circle cx="48" cy="38" r="16" fill="rgba(255,255,255,.85)"/><ellipse cx="48" cy="86" rx="28" ry="24" fill="rgba(255,255,255,.85)"/></svg>`
  )}`;

const people = [
  { name: 'Ada Lovelace', hue: 210 },
  { name: 'Bo Nguyen', hue: 150 },
  { name: 'Cy Park', hue: 20 },
  { name: 'Di Alvarez', hue: 265 },
  { name: 'Eve Okafor', hue: 320 },
];

export default function JustuiDemo() {
  return (
    <div className="space-y-5">
    <AvatarGroup>
      {people.slice(0, 3).map((p) => (
        <Avatar key={p.name} src={face(p.hue)} name={p.name} />
      ))}
    </AvatarGroup>

    <AvatarGroup max={3}>
      {people.map((p) => (
        <Avatar key={p.name} src={face(p.hue)} name={p.name} />
      ))}
    </AvatarGroup>

    <AvatarGroup max={2} size="sm" spacing="sm">
      {people.map((p) => (
        <Avatar key={p.name} size="sm" name={p.name} />
      ))}
    </AvatarGroup>
  </div>
  );
}
