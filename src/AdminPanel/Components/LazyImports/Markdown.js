import React, { Suspense } from "react";
import lazy from "react-lazy-named";

const Loader = lazy(() => import("mathpix-markdown-it"), "MathpixLoader");
export const MathpixLoader = (props) => (
  <Suspense fallback={<div className={props.className}>{props.children}</div>}>
    <Loader {...props} />
  </Suspense>
);

const Markdown = lazy(() => import("mathpix-markdown-it"), "MathpixMarkdown");
export const MathpixMarkdown = (props) => (
  <Suspense fallback={<div props={props.children} />}>
    <Markdown {...props} />
  </Suspense>
);
