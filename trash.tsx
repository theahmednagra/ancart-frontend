// import api from '@/services/api';
// const getProducts = async () => {
//   const res = await api.get(`/user/products/get-public-products`);
//   console.log(res.data)
//   return res.data;
// }
// getProducts();


// Remove the zod validation from edit forms
// Some fields are not getting the default value in edit forms


// "use client";

// import AddCategoryForm from '@/components/admin/CategoryForm';
// import CategoryList from '@/components/admin/CategoryList';
// import AddProductForm from '@/components/admin/ProductForm';
// import ProductList from '@/components/admin/ProductList';
// import { CategoryInput } from '@/schemas/admin/category.schema';
// import { ProductInput } from '@/schemas/admin/product.schema';
// import api from '@/services/api';
// import { useEffect, useState } from 'react';
// import { toast } from 'sonner';

// const AdminPanel = () => {
//     const [isLoading, setIsLoading] = useState(false);
//     const [products, setProducts] = useState<ProductInput[]>([]);
//     const [categories, setCategories] = useState<CategoryInput[]>([]);

//     useEffect(() => {
//         const fetchProductsAndCategories = async () => {
//             setIsLoading(true);

//             try {
//                 const [categoryRes, productRes] = await Promise.all([
//                     api.get("/admin/categories/get-all-categories"),
//                     api.get("/admin/products/get-all-products"),
//                 ]);

//                 setCategories(categoryRes.data.categories);
//                 setProducts(productRes.data.products);

//             } catch (err) {
//                 toast.error(err instanceof Error ? err.message : "Something went wrong");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchProductsAndCategories();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-100 flex">

//             {/* Main Content */}
//             <main className="flex-1 p-2 space-y-10 mt-20">

//                 {/* Forms Section */}
//                 <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
//                     <div className="">
//                         <AddCategoryForm />
//                     </div>

//                     <div className="">
//                         <AddProductForm />
//                     </div>
//                 </section>

//                 {/* Lists Section */}
//                 <section className="space-y-8">

//                     {/* Categories */}
//                     <div className="">
//                         <CategoryList categories={categories} isLoading={isLoading} />
//                     </div>

//                     {/* Products */}
//                     <div className="">
//                         <ProductList products={products} isLoading={isLoading} />
//                     </div>

//                 </section>

//             </main>
//         </div>
//     );
// };

// export default AdminPanel;



// "use client"
// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';

// const Navbar = () => {

//     const [isVisible, setIsVisible] = useState(true);
//     const [lastScrollY, setLastScrollY] = useState(0);

//     // Handle scroll behavior to show/hide navbar
//     useEffect(() => {
//         const handleScroll = () => {
//             const currentScrollY = window.scrollY;
//             setIsVisible(lastScrollY > currentScrollY || currentScrollY < 100);
//             setLastScrollY(currentScrollY);
//         };

//         window.addEventListener('scroll', handleScroll, { passive: true });
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, [lastScrollY]);

//     return (
//         <header>
//             <motion.nav
//                 initial={{ y: 0 }}
//                 animate={{ y: isVisible ? 0 : -100 }}
//                 transition={{ duration: 0.3 }}
//                 className="backdrop-blur-lg bg-gray-50/80 border-b border-gray-200"
//             >
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between h-16 items-center">
//                         <h2
//                             className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent select-none"
//                         >
//                             ancart
//                         </h2>

//                         {/* Right buttons */}
//                         <div className="flex items-center gap-4">
//                             {/* buttons here */}
//                         </div>
//                     </div>
//                 </div>
//             </motion.nav>
//         </header>
//     );
// };

// export default Navbar;


// {/* Newsletter */ }
// <div className="space-y-3">
//     <h4 className="font-semibold">Subscribe</h4>
//     <p className="text-gray-300 text-sm">Get the latest products and offers directly in your inbox.</p>
//     <div className="flex mt-2">
//         <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg outline-none bg-gray-200 text-gray-900 text-sm" />
//         <button className="px-4 py-2 bg-indigo-600 rounded-r-lg font-medium hover:bg-indigo-700 transition">
//             Subscribe
//         </button>
//     </div>
// </div>

"use client";

