"use client";

import UpdateProductForm from '@/components/admin/UpdateProductForm';
import api from '@/services/api';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const AdminProductPage = () => {
	const params = useParams();
	const productId = params.productId as string;

	const [isLoading, setIsLoading] = useState(false);
	const [product, setProduct] = useState<any>(null);

	useEffect(() => {
		const getProductById = async () => {
			setIsLoading(true);
			try {
				const res = await api.get(`/admin/products/get-product-by-id/${productId}`);
				setProduct(res.data.product);
			} catch (err) {
				toast.error(err instanceof Error ? err.message : "Something went wrong");
			} finally {
				setIsLoading(false);
			}
		};

		getProductById();
	}, [productId]);

	const handleProductUpdate = (updatedProduct: any) => {
		setProduct(updatedProduct);
	};

	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
			{isLoading ? (
				<div className="text-gray-500 text-center py-20">Loading product...</div>
			) : product ? (
				<div
					className={`
           				bg-white
           				border border-gray-200
           				rounded-xl
           				shadow-md
            			p-6
          			`}
				>
					<div className="flex flex-col md:flex-row gap-6">
						<div className="w-full md:w-48 h-48 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
							<img
								src={product.image}
								alt={product.name}
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="flex-1 space-y-2">
							<h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
							<p className="text-gray-700 font-medium">{product.category?.name}</p>
							<p className="text-gray-700">Price: {product.price} PKR</p>
							<p className="text-gray-700">Stock: {product.stock}</p>
							<p className="text-gray-700">{product.description}</p>
							{!product.isActive && (
								<span className="inline-block bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
									Inactive
								</span>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="text-center text-gray-500">Product not found.</div>
			)}

			{/* Inline Update Form */}
			<div className="">
				<UpdateProductForm
					productId={productId}
					onUpdate={handleProductUpdate}
				/>
			</div>
		</div>
	);
};

export default AdminProductPage;
