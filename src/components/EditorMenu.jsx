import React from "react";
import { Link } from "react-router-dom";

const EditorMenu = ({ save }) => {
  return (
    <div className="editor-menu">
      <Link to="/notes/new">
        <div className="clickable editor-menu-option">
          <i className="fa fa-plus" aria-hidden="true" />
          <span> New Note</span>
        </div>
      </Link>
      <div className="clickable editor-menu-option" onClick={save}>
        <i className="fa fa-floppy-o" aria-hidden="true" />
        <span> Save</span>
      </div>
    </div>
  );
};

export default EditorMenu;