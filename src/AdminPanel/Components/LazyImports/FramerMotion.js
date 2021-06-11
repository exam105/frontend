import React, { Suspense } from "react";
import lazy from "react-lazy-named";

const MotionDiv = lazy(() => import("framer-motion"), "motion.div");
export const AnimatedDiv = (props) => (
  <Suspense fallback={<div className={props.className}>{props.children}</div>}>
    <MotionDiv {...props} />
  </Suspense>
);

const MotionPresence = lazy(() => import("framer-motion"), "AnimatePresence");
export const AnimatedPresence = (props) => (
  <Suspense fallback={<div className={props.className}>{props.children}</div>}>
    <MotionPresence {...props} />
  </Suspense>
);
