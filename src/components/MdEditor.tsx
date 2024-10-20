import { memo, useEffect, useRef } from "react";
import type { FC, ReactNode } from "react";
import { Crepe } from "@milkdown/crepe";
// import { commonmark } from "@milkdown/preset-commonmark";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame-dark.css";
import { listener, listenerCtx } from "@milkdown/kit/plugin/listener";
import _ from "lodash";

interface IMdEditorProps {
  children?: ReactNode;
  updateMarkdown: (markdown: string, showingId:string) => void;
  initText: string;
  showingId: string
}

const MdEditor: FC<IMdEditorProps> = ({ updateMarkdown, initText, showingId }) => {
  const markDownText = useRef(initText);
  const milkdownApp = useRef<HTMLDivElement>(null);
  //   const crepe = useRef<null|Crepe>(null);

  useEffect(() => {
    let crepe: null | Crepe = null;
    crepe = new Crepe({
      root: milkdownApp.current,
      defaultValue: markDownText.current,
    });

    const updateOneTime = _.throttle(() => {
      if (crepe) {
        const newMarkdown = crepe.getMarkdown();
        if (newMarkdown !== markDownText.current) {
          markDownText.current = newMarkdown;
          updateMarkdown(newMarkdown, showingId);
        }
      }
    }, 500);

    crepe.editor
      .config((ctx) => {
        ctx.get(listenerCtx).markdownUpdated(() => {
          updateOneTime();
        });
      })
      .use(listener)
      .create()
      .then(() => {
        console.log("crepe created");
      });

    return () => {
      if (crepe) {
        updateOneTime.cancel()
        updateMarkdown(markDownText.current, showingId);
        crepe.destroy();
        console.log("crepe destroyed");
      }
    };
  }, [updateMarkdown, showingId]);
  return <div ref={milkdownApp}></div>;
};

export default memo(MdEditor);
