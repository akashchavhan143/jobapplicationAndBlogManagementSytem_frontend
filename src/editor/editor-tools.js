// src/editor-tools.js
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";

// Configure the Image tool to call our backend upload endpoints.
// Make sure these URLs match your Spring Boot endpoints below.
export const EDITOR_JS_TOOLS = {
  header: Header,
  list: List,
  image: {
    class: ImageTool,
    config: {
      // endpoints required unless you provide uploader methods
      endpoints: {
        // file upload (multipart/form-data)
        byFile: "http://localhost:8080/api/uploads",
        // paste-by-URL endpoint (accepts JSON { url: "..." })
        byUrl: "http://localhost:8080/api/uploads/byUrl"
      },
      // optionally restrict types:
      // types: 'image/*'
    }
  }
};
