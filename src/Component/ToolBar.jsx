import React from "react";
import { BiBold, BiItalic, BiUnderline } from "react-icons/bi";

import { RichUtils, EditorState } from "draft-js";
import {
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from "react-icons/ai";

import { BsTextCenter, BsLink45Deg } from "react-icons/bs";

const Toolbar = ({ editorState, setEditorState }) => {
  const tools = [
    {
      label: "bold",
      style: "BOLD",
      icon: <BiBold />,
      method: "inline",
    },
    {
      label: "italic",
      style: "ITALIC",
      icon: <BiItalic />,
      method: "inline",
    },
    {
      label: "underline",
      style: "UNDERLINE",
      icon: <BiUnderline />,
      method: "inline",
    },
    {
      label: "Unordered-List",
      style: "unordered-list-item",
      method: "block",
      icon: <AiOutlineOrderedList />,
    },
    {
      label: "Ordered-List",
      style: "ordered-list-item",
      method: "block",
      icon: <AiOutlineUnorderedList />,
    },
    {
      label: "Left",
      style: "leftAlign",
      icon: <AiOutlineAlignLeft />,
      method: "block",
    },
    {
      label: "Center",
      style: "centerAlign",
      icon: <BsTextCenter />,
      method: "block",
    },
    {
      label: "Right",
      style: "rightAlign",
      icon: <AiOutlineAlignRight />,
      method: "block",
    },
    {
      label: "Link",
      style: "LINK",
      icon: <BsLink45Deg />,
      method: "insert",
    },
    { label: "Heading", style: "header-one", method: "block" },
    { label: "High", style: "header-two", method: "block" },
    { label: "Normal", style: "header-four", method: "block" },
    { label: "Small", style: "header-six", method: "block" },
  ];

  const applyStyle = (e, style, method) => {
    e.preventDefault();
    if (method === "block") {
      setEditorState(RichUtils.toggleBlockType(editorState, style));
    } else if (method === "inline") {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    } else if (method === "insert") {
      if (style === "LINK") {
        const selection = editorState.getSelection();
        const link = window.prompt("Enter a link URL:");
        if (!link) {
          return;
        }
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          "LINK",
          "MUTABLE",
          { url: link }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, {
          currentContent: contentStateWithEntity,
        });
        setEditorState(
          RichUtils.toggleLink(newEditorState, selection, entityKey)
        );
      }
    }
  };

  const isActive = (style, method) => {
    if (method === "block") {
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
      return blockType === style;
    } else {
      const currentStyle = editorState.getCurrentInlineStyle();
      return currentStyle.has(style);
    }
  };

  return (
    <div className="border-b-1 border-blur-light dark:border-blur-dark border-solid bg-light-third dark:bg-dark-third ">
      {tools.map((item, idx) => (
        <button
          className={`p-2 text-xs hover:text-primary ${
            isActive(item.style, item.method) ? "text-primary" : ""
          } `}
          key={`${item.label}-${idx}`}
          title={item.label}
          onClick={(e) => applyStyle(e, item.style, item.method)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {item.icon || item.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
