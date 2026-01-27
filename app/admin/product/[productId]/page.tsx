"use client"

import EditProductForm from '@/components/admin/EditProductForm';
import api from '@/services/api';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const AdminProductPage = () => {
  const params = useParams();
  const productId = params.productId as string;

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>("");

  useEffect(() => {
    const getProductById = async () => {
      setIsLoading(true);

      try {
        const res = await api(`/admin/products/get-product-by-id/${productId}`);
        setProduct(res.data.product);

      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Something went wrong");

      } finally {
        setIsLoading(false);
      }
    }

    getProductById();
  }, [])

  return (
    <div>
      {isLoading ? (
        <div>Product loading...</div>
      ) : (
        <div className={!product?.isActive ? "opacity-50" : ""}>
          <img src={product?.image} alt="" className='h-32 w-32' />
          <h2>{product?.name}</h2>
          <h3>Price: {product?.price}</h3>
          <h3>Stock: {product?.stock}</h3>
          <p>Description: {product?.description}</p>
        </div>
      )}

      <EditProductForm productId={productId} />
    </div>
  )
}

export default AdminProductPage