// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import api from "@/services/api";
// import Navbar from "@/components/public/Navbar";
// import Footer from "@/components/public/Footer";
// import { toast } from "sonner";
// import ProductsListSection from "@/components/public/ProductsListSection";
// import CategoryListSection from "@/components/public/CategoryListSection";
// import AddToCartButton from "@/components/public/AddToCartButton";
// import Loader from "@/components/public/Loader";

// const ProductPage = () => {

//     const { productId } = useParams() as { productId: string };
//     const router = useRouter();
//     const [product, setProduct] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [placingOrder, setPlacingOrder] = useState(false);

//     // Fetch product
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 setLoading(true);
//                 const res = await api.get(`/user/products/get-product-by-id/${productId}`);
//                 setProduct(res.data.product);
//             } catch {
//                 toast.error("Failed to load product");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProduct();
//     }, [productId]);

//     const isOutOfStock = Number(product?.stock) === 0;

//     // Order Now handler (ready for production)
//     const handleOrderNow = () => {
//         if (isOutOfStock) return;
//         // Redirect to Order Page (future flow)
//         setPlacingOrder(true);
//         router.push(`/user/order/create-order/${product._id}`);
//     };

//     if (loading) return <Loader />;
//     if (!product) return <div className="min-h-screen flex items-center justify-center text-gray-500">Product not found</div>;

//     return (
//         <>
//             <Navbar />

//             <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">

//                 {/* Product Info */}
//                 <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

//                     {/* IMAGE */}
//                     <div className="flex justify-center">
//                         <div className="w-full max-w-sm aspect-square border border-gray-200 rounded-xl p-4 overflow-hidden flex items-center justify-center">
//                             <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
//                         </div>
//                     </div>

//                     {/* INFO */}
//                     <div className="flex flex-col gap-6">
//                         <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

//                         <div className="flex items-center gap-4">
//                             <span className="text-2xl font-bold text-[#02483D]">
//                                 Rs. {Number(product.price || 0).toLocaleString()}
//                             </span>
//                             <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${!isOutOfStock ? "border-green-500 text-green-600" : "border-red-400 text-red-500"}`}>
//                                 {!isOutOfStock ? "In Stock" : "Out of Stock"}
//                             </span>
//                         </div>

//                         <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>

//                         {/* ACTIONS */}
//                         <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl items-stretch">
//                             {/* Add to Cart */}
//                             <div className="flex-1">
//                                 <AddToCartButton productId={product._id} stock={product.stock} />
//                             </div>

//                             {/* Order Now */}
//                             <button
//                                 disabled={isOutOfStock || placingOrder}
//                                 onClick={handleOrderNow}
//                                 className={`flex-1 py-3 px-5 rounded-lg font-medium transition-transform border text-center shadow-sm ${isOutOfStock
//                                     ? "border-gray-300 text-gray-400 cursor-not-allowed"
//                                     : "border-[#02483D] text-[#02483D] hover:scale-102 hover:shadow-md active:scale-100"
//                                     }`}
//                             >
//                                 {placingOrder ? "Processing..." : "Order Now"}
//                             </button>
//                         </div>

//                     </div>

//                 </motion.div>

//                 {/* Product Suggestions */}
//                 <div>
//                     <h2 className="text-2xl font-bold text-[#02483D] mb-6">Explore other products</h2>
//                     <ProductsListSection category={product?.category} showName={false} showViewAll={false} />
//                 </div>

//                 {/* Category Suggestions */}
//                 <div>
//                     <h2 className="text-2xl font-bold text-[#02483D] mb-6">Explore other categories</h2>
//                     <CategoryListSection />
//                 </div>

//             </div>

//             <Footer />
//         </>
//     );
// };

// export default ProductPage;


import api from "@/services/api";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import ProductsListSection from "@/components/public/ProductsListSection";
import CategoryListSection from "@/components/public/CategoryListSection";
import AddToCartButton from "@/components/public/AddToCartButton";
import Link from "next/link";
import { Metadata } from "next";

// 1. DYNAMIC META TAG GENERATION
export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }): Promise<Metadata> {
    const { productId } = await params;

    try {
        const res = await api.get(`/user/products/get-product-by-id/${productId}`);
        const product = res.data.product;

        if (!product) return { title: "Product Not Found" };

        return {
            title: `${product.name} | Ancart`,
            description: product.description?.substring(0, 160), // Best for Google snippets
            openGraph: {
                title: product.name,
                description: product.description,
                images: [product.image], // Shows the product image on WhatsApp/Facebook
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.name,
                description: product.description,
                images: [product.image],
            }
        };
    } catch (error) {
        return { title: "Product Details" };
    }
}

// 2. HELPER TO FETCH PRODUCT DATA
async function getProduct(productId: string) {
    try {
        const res = await api.get(`/user/products/get-product-by-id/${productId}`);
        return res.data.product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

// 3. THE PAGE COMPONENT
export default async function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    const product = await getProduct(productId);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-gray-500">Product not found</div>;
    }

    const isOutOfStock = Number(product.stock) === 0;

    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* IMAGE */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-sm aspect-square border border-gray-200 rounded-xl p-4 overflow-hidden flex items-center justify-center">
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                    </div>

                    {/* INFO */}
                    <div className="flex flex-col gap-6">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-[#02483D]">
                                Rs. {Number(product.price || 0).toLocaleString()}
                            </span>
                            <span className={`px-3 py-1.5 text-xs font-semibold rounded-full border ${!isOutOfStock ? "border-green-500 text-green-600" : "border-red-400 text-red-500"}`}>
                                {!isOutOfStock ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl items-stretch">
                            <div className="flex-1">
                                <AddToCartButton productId={product._id} stock={product.stock} />
                            </div>
                            {isOutOfStock ? (
                                <button disabled className="flex-1 py-3 px-5 rounded-lg font-medium border border-gray-300 text-gray-400 cursor-not-allowed text-center shadow-sm">
                                    Out of Stock
                                </button>
                            ) : (
                                <Link
                                    href={`/user/order/create-order/${product._id}`}
                                    className="flex-1 py-3 px-5 rounded-lg font-medium transition-transform border border-[#02483D] text-[#02483D] text-center shadow-sm hover:scale-[1.02] hover:shadow-md active:scale-100"
                                >
                                    Order Now
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-[#02483D] mb-6">Explore other products</h2>
                    <ProductsListSection category={product.category} showName={false} showViewAll={false} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#02483D] mb-6">Explore other categories</h2>
                    <CategoryListSection />
                </div>
            </div>
            <Footer />
        </>
    );
}
