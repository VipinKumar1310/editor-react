import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={{ position: "sticky", top: "1" }}>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <button>
          <Link style={{ textDecoration: "none" }} to="/editor-blocknote">
            Editor (Blocknote)
          </Link>
        </button>

        <button>
          <Link style={{ textDecoration: "none" }} to="/view-blocknote">
            View (Blocknote)
          </Link>
        </button>
        <button>
          <Link style={{ textDecoration: "none" }} to="/editor-editorjs">
            Editor (EditorJS)
          </Link>
        </button>
        <button>
          <Link style={{ textDecoration: "none" }} to="/view-editorjs">
            View (EditorJS)
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
