import React, { useState } from "react";

const FileExplorerMenu = ({ dataSetOne }) => {
  const [toggle, setToggle] = useState(false);
  const { name, type } = dataSetOne;
  const children = dataSetOne?.children;
  const toggleItems = () => setToggle((prev) => !prev);
  return (
    <>
      <div className="fileMenuParentItem">
        {type === "directory" ? "📁" : "📄"}
        {name}
        {dataSetOne?.children?.length > 0 ? (
          toggle ? (
            <i
              class="fa fa-angle-double-up"
              aria-hidden="true"
              onClick={toggleItems}
            ></i>
          ) : (
            <i
              class="fa fa-angle-double-down"
              aria-hidden="true"
              onClick={toggleItems}
            ></i>
          )
        ) : null}
      </div>
      {toggle > 0 ? (
        <>
          {children?.map((childItem) => (
            <FileExplorerMenu dataSetOne={childItem} />
          ))}
        </>
      ) : null}
    </>
  );
};

export default FileExplorerMenu;
