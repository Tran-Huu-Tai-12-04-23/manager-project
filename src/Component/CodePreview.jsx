function CodePreview({ code }) {
  return <div dangerouslySetInnerHTML={{ __html: code }} />;
}

export default CodePreview;
