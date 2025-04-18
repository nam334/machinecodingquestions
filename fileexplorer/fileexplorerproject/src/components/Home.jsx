import React from "react";
import FileExplorerMenu from "./FileExplorerMenu";
import { dataSetOne } from "../utils/data";
const Home = () => {
  return (
    <>
      <div className="fileMenu">
        {" "}
        <FileExplorerMenu dataSetOne={dataSetOne} />
      </div>
    </>
  );
};
export default Home;
