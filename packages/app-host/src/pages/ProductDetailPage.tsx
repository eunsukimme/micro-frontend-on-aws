import AppLayout from "@/components/AppLayout";
import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";

const AppOrder = React.lazy(() => import("appOrder/App"));

function ProductDetailPage() {
  const {
    state: { productId },
  } = useLocation();

  return (
    <AppLayout>
      <Suspense fallback={"loading..."}>
        <AppOrder productId={productId} />
      </Suspense>
    </AppLayout>
  );
}

export default ProductDetailPage;
