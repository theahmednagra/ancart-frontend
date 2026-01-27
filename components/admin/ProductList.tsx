import { ProductInput } from '@/schemas/admin/product.schema';
import { useRouter } from 'next/navigation';

const ProductList = ({ products, isLoading = false }: { products: ProductInput[]; isLoading: boolean }) => {
    const router = useRouter();

    const handleClick = (productId: string) => {
        router.push(`/admin/product/${productId}`)
    }

    return (
        <div>
            <h2>All Products</h2>
            {isLoading ? (
                <div>Products loading...</div>
            ) : (
                <div>
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
        </div>
    );
}

export default ProductList