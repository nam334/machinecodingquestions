import React, { useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
const FileExplorerMenu = React.memo(
  ({
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
    // console.log("FileExplorerMenu is rendering");
    const [toggle, setToggle] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [showEditInput, setEditInput] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadedChildren, setLoadedChildren] = useState([]);
    const { name = "", type = "", id = "" } = dataSetOne || {};

    const toggleItems = () => {
      setToggle((prev) => !prev);
    };

    useEffect(() => {
      if (toggle) {
        if (dataSetOne?.children.length) {
          setLoading(true);
          const timer = setTimeout(() => {
            setLoadedChildren(dataSetOne.children);
            setLoading(false);
          }, 500);

          return () => clearTimeout(timer);
        }
      }
    }, [toggle, dataSetOne.children]);

    const addItemHandler = () => {
      setShowInput(true);
      setAddValue("");
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
                <button onClick={() => addItem(id)}>Add</button>
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

        {toggle &&
          (loading ? <span className="loadingText">Loading...</span> : null)}

        {/* {toggle &&
          !loading &&
          loadedChildren?.map((childItem) => (
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
          ))} */}

        {toggle && !loading && loadedChildren?.length > 0 && (
          <List
            height={400}
            itemCount={loadedChildren.length}
            itemSize={40}
            width={"100%"}
            itemData={{
              children: loadedChildren,
              props: {
                setFileExplorerData,
                deleteItemHandler,
                addItem,
                selectType,
                setSelectType,
                addValue,
                setAddValue,
                editSelectHandler,
                setEditValue,
              },
            }}
          >
            {({ index, style, data }) => {
              const child = data.children[index];
              const props = data.props;
              return (
                <div style={style}>
                  <FileExplorerMenu
                    key={child.id}
                    dataSetOne={child}
                    {...props}
                  />
                </div>
              );
            }}
          </List>
        )}
      </>
    );
  }
);

export default FileExplorerMenu;
