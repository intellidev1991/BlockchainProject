/* eslint-disable */

import React, { useState } from "react";
import { Divider } from "rsuite";
import { useChangeTitle } from "../../core/hooks/useChangeTitle";
import { IQuestionItem } from "../../core/interfaces";
import { DisplayThread } from "../components/DisplayThread";
import { NewestPanel } from "../components/NewestPanel";
import { MostVotedPanel } from "../components/MostVotedPanel";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = React.memo(({}) => {
  const meta = useChangeTitle("Stack overflow explorer - Hamed's task");
  const [open, setOpen] = useState(false);
  const [rowClickedData, setRowClickedData] = useState<
    IQuestionItem | undefined
  >(undefined);

  return (
    <div>
      {meta}
      <NewestPanel
        onClick={(data) => {
          setRowClickedData(data);
          setOpen(true);
        }}
      />
      <Divider />
      <MostVotedPanel
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

export { Home as default };

const styles = {};
