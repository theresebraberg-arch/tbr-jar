
import "./Jar.css";

const paperColors = [
  "#d8a4a8",
  "#e8c9a5",
  "#b7a1c9",
  "#d9b76e",
  "#a7b8a1",
  "#e7b8c8",
];

export default function Jar({ bookCount, isShaking = false }) {
  // En lapp per bok, upp till 80 synliga lappar.
  const visiblePapers = Math.min(Math.max(0, bookCount), 80);

  return (
    <div className={`jar-scene ${isShaking ? "shaking" : ""}`}>
      <div className="jar-glow" />

      <div className="jar-lid">
        <div className="jar-lid-top" />
        <div className="jar-lid-band" />
      </div>

      <div className="jar-glass">
        <div className="jar-highlight" />

        <div className="jar-papers">
          {Array.from({ length: visiblePapers }, (_, index) => {
            // Bygger upp högen från botten av burken.
            const layer = Math.floor(index / 8);
            const position = index % 8;

            const left =
              18 + position * 9 + ((layer * 7) % 9);

            const bottom =
              5 + layer * 12 + ((index * 3) % 7);

            return (
              <div
                key={index}
                className="jar-paper"
                style={{
                  "--paper-color":
                    paperColors[index % paperColors.length],
                  "--paper-rotation":
                    `${((index * 47) % 80) - 40}deg`,
                  "--paper-left": `${left}%`,
                  "--paper-bottom": `${bottom}%`,
                }}
              />
            );
          })}
        </div>

        <div className="jar-label">
          <span className="jar-label-star">✦</span>
          <span>TBR JAR</span>
          <span className="jar-label-star">✦</span>
        </div>
      </div>

      <div className="jar-shadow" />
    </div>
  );
}
