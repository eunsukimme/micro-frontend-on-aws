import AppLayout from "@/components/AppLayout";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let app: { unmount(): void };
    async function mountAppFeed() {
      // @ts-ignore
      const { mount } = await import("appFeed/mount");
      app = mount();
    }
    mountAppFeed();

    return () => {
      app?.unmount();
    };
  }, []);

  useEffect(() => {
    const goToProductDetail = (event: CustomEvent<{ id: number }>) => {
      const productId = event.detail.id;
      navigate(`/${event.detail.id}`, { state: { productId } });
    };
    window.addEventListener("item-click", goToProductDetail);

    return () => {
      window.removeEventListener("item-click", goToProductDetail);
    };
  }, []);

  return (
    <AppLayout>
      <h1 style={{ fontSize: "2rem", margin: "0.67em 0", fontWeight: "bold" }}>
        Trending
      </h1>
      <div id="app-feed"></div>
    </AppLayout>
  );
};

export default ProductListPage;
