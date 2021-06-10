import React, { Suspense } from "react";
import lazy from "react-lazy-named";

const LCImagesCarouselModal = lazy(() =>
  import("../../../Modals/ImagesCarouselModal")
);
export const ImagesCarouselModal = (props) => (
  <Suspense fallback={null}>
    <LCImagesCarouselModal {...props} />
  </Suspense>
);

const LCPaperCard = lazy(() => import("../PaperCard"));
export const PaperCard = (props) => (
  <Suspense fallback={null}>
    <LCPaperCard {...props} />
  </Suspense>
);
const LCModelNotification = lazy(() =>
  import("../../../Modals/ModelNotification")
);
export const ModelNotification = (props) => (
  <Suspense fallback={null}>
    <LCModelNotification {...props} />
  </Suspense>
);

const LCSearchedQuestions = lazy(() => import("../SearchedQuestions"));
export const SearchedQuestions = (props) => (
  <Suspense fallback={null}>
    <LCSearchedQuestions {...props} />
  </Suspense>
);

const LCAdminSearchComponent = lazy(() => import("../AdminSearchComponent"));
export const AdminSearchComponent = (props) => (
  <Suspense fallback={null}>
    <LCAdminSearchComponent {...props} />
  </Suspense>
);

const LCAdminSideBar = lazy(() => import("../AdminSideBar"));
export const AdminSideBar = (props) => (
  <Suspense fallback={null}>
    <LCAdminSideBar {...props} />
  </Suspense>
);

const LCAdminPapersComponent = lazy(() => import("../AdminPapersComponent"));
export const AdminPapersComponent = (props) => (
  <Suspense fallback={null}>
    <LCAdminPapersComponent {...props} />
  </Suspense>
);

const LCAdminAddTheoryComponent = lazy(() =>
  import("../AdminAddTheoryComponent")
);
export const AdminAddTheoryComponent = (props) => (
  <Suspense fallback={null}>
    <LCAdminAddTheoryComponent {...props} />
  </Suspense>
);

const LCAdminAddmcqsComponent = lazy(() => import("../AdminAddmcqsComponent"));
export const AdminAddmcqsComponent = (props) => (
  <Suspense fallback={null}>
    <LCAdminAddmcqsComponent {...props} />
  </Suspense>
);

const LCAdminAddBoardComponent = lazy(() =>
  import("../AdminAddBoardComponent")
);
export const AdminAddBoardComponent = (props) => (
  <Suspense fallback={null}>
    <LCAdminAddBoardComponent {...props} />
  </Suspense>
);

const LCConfirmDialog = lazy(() => import("../../../Modals/ConfirmDialog"));
export const ConfirmDialog = (props) => (
  <Suspense fallback={null}>
    <LCConfirmDialog {...props} />
  </Suspense>
);

const LCQuestionList = lazy(() => import("../UpdatePaper/QuestionList"));
export const QuestionList = (props) => (
  <Suspense fallback={null}>
    <LCQuestionList {...props} />
  </Suspense>
);

const LCDialogModalMetaData = lazy(() =>
  import("../UpdatePaper/DialogModalMetaData")
);
export const DialogModalMetaData = (props) => (
  <Suspense fallback={null}>
    <LCDialogModalMetaData {...props} />
  </Suspense>
);

const LCEnhancedTableToolbar = lazy(() => import("../EnhancedTableToolbar"));
export const EnhancedTableToolbar = (props) => (
  <Suspense fallback={null}>
    <LCEnhancedTableToolbar {...props} />
  </Suspense>
);

const LCEditQuestions = lazy(() => import("../UpdatePaper/EditQuestions"));
export const EditQuestions = (props) => (
  <Suspense fallback={null}>
    <LCEditQuestions {...props} />
  </Suspense>
);

const LCAddQuestion = lazy(() => import("../UpdatePaper/AddQuestion"));
export const AddQuestion = (props) => (
  <Suspense fallback={null}>
    <LCAddQuestion {...props} />
  </Suspense>
);

const LCSeeQuestion = lazy(() => import("../UpdatePaper/SeeQuestion"));
export const SeeQuestion = (props) => (
  <Suspense fallback={null}>
    <LCSeeQuestion {...props} />
  </Suspense>
);
