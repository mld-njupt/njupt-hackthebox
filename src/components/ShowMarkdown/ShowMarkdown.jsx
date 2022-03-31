import { useEffect, useState } from "react";
import hljs from "highlight.js"; // 引入highlight.js库
import "highlight.js/styles/github.css"; // 引入github风格的代码高亮样式
import "github-markdown-css/github-markdown.css";
import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt({
  // 设置代码高亮的配置
  highlight: function (code, language) {
    if (language && hljs.getLanguage(language)) {
      try {
        return (
          `<pre><code class="hljs language-${language}">` +
          hljs.highlight(code, { language }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' +
      mdParser.utils.escapeHtml(code) +
      "</code></pre>"
    );
  },
});
function ShowMarkdown(props) {
  const { passage } = props;
  const [htmlPas, setHtmlPas] = useState("");
  useEffect(() => {
    setHtmlPas(mdParser.render(passage));
  }, [passage]);
  return (
    <div>
      {/* <div value={passage} renderHTML={(text) => mdParse.render(text)} /> */}
      <div
        className="showHtml markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlPas }}
      ></div>
    </div>
  );
}

export default ShowMarkdown;
