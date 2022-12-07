/* eslint-disable */

import React, { useState } from "react";
import { useChangeTitle } from "../../core/hooks/useChangeTitle";
import { IQuestionItem } from "../../core/interfaces";
import { DisplayThread } from "../components/DisplayThread";
import { NewestPanel } from "../components/NewestPanel";

interface INewestProps {}

const Newest: React.FC<INewestProps> = React.memo(({}) => {
  const meta = useChangeTitle("Newest questions");
  const [open, setOpen] = useState(false);
  const [rowClickedData, setRowClickedData] = useState<
    IQuestionItem | undefined
  >(undefined);

  return (
    <div>
      {meta}
      <NewestPanel
        autoHeight
        onClick={(data) => {
          setRowClickedData(data);
          setOpen(true);
        }}
      />

      <DisplayThread
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        data={rowClickedData}
      />
    </div>
  );
});

export { Newest as default };

const styles = {};
