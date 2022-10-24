import { Product } from "@/types/product";
import { useEffect, useState } from "react";

interface ProductDetailProps {
  id: number;
}

const reviewCount = Math.floor(Math.random() * 1000);

function ProductDetail({ id }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      const data = await fetch(`https://dummyjson.com/products/${id}`).then(
        (res) => res.json()
      );
      setProduct(data);
    }

    fetchProduct();
  }, []);

  if (!product) {
    return <div>loading...</div>;
  }

  return (
    <div className="w-full h-full flex">
      <div className="w-[50%] max-w-[50%]">
        <div className="w-full h-[400px] max-h-[400px] flex items-center justify-center">
          <img
            src={selectedThumbnail || product.thumbnail}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-[32px] flex items-center w-full overflow-scroll gap-[8px]">
          {product.images.map((image, idx) => (
            <div
              className="w-[128px] h-[128px] flex-shrink-0"
              key={`${image}-${idx}`}
            >
              <img
                src={image}
                className="w-full h-full object-cover"
                onClick={() => setSelectedThumbnail(image)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-[50%] max-w-[50%] p-[40px]">
        <h1 className="text-[32px] font-medium mb-[4px]">{product.title}</h1>

        <div className="flex items-center">
          <div className="text-[16px] tracking-widest text-gray-500 mr-[16px]">
            {product.category}
          </div>
          <div className="text-[16px] tracking-wider">⭐️ {product.rating}</div>
          <span>({reviewCount} reviews)</span>
        </div>

        <h2 className="text-[16px] mt-[20px] font-medium">Description:</h2>
        <p className="mt-[4px]">{product.description}</p>

        <button className="mt-[24px] py-[12px] px-[16px] bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700">
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
