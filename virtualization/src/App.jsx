import { useState } from "react";
import { AutoSizer, List } from "react-virtualized";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const size = 10000;
  const fetchData = () => {
    setTimeout(() => {
      const arr = new Array(size).fill(0).map((_, i) => `Item ${i + 1}`);
      setData(arr);
    }, 1000);
  };

  const rowRenderer = ({ style, key, index }) => {
    return (
      <div
        key={key}
        style={{
          ...style,
        }}
      >
        {data[index]}
      </div>
    );
  };
  return (
    <>
      <button style={{ border: "1px solid black" }} onClick={fetchData}>
        Generate button
      </button>
      {/* <div style={{ margin: "1rem", height: "500px", overflowY: "scroll" }}>
        <div>{list && renderData()}</div>
      </div> */}
      {data.length > 0 && (
        <div style={{ margin: "1rem", height: "500px" }}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                rowCount={data?.length}
                rowHeight={40}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        </div>
      )}
    </>
  );
}

export default App;
