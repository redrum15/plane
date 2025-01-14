import { observer } from "mobx-react";
import { EditorReadOnlyRefApi, EditorRefApi, IMarking } from "@plane/document-editor";
// components
import { PageExtraOptions, PageSummaryPopover, PageToolbar } from "@/components/pages";
// store
import { IPageStore } from "@/store/pages/page.store";

type Props = {
  editorRef: React.RefObject<EditorRefApi>;
  readOnlyEditorRef: React.RefObject<EditorReadOnlyRefApi>;
  handleDuplicatePage: () => void;
  isSyncing: boolean;
  markings: IMarking[];
  pageStore: IPageStore;
  projectId: string;
  sidePeekVisible: boolean;
  setSidePeekVisible: (sidePeekState: boolean) => void;
  editorReady: boolean;
  readOnlyEditorReady: boolean;
};

export const PageEditorMobileHeaderRoot: React.FC<Props> = observer((props) => {
  const {
    editorRef,
    readOnlyEditorRef,
    editorReady,
    markings,
    readOnlyEditorReady,
    handleDuplicatePage,
    isSyncing,
    pageStore,
    projectId,
    sidePeekVisible,
    setSidePeekVisible,
  } = props;
  // derived values
  const { isContentEditable, view_props } = pageStore;
  const isFullWidth = !!view_props?.full_width;

  if (!editorRef.current && !readOnlyEditorRef.current) return null;

  return (
    <>
      <div className="flex items-center border-b border-custom-border-200 px-2 py-1">
        <div className="flex-shrink-0">
          <PageSummaryPopover
            editorRef={isContentEditable ? editorRef.current : readOnlyEditorRef.current}
            isFullWidth={isFullWidth}
            markings={markings}
            sidePeekVisible={sidePeekVisible}
            setSidePeekVisible={setSidePeekVisible}
          />
        </div>
        <PageExtraOptions
          editorRef={editorRef}
          handleDuplicatePage={handleDuplicatePage}
          isSyncing={isSyncing}
          pageStore={pageStore}
          projectId={projectId}
          readOnlyEditorRef={readOnlyEditorRef}
        />
      </div>
      <div className="border-b border-custom-border-200 py-1 px-2">
        {(editorReady || readOnlyEditorReady) && isContentEditable && editorRef.current && (
          <PageToolbar editorRef={editorRef?.current} />
        )}
      </div>
    </>
  );
});
