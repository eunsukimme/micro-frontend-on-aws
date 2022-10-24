import AppLayout from "@/components/AppLayout";
import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";

const AppRemote1 = React.lazy(() => import("appRemote1/App"));

function ProductDetailPage() {
  const {
    state: { productId },
  } = useLocation();

  return (
    <AppLayout>
      <Suspense fallback={"loading..."}>
        <AppRemote1 productId={productId} />
      </Suspense>
    </AppLayout>
  );
}

export default ProductDetailPage;
