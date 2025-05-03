"use client";
import React from "react";
import hljs from "highlight.js/lib/core";
import rust from "highlight.js/lib/languages/rust";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import "../styles/custom-code.css";

function Code({ code, lang, lineNumbers = true }: { code: string; lang: string; lineNumbers?: boolean }) {
  hljs.registerLanguage("rust", rust);

  const codeRef = React.useRef(null);
  React.useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
      const elem = codeRef.current as HTMLElement;
      elem.style.padding = "0";
      if (lineNumbers) {
        elem.style.paddingLeft = "0.5rem";
      }
    }
  }, [code, lang, lineNumbers]);

  return (
    <pre className="w-full flex rounded-md">
      {lineNumbers ? (
        <code className="pr-2 border-r border-r-neutral-600 text-neutral-500 bg-[#333]">
          {code.split("\n").map((_, idx) => (
            <div key={idx}>{idx + 1}</div>
          ))}
        </code>
      ) : null}
      <code ref={codeRef} className={`pl-2 ${lang}`}>
        {code}
      </code>
    </pre>
  );
}

export default Code;
