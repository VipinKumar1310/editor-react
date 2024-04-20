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
import axios from "axios";

export const EditorContext = createContext({});

const handleBlogImageUpload = async (file) => {
  let imageURl = null;

  if (file) {
    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make an API request to upload the image and get the link using Axios
      const response = await axios.post(
        "https://test.gurucool.life/api/v1/blogs/createLinkImgaeUrl",
        formData,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFmNGQ5NTU0ODMzYmZjNGVjMjk2ZjciLCJpYXQiOjE3MTM1OTgyMDAsImV4cCI6MTcxNDg5NDIwMH0.qhFjgwcBvCWuguXtOonpocekAAlQephrRoN8Vc8rdMQ`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      imageURl = response.data.url;
      return imageURl;
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};

const uploadImageByFile = (e) => {
  return handleBlogImageUpload(e).then((url) => {
    if (url) {
      return {
        success: 1,
        file: { url },
      };
    }
  });
};

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

const defaultValue = {
  time: 1713607118211,
  blocks: [
    {
      id: "l98dyx3yjb",
      type: "header",
      data: {
        text: "Key features",
        level: 3,
      },
    },
    {
      id: "1yKeXKxN7-",
      type: "header",
      data: {
        text: "What does it mean «block-styled editor»",
        level: 3,
      },
    },
    {
      id: "TcUNySG15P",
      type: "paragraph",
      data: {
        text: "Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent <sup daitable element (or more complex structure) provided by Plugin and united by Editor's Core.",
      },
      tunes: {
        footnotes: [
          "It works more stable then in other WYSIWYG editors. Same time it has smooth and well-known arrow navigation behavior like classic editors.",
        ],
      },
    },
    {
      id: "M3UXyblhAo",
      type: "header",
      data: {
        text: "What does it mean clean data output?",
        level: 3,
      },
    },
    {
      id: "KOcIofZ3Z1",
      type: "paragraph",
      data: {
        text: "There are dozens of ready-to-use Blocks and a simple API <g any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA buttons, and even games.",
      },
      tunes: {
        footnotes: [
          "Just take a look at our Creating Block Tool guide. You'll be surprised.",
        ],
      },
    },
    {
      id: "ksCokKAhQw",
      type: "paragraph",
      data: {
        text: "Classic WYSIWYG editors produce raw HTML-markup with both content data and content appearance. On the contrary, or.js outputs JSON object</mark> with data of each Block.",
      },
    },
  ],
};

const tools = {
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        coub: true,
      },
    },
  },
  list: {
    class: List,
    inlineToolbar: ["bold", "anchorTag"],
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
        uploadByFile: uploadImageByFile,
      },
    },
  },
  // link: Link,
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
      data: htmlContent
        ? JSON.parse(htmlContent ? htmlContent : defaultValue)
        : defaultValue,
      tools: tools,
      placeholder: "Let's write an awesome Blog",
      autofocus: true,
      onChange: async () => {
        let content = await Editor.saver.save();

        console.log(content);
        localStorage.setItem("editorJs", JSON.stringify(content));
      },
      onReady: () => {
        ejInstance.current = Editor;
      },
      logLevel: "VERBOSE",
      // inlineToolbar: ["link", "marker", "bold", "italic"],
    });
  }, []);

  return <div id="textEditor" style={{ width: "100%", height: "100%" }}></div>;
};

export default EditorComponent;
