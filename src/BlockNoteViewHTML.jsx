import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

const handleUpload = async (file) => {
  console.log(file);
};

export default function BlockNoteViewHTML() {
  const html = localStorage.getItem("htmlContent");
  console.log(html);

  const editor = useCreateBlockNote({
    initialContent: html ? JSON.parse(html) : undefined,
    uploadFile: handleUpload,
    // onEditorContentChange: (editor) => {
    //   onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    // },
  });

  // Creates a new editor instance.

  // Renders the editor instance using a React component.
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1100px",
      }}
    >
      <BlockNoteView
        editor={editor}
        editable={false}
        // onChange={() => {
        //   // Saves the document JSON to state.
        //   props?.setHTML(editor.document);
        // }}
      />
    </div>
  );
}
