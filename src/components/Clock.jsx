import useClock from "../hooks/useClock";

function Clock() {
  const time = useClock();
  return <div className="font-mono text-lg">{time}</div>;
}

export default Clock;
