/* eslint-disable */

import React, { useState } from "react";
import { useChangeTitle } from "../../core/hooks/useChangeTitle";
import { IQuestionItem } from "../../core/interfaces";
import { DisplayThread } from "../components/DisplayThread";
import { MostVotedPanel } from "../components/MostVotedPanel";

interface IMostVotedProps {}

const MostVoted: React.FC<IMostVotedProps> = React.memo(({}) => {
  const meta = useChangeTitle("The most voted questions");
  const [open, setOpen] = useState(false);
  const [rowClickedData, setRowClickedData] = useState<
    IQuestionItem | undefined
  >(undefined);

  return (
    <div>
      {meta}
      <MostVotedPanel
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

export { MostVoted as default };

const styles = {};
