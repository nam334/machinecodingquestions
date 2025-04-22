import React, { useCallback, useState } from "react";
import FileExplorerMenu from "./FileExplorerMenu";
import { dataSetOne } from "../utils/data";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [fileExplorerData, setFileExplorerData] = useState(dataSetOne);
  const [selectType, setSelectType] = useState("");
  const [addValue, setAddValue] = useState("");
  const [editValue, setEditValue] = useState(dataSetOne?.name);

  const addItem = useCallback(
    (pid) => {
      let itemname;
      if (selectType === "file") itemname = addValue + ".txt";
      const item = {
        id: uuidv4(),
        name: selectType === "file" ? itemname : addValue,
        type: selectType,
      };
      if (selectType === "directory") item.children = [];
      //make a copy
      const copyData = JSON.parse(JSON.stringify(fileExplorerData));
      addToParent(copyData, pid);
      function addToParent(node, pid) {
        if (node.id === pid) {
          if (!node.children) node.children = [];
          node.children.push(item);
          return true;
        }
        if (node.children) {
          for (let child of node.children) {
            if (child.type === "directory") {
              if (addToParent(child, pid)) return true;
            }
          }
        }
      }

      setFileExplorerData(copyData);
    },
    [addValue, fileExplorerData, selectType]
  );

  const deleteItemHandler = useCallback(
    (id) => {
      //check for root
      if (dataSetOne?.id === id) {
        setFileExplorerData(null);
        return;
      }

      const removeData = (node) => {
        if (!node.children) return;

        node.children = node?.children?.filter((child) => child.id !== id);
        for (const child of node.children) {
          removeData(child);
        }
      };
      const copyData = JSON.parse(JSON.stringify(fileExplorerData));
      removeData(copyData);
      setFileExplorerData(copyData);
    },
    [fileExplorerData]
  );

  const editSelectHandler = useCallback(
    (id) => {
      //COPY THE DATA
      const copyData = JSON.parse(JSON.stringify(fileExplorerData));
      const editName = (node) => {
        if (node.id === id) {
          node.name = editValue;
          return true;
        }
        if (node.children) {
          for (let child of node.children) {
            if (editName(child)) return true;
          }
        }
      };
      editName(copyData);
      setFileExplorerData(copyData);
    },
    [fileExplorerData, editValue]
  );

  return (
    <>
      <div className="explorer">EXPLORER</div>
      <div className="fileMenu">
        {" "}
        <FileExplorerMenu
          dataSetOne={fileExplorerData}
          setFileExplorerData={setFileExplorerData}
          deleteItemHandler={(id) => deleteItemHandler(id)}
          addItem={addItem}
          selectType={selectType}
          setSelectType={setSelectType}
          addValue={addValue}
          setAddValue={setAddValue}
          editValue={editValue}
          editSelectHandler={(id, name) => editSelectHandler(id, name)}
          setEditValue={setEditValue}
        />
      </div>
    </>
  );
};
export default Home;
