/**
 * Utility functions for exporting the builder state to HTML/React/ZIP
 */
export const exportService = {
  
  /**
   * Converts the internal JSON tree to raw HTML string
   * @param {Array} tree - The JSON tree from builderStore
   * @returns {string} HTML string
   */
  toHTML(tree) {
    let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>Exported Site</title>\n</head>\n<body>\n';
    
    // Extremely basic mock renderer for export
    const renderNode = (node) => {
      if (node.type === 'Heading') return `<h1>${node.props?.text || 'Heading'}</h1>\n`;
      if (node.type === 'Text') return `<p>${node.props?.text || 'Text'}</p>\n`;
      
      let childrenHtml = '';
      if (node.children) {
        childrenHtml = node.children.map(renderNode).join('');
      }
      return `<div>\n${childrenHtml}</div>\n`;
    };

    tree.forEach(node => {
      html += renderNode(node);
    });

    html += '</body>\n</html>';
    return html;
  },

  /**
   * Triggers a browser download of the given content
   */
  downloadFile(filename, content, mimeType = 'text/html') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
