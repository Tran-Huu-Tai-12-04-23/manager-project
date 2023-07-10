import React, { useState } from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CodePreview from "./CodePreview";
import { Button } from "@mui/material";

const TextEditor = ({ setDescription, description }) => {

  const editorConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "link",
        "bulletedList",
        "numberedList",
        "|",
        "alignment",
        "indent",
        "outdent",
        "|",
        "blockQuote",
        "undo",
        "redo",
      ],
    },
    language: "en",
    image: {
      styles: ["full", "alignLeft", "alignRight"],
    },
  };

  const handleEditorChange = (event, editor) => {
    const newData = editor.getData();
    setDescription(newData);
  };

  return (
    <div className="ckeditor-container">
      <CKEditor
        editor={Editor}
        config={editorConfig}
        data={description}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default TextEditor;
