import { useState, useEffect } from "react";

import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import ProductCard from "./ProductCard";
import ErrorBoundary from "./ErrorBoundary";

const PAGE_SIZE = 10;

const Pagination = () => {
  const [fetchedData, setFetchedData] = useState("");
  const [pageSize, setPageSize] = useState(0);
  const [startCount, setStartCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://dummyjson.com/products?limit=200`);
      const result = await data.json();

      setFetchedData(result.products);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(fetchedData);
    const totalNumberOfPages = Math.ceil(fetchedData?.length / PAGE_SIZE);

    // console.log(totalNumberOfPages);
    setPageSize(totalNumberOfPages);
  }, [fetchedData]);

  useEffect(() => {
    console.log(startCount);
  }, [startCount]);

  const pageCountandler = (index) => {
    const pageNumber = index + 1;
    let count = pageNumber * PAGE_SIZE - PAGE_SIZE;
    //1 - 0 to 9 index
    //2 - 10 to 19index
    setStartCount(count);
  };
  return (
    <div>
      <h1>Pagination</h1>
      <div>
        <button
          onClick={() => setStartCount((prev) => prev - PAGE_SIZE)}
          disabled={startCount - PAGE_SIZE < 0}
        >
          <FiChevronsLeft />
        </button>
        {pageSize > 0 &&
          new Array(pageSize).fill(0)?.map((pageNumber, index) => (
            <button
              onClick={() => pageCountandler(index)}
              style={{
                backgroundColor:
                  index === startCount / PAGE_SIZE ? "lightblue" : "",
              }}
            >
              {index + 1}
            </button>
          ))}
        <button
          onClick={() => setStartCount((prev) => prev + PAGE_SIZE)}
          disabled={startCount + PAGE_SIZE >= fetchedData?.length}
        >
          <FiChevronsRight />
        </button>
        <ErrorBoundary>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {fetchedData?.length
              ? fetchedData
                  .slice(startCount, startCount + PAGE_SIZE)
                  ?.map(({ images, title }) => (
                    <ProductCard image={images} title={title} />
                  ))
              : "No products found"}
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};
export default Pagination;
