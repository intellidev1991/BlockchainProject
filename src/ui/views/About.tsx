/* eslint-disable */
/*
 * Copyright (c) 2021 Hamed Taheri
 *
 * @Script: About.tsx
 * @Author: Hamed Taheri
 * @Create At: 2021-11-17 00:06:05
 * @Last Modified By: Your Name
 * @Last Modified At: 2021-11-17 00:34:10
 */
import React, { useState, useEffect } from "react";
import { Button, Panel } from "rsuite";
import { useChangeTitle } from "../../core/hooks/useChangeTitle";

interface IAboutProps {}

const About: React.FC<IAboutProps> = React.memo(({}) => {
  const meta = useChangeTitle("Stack overflow explorer - About page");

  useEffect(() => {}, []);

  return (
    <div>
      {meta}
      <Panel
        header={<span className="text-xl font-semibold">About</span>}
        bordered
      >
        <div className="mb-4 text-gray-700">
          This application fetches questions based on your selected relevant
          topics from the{" "}
          <span className="text-blue-700">StackOverflow.com</span> website.
        </div>
        <h6>Features</h6>
        <div className="ml-2 mb-6 text-gray-800">
          <div>-Able to add relevant questions based on the tags system. </div>
          <div>
            -Able to watch the most voted questions as well as the newest ones.
          </div>
          <div>-Able to sort data ascending and descending.</div>
          <div>-Able to change the number of question items per request.</div>
          <div>-Able to change pages (Pagination for more questions.)</div>
          <div>
            -Able to select a date range (Last week, Last 7 days, This week,
            Today, and custom date range)
          </div>
          <div>
            -Able to click on each question to see the full body question and
            some details.
          </div>
          <div>
            -Able to click on the question's title on the opened modal to
            navigate to the StackOverflow.com website to see the question on it.
          </div>
        </div>
        <div className="text-sm font-semibold">Designed By: Hamed Taheri</div>
        <div
          className="text-sm text-pink-700 font-semibold hover:opacity-70 cursor-pointer hover:underline inline-table"
          onClick={() => {
            window.open("mailto:hamed.taheri32@gmail.com");
          }}
        >
          Mail: hamed.taheri32@gmail.com
        </div>
        <div>2021-11-17</div>
      </Panel>
    </div>
  );
});

export { About as default };

const styles = {};
