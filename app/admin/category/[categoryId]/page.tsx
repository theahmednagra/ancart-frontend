"use client"

import EditCategoryForm from '@/components/admin/EditCategoryForm'
import { ProductInput } from '@/schemas/admin/product.schema'
import api from '@/services/api'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const AdminCategoryPage = () => {
  const params = useParams();
  const categoryId = params.categoryId as string; const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<any>();
  const [products, setProducts] = useState<ProductInput[]>([]);

  const handleClick = (productId: string) => {
    router.push(`/admin/product/${productId}`)
  }

  useEffect(() => {
    const getProductsByCategory = async () => {
      setIsLoading(true);

      try {
        const [category, categoryProducts] = await Promise.all([
          api.get(`/admin/categories/get-category-by-id/${categoryId}`),
          api.get(`/admin/products/get-products-by-category/${categoryId}`)
        ]);
        setCategory(category.data.category)
        setProducts(categoryProducts.data.products);

      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Something went wrong");

      } finally {
        setIsLoading(false);
      }
    }

    getProductsByCategory();
  }, [])

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h2>{category?.name}</h2>
          <img src={category?.image} alt="" className='h-32 w-32' />
          <div className='flex flex-wrap gap-8 justify-center'>
            {products.map((product: any) => (
              <div
                key={product._id}
                onClick={() => handleClick(product._id)}
                className={`cursor-pointer ${!product.isActive ? "opacity-50" : ""}`}
              >
                <img src={product.image} alt="" className='h-32 w-32' />
                <h2>{product.name}</h2>
                <h3>Price: {product.price}</h3>
                <h3>Stock: {product.stock}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      <EditCategoryForm categoryId={categoryId} />
    </div>
  )
}

export default AdminCategoryPage