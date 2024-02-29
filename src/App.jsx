import "./App.css";
import { useState, useEffect } from "react";
import Editor from "./components/Editor";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("javascript", "");
  const [srcDoc, setSrcdoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcdoc(`
  <html>
   <body>${html}</body>
   <style>${css}</style>
   <script>${javascript}</script>
  <html/>
  `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayname="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayname="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayname="JS"
          value={javascript}
          onChange={setJavascript}
        />
      </div>

      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          border="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
