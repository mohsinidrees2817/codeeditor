import React, { useState } from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompressAlt, faExpandAlt } from "@fortawesome/free-solid-svg-icons"

import { Controlled } from "react-codemirror2";

export default function Editor(props) {
  const { language, displayname, value, onChange } = props; 

  function handleChange(editor, data, value) {
    onChange(value);
  }

  const [open, setOpen] = useState(true);

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayname}
        <button onClick={()=>setOpen(prevOpen => !prevOpen)}
        type="button"
        className="expand-collapse-btn">
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt}/>
        </button>
      </div>
      <Controlled
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
}
