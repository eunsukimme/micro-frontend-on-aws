import React from "react";
import Header from "../Header";
import { container, wrapper } from "./index.css";

function AppLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header />
      <div className={`${container}`}>
        <div className={`${wrapper}`}>{children}</div>
      </div>
      {/* TODO: Footer */}
    </>
  );
}

export default AppLayout;
