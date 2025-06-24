import { useEffect, useState } from "react";
import "./App.css";
import Windowing from "./components/Windowing.jsx";
import { useDebounce } from "./hooks/useDebounce.jsx";

function App() {
  const [text, setText] = useState("");
  const debouncedValue = useDebounce(text, 500);
  console.log("Debounced value is", debouncedValue);
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/users?username_like=${debouncedValue}`
      );

      const value = await data.json();
      console.log(value);
      setFetchedData(value);
    };

    if (debouncedValue?.length) {
      fetchData();
    }
  }, [debouncedValue]);

  return (
    <>
      {/* <Windowing /> */}
      <input value={text} onChange={(e) => setText(e.target.value)} />
      {fetchedData?.length > 0 &&
        fetchedData?.map((fetchedData) => (
          <h4 key={fetchedData.id}>{fetchedData.name}</h4>
        ))}
    </>
  );
}

export default App;
