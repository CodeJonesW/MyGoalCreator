import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";
import { useTheme } from "@mui/material/styles";
import { Box, Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const mdParser = new MarkdownIt();

const Results = ({ result, onLineClick, isSubGoal, isLoading }) => {
  const theme = useTheme();
  const [isToastOpen, setIsToastOpen] = useState(false);

  const htmlContent = mdParser.render(result);
  const cleanHtmlContent = DOMPurify.sanitize(htmlContent);

  const processContent = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    Array.from(tempDiv.children).forEach((child, index) => {
      if (
        child.tagName.toLowerCase() === "ul" ||
        child.tagName.toLowerCase() === "ol"
      ) {
        if (child.children.length > 0) {
          Array.from(child.children).forEach((listItem, index) => {
            if (listItem.children.length > 0) {
              Array.from(listItem.children).forEach((item, index) => {
                if (item.tagName.toLowerCase() === "ul") {
                  Array.from(item.children).forEach((subItem, index) => {
                    subItem.classList.add("clickable-line");
                  });
                } else {
                  item.classList.add("clickable-line");
                }
              });
            } else {
              listItem.classList.add("clickable-line");
            }
          });
        }
      }
    });
    return tempDiv.innerHTML;
  };

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
      console.log("handleLineClick", event);
      if (isSubGoal) {
        console.log("isSubGoal", isSubGoal);
        setIsToastOpen(true);
        return;
      }
      const target = event.target;
      const text = target.innerHTML;
      if (text) {
        onLineClick(text);
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
        width: "80vw",
        margin: "20px auto",
      }}
      className="markdown-content"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {isLoading ? <CircularProgress color="secondary" /> : null}
      </Box>

      <Snackbar
        sx={{ marginTop: "20px", width: "200px" }}
        open={isToastOpen}
        autoHideDuration={3000}
        color="secondary"
        onClose={() => setIsToastOpen(false)}
        message="Going deeper requires a paid plan 🙂"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
    </Box>
  );
};

export default Results;
