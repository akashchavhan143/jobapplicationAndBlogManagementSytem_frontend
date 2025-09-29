import React, { useState } from "react";
import { Input, Tag } from "antd";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue.trim()]);
    }
    setInputValue("");
  };

  const handleClose = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {/* Input field */}
      <Input
      
        placeholder="Type and press Enter to add tags"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleInputConfirm}
        onBlur={handleInputConfirm} // adds tag on blur as well
      />

      {/* Tag list */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={() => handleClose(tag)}
           color="blue"
          >
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
