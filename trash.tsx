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
