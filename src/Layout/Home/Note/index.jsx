import { useState } from "react";
import NoteItem from "./NoteItem";
import TextEditor from "../../../Component/TextEditor";

import RenderQuillHTML from "../../../Component/CodePreview";

function Note() {
  const [textNoteHtml, setTextNoteHtml] = useState();
  return (
    <div className="p-4">
      <NoteItem></NoteItem>
      <div className="p-4 border-t-1 border-solid border-blur-light dark:border-blur-dark">
        <TextEditor setTextNoteHtml={setTextNoteHtml}></TextEditor>
      </div>
    </div>
  );
}

export default Note;
