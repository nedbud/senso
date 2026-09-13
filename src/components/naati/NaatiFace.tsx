"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The assistant's face.
 *
 * One rendered picture per state. Only the resting one exists so far, so
 * every state points at it — replace the entries below as the other five
 * arrive and nothing else has to change, because the widget already asks
 * for the right state at the right moment.
 */
export type FaceState =
  | "idle"
  | "listening"
  | "reading"
  | "thinking"
  | "concerned"
  | "done";

const DIR = "/assets/Images/Common/naati";

const FACES: Record<FaceState, string> = {
  idle: `${DIR}/idle.webp`,
  listening: `${DIR}/idle.webp`,
  reading: `${DIR}/idle.webp`,
  thinking: `${DIR}/idle.webp`,
  concerned: `${DIR}/idle.webp`,
  done: `${DIR}/idle.webp`,
};

export default function NaatiFace({
  state = "idle",
  className = "",
  title,
}: {
  state?: FaceState;
  className?: string;
  title?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // The launcher is server-rendered, so a missing file fails before React
  // attaches onError and the handler never runs — which leaves a broken
  // image glyph in the corner of every page. Checking the element once on
  // mount catches the load that already failed.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <span
        className={`flex items-center justify-center rounded-full bg-brand-tint font-display text-brand-deep ${className}`}
        role={title ? "img" : undefined}
        aria-label={title}
      >
        সে
      </span>
    );
  }

  return (
    <img
      ref={ref}
      src={FACES[state]}
      alt={title ?? ""}
      width={512}
      height={512}
      onError={() => setFailed(true)}
      className={`rounded-full object-cover ${className}`}
    />
  );
}
