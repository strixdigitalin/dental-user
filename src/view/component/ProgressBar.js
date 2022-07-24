export default function ProgressBar({ progress }) {
  return (
    <div>
      <div
        style={{
          height: "4vh",
          width: "15vw",
          backgroundColor: "rgb(234, 234, 234)",
          borderRadius: "20px",
          margin: "1rem",
        }}
      >
        <div
          style={{
            height: "4vh",
            width: `${progress}%`,
            backgroundColor: "rgb(117, 255, 124)",
            borderRadius: `20px ${progress === 100 ? 20 : 0}px ${
              progress === 100 ? 20 : 0
            }px 20px`,
            transition: "width 1.2s",
          }}
        ></div>
      </div>
    </div>
  );
}
