/* eslint-disable */
//@ts-nocheck
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { LoadingPage } from "./ui/components/LoadingPage";
function App() {
  const Layout = React.lazy(() => import("./ui/views/Layout"));

  return (
    <div>
      <Router>
        <React.Suspense fallback={<LoadingPage />}>
          <Switch>
            <Route path={"/"} component={Layout} />
          </Switch>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
