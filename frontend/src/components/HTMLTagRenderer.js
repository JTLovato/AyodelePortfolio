import React from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

const HTMLTagRenderer = ({ string, allowedTags }) => {
  const cleanHTML = DOMPurify.sanitize(string, { ALLOWED_TAGS: allowedTags });

  return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

HTMLTagRenderer.propTypes = {
  string: PropTypes.string.isRequired,
  allowedTags: PropTypes.array.isRequired,
};

export default HTMLTagRenderer;
