import React, { Suspense } from "react";

const AppRemote1 = React.lazy(() => import("appRemote1/App"));

const App = () => {
  return (
    <div>
      <h1>This is App Host!</h1>
      <Suspense fallback={"loading..."}>
        <AppRemote1 />
      </Suspense>
    </div>
  );
};

export default App;
