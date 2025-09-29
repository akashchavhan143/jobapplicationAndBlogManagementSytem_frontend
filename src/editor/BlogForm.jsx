import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Delimiter from "@editorjs/delimiter";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import axios from "axios";
import "./BlogForm.css";
import {
  createBlogforEditor,
  uploadImageByFile,
} from "../services/blogEditorService";
import TagInput from "./TagInput";
import { Select } from "antd";

const BlogEditor = () => {
  const editorInstance = useRef(null);
  const editorContainerRef = useRef(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const { Option } = Select;
  useEffect(() => {
    // Initialize editor only after component is mounted
    if (!editorInstance.current && editorContainerRef.current) {
      initializeEditor();
    }

    return () => {
      // Cleanup function
      if (
        editorInstance.current &&
        typeof editorInstance.current.destroy === "function"
      ) {
        try {
          editorInstance.current.destroy();
        } catch (error) {
          console.warn("Error destroying editor:", error);
        }
      }
      editorInstance.current = null;
    };
  }, []);

  const handleUploadImageByFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await uploadImageByFile(formData);
      console.log("Upload success:", response);
      alert("Image uploaded successfully!");
      return response;
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleImageUploadByUrl = async (url) => {
    if (!isValidImageUrl(url)) {
      return {
        success: 0,
        message: "Please enter a valid image URL (jpg, png, gif, webp, etc.)",
      };
    }
    return { success: 1, file: { url } };
  };
  const initializeEditor = () => {
    try {
      editorInstance.current = new EditorJS({
        holder: editorContainerRef.current,
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Enter a header",
              levels: [1, 2, 3, 4],
              defaultLevel: 2,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: handleUploadImageByFile,
                uploadByUrl: handleImageUploadByUrl,
              },
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote author",
            },
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                vimeo: true,
                twitter: true,
              },
            },
          },
          delimiter: Delimiter,
          warning: {
            class: Warning,
            inlineToolbar: true,
            config: {
              titlePlaceholder: "Title",
              messagePlaceholder: "Message",
            },
          },
          marker: Marker,
          inlineCode: InlineCode,
        },
        placeholder: "Tell your story...",
        autofocus: true,
        onReady: () => {
          setIsEditorReady(true);
        },
      });
    } catch (error) {
      console.error("Failed to initialize editor:", error);
      setMessage("Failed to initialize editor. Please refresh the page.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEditorReady) {
      setMessage("Editor is not ready yet. Please wait.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const editorData = await editorInstance.current.save();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("category", category);
      formData.append("tags", tags);
      formData.append("content", JSON.stringify(editorData));
      formData.append("userId", localStorage.getItem("id"));
      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }

      const response = await createBlogforEditor(formData);

      setMessage("Blog post published successfully!");
      setIsPublished(true);
    } catch (error) {
      console.error("Error creating blog:", error);
      setMessage("Error publishing blog post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!isEditorReady) {
      setMessage("Editor is not ready yet. Please wait.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const editorData = await editorInstance.current.save();
      // Save draft logic would go here
      setMessage("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      setMessage("Error saving draft. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFeaturedImage(null);
    setImagePreview(null);
  };
  // Add this helper function to your component
  const isValidImageUrl = (url) => {
    try {
      // Basic URL validation
      new URL(url);

      // Check if it's a common image format
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".bmp",
        ".svg",
      ];
      const lowerUrl = url.toLowerCase();

      return imageExtensions.some((ext) => lowerUrl.includes(ext));
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="blog-editor-container">
      <div className="editor-header">
        <div className="header-content">
       <h1 style={{
    margin: 0,
    fontSize: "1.8rem",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "#4162ddff",
}}>
  Unleash Your Creativity
</h1>
          <div className="header-actions">
            <button
              className="draft-btn"
              onClick={handleSaveDraft}
              disabled={isLoading || !isEditorReady}
            >
              Save Draft
            </button>
            <button
              className="publish-btn"
              onClick={handleSubmit}
              disabled={isLoading || !title || !isEditorReady}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>

      <div className="editor-content">
        <div className="editor-main">
          <div className="title-section">
            <input
              type="text"
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              style={{
    outline: "none",
  }}
            />
            <input
              type="text"
              className="subtitle-input"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Subtitle"
                           style={{
    outline: "none",
  }}
            />
          </div>

          <div ref={editorContainerRef} className="editor-container">
            {!isEditorReady && (
              <div className="editor-loading">
                <p>Loading editor...</p>
              </div>
            )}
          </div>
        </div>

        <div className="editor-sidebar">
          <div className="sidebar-section">
            <h3>Featured Image</h3>
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button className="remove-image" onClick={removeImage}>
                  Remove
                </button>
              </div>
            ) : (
              <div className="image-upload">
                <label htmlFor="featuredImage" className="upload-btn">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="featuredImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <h3>Category</h3>
            <Select
              style={{ width: "100%" }}
              placeholder="Select Category"
              value={category || undefined}
              onChange={(value) => setCategory(value)}
            >
              <Option value="technology">Technology</Option>
              <Option value="lifestyle">Lifestyle</Option>
              <Option value="travel">Travel</Option>
              <Option value="food">Food</Option>
              <Option value="health">Health</Option>
              <Option value="education">Education</Option>
              <Option value="business">Business</Option>
              <Option value="finance">Finance</Option>
              <Option value="marketing">Marketing</Option>
              <Option value="fashion">Fashion</Option>
              <Option value="sports">Sports</Option>
              <Option value="entertainment">Entertainment</Option>
              <Option value="personal-development">Personal Development</Option>
              <Option value="science">Science</Option>
              <Option value="environment">Environment</Option>
            </Select>
          </div>

          {/* <div className="sidebar-section">
            <h3>Tags</h3>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add tags (comma separated)"
            />
          </div> */}
          <div className="sidebar-section">
            <h3>Tags</h3>
            <TagInput
              tags={tags ? tags.split(",") : []}
              setTags={(newTags) => setTags(newTags.join(","))}
            />
          </div>
          <div className="sidebar-section">
            <h3>Publish</h3>
            <p>
              Status:{" "}
              <span className="status">
                {isPublished ? "Published" : "Draft"}
              </span>
            </p>
            <button
              className="publish-btn side-btn"
              onClick={handleSubmit}
              disabled={isLoading || !title || !isEditorReady}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {message && (
        <div
          className={`message ${
            message.includes("Error") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default BlogEditor;
