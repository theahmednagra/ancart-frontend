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