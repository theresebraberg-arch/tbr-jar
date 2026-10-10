
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
  const visiblePapers = Math.min(bookCount, 24);

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
          {Array.from({ length: visiblePapers }, (_, index) => (
            <div
              key={index}
              className="jar-paper"
              style={{
                "--paper-color": paperColors[index % paperColors.length],
                "--paper-rotation": `${(index * 47) % 80 - 40}deg`,
                "--paper-left": `${12 + (index * 37) % 70}%`,
                "--paper-bottom": `${8 + Math.floor(index / 6) * 21}%`,
              }}
            />
          ))}
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
