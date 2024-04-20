// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
// import Editor from "./BlockNote.jsx";
// import EditorComponent from "./EditorComponent.jsx";
// import BlockNoteViewHTML from "./BlockNoteViewHTML.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/editor-blocknote",
//     element: <Editor />,
//   },
//   {
//     path: "/editor-editorjs",
//     element: <EditorComponent />,
//   },
//   {
//     path: "/view-blocknote",
//     element: <BlockNoteViewHTML />,
//   },
// ]);

// const Navigation = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/editor-blocknote">Editor (Blocknote)</Link>
//         </li>
//         <li>
//           <Link to="/editor-editorjs">Editor (EditorJS)</Link>
//         </li>
//         <li>
//           <Link to="/view-blocknote">View Blocknote</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// ReactDOM.createRoot(document.getElementById("root")).render(
//   // <React.StrictMode>
//   <>
//     {/* <Navigation /> */}
//     <RouterProvider router={router} />
//   </>
//   // </React.StrictMode>,
// );

import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Editor from "./BlockNote.jsx";
import EditorComponent from "./EditorComponent.jsx";
import BlockNoteViewHTML from "./BlockNoteViewHTML.jsx";
import Navigation from "./Navigation.jsx"; // Import the Navigation component
import ViewEditorJs from "./ViewEditorJs.jsx";

const App = () => {
  return (
    <>
      <Navigation /> {/* Include the Navigation component here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor-blocknote" element={<Editor />} />
        <Route path="/view-blocknote" element={<BlockNoteViewHTML />} />
        <Route path="/editor-editorjs" element={<EditorComponent />} />
        <Route path="/view-editorjs" element={<ViewEditorJs />} />
      </Routes>
    </>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      {/* Add links to navigate to different pages */}
      <Link to="/editor-blocknote">Editor (Blocknote)</Link>
      <br />
      <Link to="/editor-editorjs">Editor (EditorJS)</Link>
      <br />
      <Link to="/view-blocknote">View Blocknote</Link>
      <br />
      <Link to="/view-editorjs">View Editor JS</Link>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
