import React, { Suspense, useEffect } from "react";

const AppRemote1 = React.lazy(() => import("appRemote1/App"));

const App = () => {
  useEffect(() => {
    let app: { unmount(): void };
    async function mountAppRemote2() {
      // @ts-ignore
      const { mount } = await import("appRemote2/mount");
      app = mount();
    }
    mountAppRemote2();

    return () => {
      app?.unmount();
    };
  }, []);

  useEffect(() => {
    const goToProductDetail = (event: CustomEvent<{ id: number }>) => {
      // TODO: change route
    };
    window.addEventListener("item-click", goToProductDetail);

    return () => {
      window.removeEventListener("item-click", goToProductDetail);
    };
  }, []);

  return (
    <div>
      <h1>This is App Host!</h1>
      <Suspense fallback={"loading..."}>
        <AppRemote1 />
      </Suspense>

      <div id="app-remote-2"></div>
    </div>
  );
};

export default App;
