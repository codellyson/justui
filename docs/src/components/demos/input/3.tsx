import { Input } from "@codellyson/justui/react";
import { MagnifyingGlassIcon, XMarkIcon } from "../../icons";

export default function JustuiDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <Input placeholder="Search" leftIcon={<MagnifyingGlassIcon />} />
      <Input placeholder="Larger icon" leftIcon={<MagnifyingGlassIcon />} iconSize="lg" />
      <Input placeholder="Clearable" defaultValue="something" rightIcon={<XMarkIcon />} onRightIconClick={() => {}} />
    </div>
  );
}
