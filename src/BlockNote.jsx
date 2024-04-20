import { defaultProps, filterSuggestionItems } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";

const handleUpload = async (file) => {
  console.log(file);
};

export default function Editor(props) {
  const htmlContent = localStorage.getItem("htmlContent");
  console.log(props);
  const editor = useCreateBlockNote({
    initialContent: htmlContent ? JSON.parse(htmlContent) : undefined,
    uploadFile: handleUpload,
    // onEditorContentChange: (editor) => {
    //   onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    // },
  });

  const insertHelloWorldItem = (editor) => ({
    title: "Heading 4",
    onItemClick: () => {
      // Block that the text cursor is currently in.
      const currentBlock = editor.getTextCursorPosition().block;

      // New block we want to insert.
      const headingFour = {
        type: "heading",
        props: {
          textColor: defaultProps.textColor,
          backgroundColor: defaultProps.backgroundColor,
          level: 4,
          textAlignments: defaultProps.textAlignment,
        },
        content: [
          // {
          //   type: "text",
          //   styles: { bold: true, fontSize: "50px" },
          // },
        ],
      };

      // Inserting the new block after the current one.
      editor.insertBlocks([headingFour], currentBlock, "before");
    },
    aliases: ["heading", "h4"],
    group: "Headings",
    // icon: <Heading4 size={18} />,
    subtext: "Used for sub sub sections.",
  });

  // Creates a new editor instance.
  // List containing all default Slash Menu Items, as well as our custom one.
  const getCustomSlashMenuItems = (editor) => [
    ...getDefaultReactSlashMenuItems(editor),
    insertHelloWorldItem(editor),
  ];

  // Renders the editor instance using a React component.
  return (
    <div style={{ maxWidth: "60%", marginLeft: "auto", marginRight: "auto" }}>
      <BlockNoteView
        editor={editor}
        slashMenu={false}
        editable={true}
        onChange={() => {
          // Saves the document JSON to state.
          localStorage.setItem(
            "htmlContent",
            JSON.stringify(editor.document, null, 2)
          );
        }}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          // Replaces the default Slash Menu items with our custom ones.
          getItems={async (query) =>
            filterSuggestionItems(getCustomSlashMenuItems(editor), query)
          }
        />
      </BlockNoteView>
    </div>
  );
}
