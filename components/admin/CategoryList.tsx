import { CategoryInput } from '@/schemas/admin/category.schema';
import { useRouter } from 'next/navigation';

const CategoryList = ({ categories, isLoading }: { categories: CategoryInput[]; isLoading: boolean; }) => {
    const router = useRouter();

    const handleClick = (categoryId: string) => {
        router.push(`/admin/category/${categoryId}`)
    }

    return (
        <div>
            <h2>All Categories</h2>
            {isLoading ? (
                <div>Categories loading...</div>
            ) : (
                <div>
                    <div className='flex flex-wrap gap-8 justify-center'>
                        {categories?.map((category: any) => (
                            <div
                                key={category._id}
                                onClick={() => handleClick(category._id)}
                                className={`cursor-pointer ${!category.isActive ? "opacity-50" : ""}`}
                            >
                                <img src={category.image} alt="" className='h-26 w-26' />
                                <h2>{category.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryList