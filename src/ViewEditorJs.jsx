import { createContext, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Link from "@editorjs/link";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";

export const EditorContext = createContext({});

const uploadImageByUrl = (e) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (error) {
      reject(error);
    }
  });

  return link.then((url) => {
    return {
      success: 1,
      file: { url },
    };
  });
};

const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    config: {
      placeholder: "Type Heading...",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 2,
    },
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        // uploadByFile:
      },
    },
  },
  link: Link,
  marker: Marker,
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  InlineCode: InlineCode,
};

const EditorComponent = () => {
  const ejInstance = useRef();

  const htmlContent = localStorage.getItem("editorJs");

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let Editor = new EditorJS({
      holderId: "textEditor",
      data: JSON.parse(htmlContent),
      tools: tools,
      placeholder: "Let's write an awesome Blog",
      onChange: async () => {
        let content = await Editor.saver.save();

        console.log(content);
      },
      onReady: () => {
        ejInstance.current = Editor;
      },
      logLevel: "VERBOSE",
      readOnly: true,
      // inlineToolbar: ["link", "marker", "bold", "italic"],
    });
  }, [htmlContent]);

  return <div id="textEditor" style={{ width: "100%", height: "100%" }}></div>;
};

export default EditorComponent;
