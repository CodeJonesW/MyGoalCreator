import React, { useEffect } from "react";
import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

const mdParser = new MarkdownIt();

const Results = ({ result }) => {
  const theme = useTheme();
  const htmlContent = mdParser.render(result);
  const cleanHtmlContent = DOMPurify.sanitize(htmlContent);

  useEffect(() => {
    // Inject styles directly into the document's <head>
    const styleTag = document.createElement("style");
    styleTag.type = "text/css";
    styleTag.innerHTML = `
      .markdown-content a {
        color: ${theme.palette.secondary.contrastText};
        text-decoration: none;
      }
      .markdown-content a:hover {
        color: ${theme.palette.action.hover};
        text-decoration: underline;
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      // Cleanup: Remove the injected style when the component unmounts
      document.head.removeChild(styleTag);
    };
  }, [theme]);

  return (
    <Box
      sx={{
        textAlign: "left",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        width: "80%",
        margin: "20px auto",
      }}
      className="markdown-content" // Class to target the links inside this content
    >
      <div dangerouslySetInnerHTML={{ __html: cleanHtmlContent }} />
    </Box>
  );
};

export default Results;
