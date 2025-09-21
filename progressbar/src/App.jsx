import "./App.css";
import ProgressBar from "./components/ProgressBar";

function App() {
  const bars = [5, 2, 10, 100, 80, 60];
  return (
    <>
      {bars?.map((bar) => (
        <ProgressBar progress={bar} />
      ))}
    </>
  );
}

export default App;
