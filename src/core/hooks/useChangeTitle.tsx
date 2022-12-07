/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

const useChangeTitle = (titleValue = "") => {
  return (
    <Helmet>
      <title>{`${titleValue}`}</title>
    </Helmet>
  );
};

export { useChangeTitle };
