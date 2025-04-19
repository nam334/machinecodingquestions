import React, { useEffect, useState } from "react";

const FileExplorerMenu = ({
  dataSetOne,
  setFileExplorerData,
  deleteItemHandler,
  addItem,
  selectType,
  setSelectType,
  addValue,
  editValue,
  editSelectHandler,
  setAddValue,
  setEditValue,
}) => {
  const [toggle, setToggle] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const [showEditInput, setEditInput] = useState(false);

  const { name = "", type = "", id = "" } = dataSetOne || {};
  console.log(dataSetOne?.children?.length, toggle);
  const toggleItems = () => setToggle((prev) => !prev);
  const addItemHandler = () => {
    setShowInput(true);
  };
  const closeItemHandler = () => {
    setShowInput(false);
  };
  const cancelItemHandler = () => {
    // setShowInput(false);
    setAddValue("");
    setSelectType("");
  };

  const editItemHandler = () => {
    setEditInput((prev) => !prev);
  };

  const editCancelHandler = () => {
    setEditValue("");
  };

  useEffect(() => {
    console.log("toggle", toggle);
  }, [toggle]);

  useEffect(() => {
    setEditValue(dataSetOne?.name);
  }, [dataSetOne]);
  return (
    <>
      <div className="fileMenuParentItem">
        {type === "directory" ? "📁" : "📄"}
        {name}
        <span>
          {dataSetOne?.children?.length > 0 ? (
            toggle ? (
              <i
                className="fa fa-angle-double-up"
                aria-hidden="true"
                onClick={toggleItems}
              ></i>
            ) : (
              <i
                className="fa fa-angle-double-down"
                aria-hidden="true"
                onClick={toggleItems}
              ></i>
            )
          ) : null}

          {type === "directory" ? (
            !showInput ? (
              <button className="addButton" onClick={addItemHandler}>
                +
              </button>
            ) : (
              <button className="addButton" onClick={closeItemHandler}>
                -
              </button>
            )
          ) : null}

          <button className="addButton" onClick={() => deleteItemHandler(id)}>
            🗑️
          </button>
          <button className="addButton" onClick={editItemHandler}>
            ✏️
          </button>
        </span>
      </div>
      {showInput && (
        <>
          <div className="addItemContainer">
            <input
              type="text"
              className="inputBox"
              placeholder="Enter item name"
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
            />
            <span>Select Type :</span>
            <div>
              <input
                type="radio"
                name="type"
                value="directory"
                onChange={() => setSelectType("directory")}
              />
              Directory
              <input
                type="radio"
                name="type"
                value="file"
                onChange={() => setSelectType("file")}
              />
              File
            </div>
            <div className="buttonContainer">
              <button onClick={addItem}>Add</button>
              <button onClick={cancelItemHandler}>Clear</button>
            </div>
          </div>
        </>
      )}
      {showEditInput && (
        <>
          <div className="editItemContainer">
            <input
              type="text"
              className="inputBox"
              placeholder="Enter item name"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <div>
              <button onClick={() => editSelectHandler(id, name)}>✅</button>
              <button onClick={editCancelHandler}>❌</button>
            </div>
          </div>
        </>
      )}
      {toggle > 0 ? (
        <>
          {dataSetOne?.children?.map((childItem) => (
            <FileExplorerMenu
              key={childItem.id}
              dataSetOne={childItem}
              setFileExplorerData={setFileExplorerData}
              deleteItemHandler={deleteItemHandler}
              addItem={addItem}
              selectType={selectType}
              setSelectType={setSelectType}
              addValue={addValue}
              setAddValue={setAddValue}
              editSelectHandler={(id, name) => editSelectHandler(id, name)}
              setEditValue={setEditValue}
            />
          ))}
        </>
      ) : null}
    </>
  );
};

export default FileExplorerMenu;
