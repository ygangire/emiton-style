import type { CSSProperties } from "react";

interface AvatarProps {
  name?: string | null;
  image?: string | null;
  size?: number;
}

function getInitials(name?: string | null) {
  if (!name) {
    return "U";
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "U";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Avatar({ name, image, size = 40 }: AvatarProps) {
  const initials = getInitials(name);
  const style: CSSProperties = {
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
  };

  if (image) {
    return (
      <img
        src={image}
        alt={name ?? "User avatar"}
        className="rounded-full object-cover ring-2 ring-white"
        style={style}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full bg-[#C89B3C] font-semibold text-white ring-2 ring-white"
      style={style}
    >
      {initials}
    </div>
  );
}
