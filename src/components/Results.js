import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Snackbar } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

// Initialize the Markdown parser
const mdParser = new MarkdownIt();

const Results = ({ result, onLineClick, back, isSubGoal }) => {
  const theme = useTheme();
  const [isToastOpen, setIsToastOpen] = useState(false);

  // Parse the Markdown content into HTML
  const htmlContent = mdParser.render(result);
  const cleanHtmlContent = DOMPurify.sanitize(htmlContent);

  // Process the HTML to add click handlers for each line
  const processContent = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const lines = tempDiv.innerHTML.split("\n");
    let processedLines = lines.map((line, index) => {
      // If the line doesn't contain a link, make it clickable
      if (!line.includes("<a")) {
        return `<div class="clickable-line" data-line-number="${index}">${line}</div>`;
      }
      return line;
    });
    return processedLines.join("\n");
  };

  // Create the processed HTML content with clickable lines
  const processedHtml = processContent(cleanHtmlContent);

  useEffect(() => {
    // Inject custom styles for links and clickable lines
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
      .clickable-line {
        cursor: pointer;
      }
      .clickable-line:hover {
        background-color: ${theme.palette.action.hover};
      }
    `;
    document.head.appendChild(styleTag);

    // Add event listener for clicks on the processed content
    const handleLineClick = (event) => {
      if (isSubGoal) {
        console.log("isSubGoal", isSubGoal);
        setIsToastOpen(true);
        return;
      }
      const target = event.target;
      const lineNumber = target.parentElement.getAttribute("data-line-number");
      const text = target.innerHTML;
      if (lineNumber && text) {
        onLineClick(lineNumber, text);
      }
    };

    const contentDiv = document.querySelector(".markdown-content");
    contentDiv.addEventListener("click", handleLineClick);

    return () => {
      // Cleanup the event listener and style tag when component unmounts
      document.head.removeChild(styleTag);
      contentDiv.removeEventListener("click", handleLineClick);
    };
  }, [theme, onLineClick, isSubGoal]);

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
      className="markdown-content"
    >
      {back ? (
        <Button color="secondary" variant={"outlined"} onClick={back}>
          <ArrowBackIosNewIcon />
        </Button>
      ) : null}
      <Snackbar
        sx={{ marginTop: "20px" }}
        open={isToastOpen}
        autoHideDuration={3000}
        color="secondary"
        onClose={() => setIsToastOpen(false)}
        message="Going deeper requires a paid plan 🙂"
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position
      />
      <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </Box>
  );
};

export default Results;
