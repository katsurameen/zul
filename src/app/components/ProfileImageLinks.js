function PixelSword() {
  // 5x12 vertical 8-bit sword: blade, guard, handle
  const rows = [
    "..B..",
    "..B..",
    "..B..",
    "..B..",
    "..B..",
    "..B..",
    "..B..",
    "GGGGG",
    "..H..",
    "..H..",
    ".HHH.",
  ];
  const colors = { B: "#e5e5e5", G: "#facc15", H: "#737373" };
  return (
    <svg
      viewBox="0 0 5 11"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="w-5 h-11 sm:w-6 sm:h-13"
    >
      {rows.map((row, y) =>
        row.split("").map((cell, x) =>
          cell === "." ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[cell]} />
          )
        )
      )}
    </svg>
  );
}

function PixelHeart() {
  // 7x6 8-bit heart, crisp squares only
  const rows = [
    "0110110",
    "1111111",
    "1111111",
    "0111110",
    "0011100",
    "0001000",
  ];
  return (
    <svg
      viewBox="0 0 7 6"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="w-6 h-6 sm:w-7 sm:h-7"
    >
      {rows.map((row, y) =>
        row.split("").map((cell, x) =>
          cell === "1" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#ff004d" />
          ) : null
        )
      )}
    </svg>
  );
}

export default function ProfileImageLinks() {
  return (
    <section className="flex flex-col items-center w-full sm:w-auto shrink-0">
      <div className="relative">
        {/* Viewfinder corner brackets */}
        <span aria-hidden="true" className="pointer-events-none absolute -top-3 -left-3 w-4 h-4 border-t-2 border-l-2 border-neutral-500" />
        <span aria-hidden="true" className="pointer-events-none absolute -top-3 -right-3 w-4 h-4 border-t-2 border-r-2 border-neutral-500" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-3 -left-3 w-4 h-4 border-b-2 border-l-2 border-neutral-500" />
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-3 -right-3 w-4 h-4 border-b-2 border-r-2 border-neutral-500" />

        {/* Location chip */}
        <span className="absolute -top-4 -left-2 sm:-left-5 z-10 text-[8px] px-2 py-1 bg-yellow-400 text-black border-2 border-black">
          BDG / GMT+7
        </span>

        {/* Availability chip removed: HP bar below carries the ready-state instead */}

        {/* Pixel sword accent (left counterweight to the heart) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 -left-4 sm:-left-9 z-10 p-1 bg-[#1a1a1a] border-2 border-neutral-600"
          style={{ boxShadow: "3px 3px 0 0 #000" }}
        >
          <PixelSword />
        </span>

        {/* Pixel heart accent */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 -right-4 sm:-right-9 z-10 p-1 bg-[#1a1a1a] border-2 border-neutral-600"
          style={{ boxShadow: "3px 3px 0 0 #000" }}
        >
          <PixelHeart />
        </span>

        <div className="pixel-panel bg-[#1a1a1a] border-2 border-neutral-600 p-3 max-w-full">
          <img
            src="/Images/zul.jpg"
            alt="Profile"
            className="w-36 h-36 sm:w-52 sm:h-52 object-cover max-w-full"
          />
          <div className="flex items-center justify-between mt-3 text-[8px] text-neutral-400">
            <span>PLAYER_01</span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 bg-green-400" /> ONLINE
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[8px] text-neutral-400">HP</span>
            <div className="flex flex-1 gap-[2px]" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="h-2 flex-1 bg-green-400" />
              ))}
            </div>
            <span className="text-[8px] text-neutral-400">100</span>
          </div>
        </div>
      </div>
    </section>
  );
}
