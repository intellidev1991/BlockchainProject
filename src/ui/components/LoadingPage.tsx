// @ts-nocheck
/* eslint-disable */
import React from "react";
import { DisappearedLoading, BlockLoading } from "react-loadingg";

const LoadingPage = React.memo(() => {
  return <DisappearedLoading color="#4055c5" size="Large" />;
});

const LoadingBlock = React.memo(() => {
  return <BlockLoading size="Large" />;
});

export { LoadingPage, LoadingBlock };
