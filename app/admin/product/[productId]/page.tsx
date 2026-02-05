"use client";

import UpdateProductForm from '@/components/admin/UpdateProductForm';
import Footer from '@/components/admin/Footer';
import Navbar from '@/components/admin/Navbar';
import api from '@/services/api';
import useAdminRedirect from '@/utils/useAdminRedirect';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const AdminProductPage = () => {
	// Redirect non-admin users
	useAdminRedirect();

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

	const isOutOfStock = Number(product?.stock) === 0;

	return (
		<>
			<Navbar />

			<div className='min-h-screen w-full px-4 py-10 bg-zinc-900/99 text-white'>
				<div className="max-w-7xl mx-auto space-y-12">

					{/* Heading */}
					{/* <h1 className="text-3xl font-bold mb-10">Update Product</h1> */}

					{isLoading ? (
						<div className="text-gray-400 text-center py-20 text-lg font-medium">Loading product...</div>
					) : product ? (
						<motion.div
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.45 }}
							className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
						>

							{/* PRODUCT IMAGE */}
							<div className="flex justify-center">
								<div className="w-full max-w-sm aspect-square border border-zinc-700 rounded-2xl p-4 overflow-hidden flex items-center justify-center bg-white">
									<img src={product.image} alt={product.name} className="w-full h-full object-contain" />
								</div>
							</div>

							{/* PRODUCT INFO */}
							<div className="flex flex-col gap-6">
								<h1 className="text-3xl font-bold text-white">{product.name}</h1>

								<div className="flex items-center gap-4">
									<span className="text-2xl font-bold text-green-400">
										Rs. {Number(product.price).toLocaleString()}
									</span>
									<span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${!isOutOfStock ? "border-green-500 text-green-400" : "border-red-500 text-red-400"}`}>
										{!isOutOfStock ? `${product.stock} in Stock` : "Out of Stock"}
									</span>
								</div>

								<p className="text-gray-300 leading-relaxed whitespace-pre-line">{product.description || "No description provided."}</p>
							</div>

						</motion.div>
					) : (
						<div className="text-center text-gray-400 text-lg font-medium">Product not found.</div>
					)}

					{/* UPDATE FORM */}
					<div className="mt-10">
						<UpdateProductForm
							productId={productId}
							onUpdate={handleProductUpdate}
						/>
					</div>

				</div>
			</div>

			<Footer />
		</>
	);
};

export default AdminProductPage;