// import { useState } from "react";
// import api from "@/services/api";
// import { toast } from "sonner";
// import { motion } from "framer-motion";
// import Navbar from "@/components/public/Navbar";
// import ProductCard from "@/components/public/ProductCard";

// type DeliveryAddress = {
//     fullName: string;
//     phone: string;
//     addressLine: string;
//     city: string;
// };

// type CartItem = {
//     productId: string;
//     name: string;
//     price: number;
//     quantity: number;
//     image: string;
// };

// const OrderPage = ({ cartItems }: { cartItems: CartItem[] }) => {
//     const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
//         fullName: "",
//         phone: "",
//         addressLine: "",
//         city: "",
//     });

//     const [loading, setLoading] = useState(false);

//     const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setDeliveryAddress({ ...deliveryAddress, [e.target.name]: e.target.value });
//     };

//     const handlePlaceOrder = async () => {
//         if (!cartItems.length) {
//             toast.error("Your cart is empty!");
//             return;
//         }

//         const { fullName, phone, addressLine, city } = deliveryAddress;
//         if (!fullName || !phone || !addressLine || !city) {
//             toast.error("Please fill all delivery address fields");
//             return;
//         }

//         const items = cartItems.map(item => ({
//             productId: item.productId,
//             quantity: item.quantity,
//         }));

//         try {
//             setLoading(true);
//             const res = await api.post("/user/orders/create-order", { deliveryAddress, items });
//             toast.success("Order placed successfully!");
//             // redirect to order details page
//             window.location.href = `/user/order/${res.data.data._id}`;
//         } catch (err: any) {
//             toast.error(err?.response?.data?.message || "Order failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <Navbar />

//             <main className="max-w-7xl mx-auto px-4 py-10 space-y-10">
//                 <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">

//                     {/* Delivery Address Form */}
//                     <div className="md:col-span-2 bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-4">
//                         <h2 className="text-2xl font-bold text-[#02483D] mb-4">Delivery Address</h2>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <input
//                                 name="fullName"
//                                 placeholder="Full Name"
//                                 value={deliveryAddress.fullName}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#02483D] outline-none"
//                             />
//                             <input
//                                 name="phone"
//                                 placeholder="Phone Number"
//                                 value={deliveryAddress.phone}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#02483D] outline-none"
//                             />
//                             <input
//                                 name="addressLine"
//                                 placeholder="Address Line"
//                                 value={deliveryAddress.addressLine}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#02483D] outline-none md:col-span-2"
//                             />
//                             <input
//                                 name="city"
//                                 placeholder="City"
//                                 value={deliveryAddress.city}
//                                 onChange={handleInputChange}
//                                 className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-[#02483D] outline-none"
//                             />
//                         </div>
//                     </div>

//                     {/* Order Summary */}
//                     <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col space-y-6">
//                         <h2 className="text-2xl font-bold text-[#02483D]">Order Summary</h2>

//                         <div className="space-y-4 max-h-100 overflow-y-auto">
//                             {cartItems.map(item => (
//                                 <div key={item.productId} className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0">
//                                     <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
//                                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                                     </div>
//                                     <div className="flex-1">
//                                         <h3 className="text-gray-900 font-semibold">{item.name}</h3>
//                                         <p className="text-gray-700 text-sm">Price: {item.price} PKR</p>
//                                         <p className="text-gray-700 text-sm">Quantity: {item.quantity}</p>
//                                         <p className="text-gray-700 text-sm">Subtotal: {item.price * item.quantity} PKR</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="flex justify-between items-center mt-4">
//                             <span className="font-semibold text-gray-700">Total:</span>
//                             <span className="font-bold text-lg text-[#02483D]">{totalAmount} PKR</span>
//                         </div>

//                         <button
//                             onClick={handlePlaceOrder}
//                             disabled={loading}
//                             className="w-full bg-[#02483D] text-white font-semibold py-3 rounded-lg hover:bg-[#01664A] transition disabled:opacity-60"
//                         >
//                             {loading ? "Placing Order..." : "Place Order"}
//                         </button>
//                     </div>

//                 </motion.section>
//             </main>
//         </>
//     );
// };

// export default OrderPage;
