# E-commerce Web Application

A full-featured **e-commerce web application** with separate **user** and **admin** functionality. Built with a modern tech stack, responsive design, and smooth user experience.

---

## Project Summary

- **Project Type:** E-commerce web application with user and admin functionality
- **Tech Stack:**
  - **Frontend:** Next.js, React, Tailwind CSS, Shadcn UI, Framer Motion
  - **Backend:** Express.js, MongoDB, Mongoose, JWT, Cloudinary
  - **State Management:** Redux
  - **Form Validation:** React Hook Form + Zod

---

## Main Features

### User Features

- Browse products by category
- View detailed product information (images, description, stock status)
- Add products to cart
- Update cart quantities and remove items
- Place single-item orders or order all items from the cart
- Enter and validate delivery address for orders
- View all orders with details
- Cancel orders with confirmation modal

### Admin Features

- Admin dashboard with 3 main sections:
  - Manage Products
  - Manage Categories
  - Manage Orders
- Update order status: **PENDING → CONFIRMED → SHIPPED → DELIVERED**
- Cancel orders with optional stock restoration
- View all orders with full details
- Reusable and consistent UI components (modals, forms, tables)

### Reusable Components

- Navbar and Footer for both users and admin
- Confirmation modal (for cancelling orders or confirming actions)
- Reusable address form (used in single-item order and cart checkout)
- Form components with React Hook Form + Zod validation

---

## APIs

### 1. Auth Routes (`/api/auth`)

- `POST /signup` → Register a new user
- `POST /verification` → Verify user email
- `POST /resend-verification` → Resend verification email
- `POST /signin` → Login user
- `GET /me` → Get logged-in user info (requires auth)
- `GET /signout` → Logout user (requires auth)

### 2. Admin Category Routes (`/api/admin/categories`)

**(Protected: admin only)**

- `GET /get-all-categories` → List all categories
- `GET /get-category-by-id/:categoryId` → Get a single category by ID
- `POST /create-category` → Create a category (supports image upload)
- `PATCH /update-category/:categoryId` → Update category (supports image upload)
- `PATCH /deactivate-category/:categoryId` → Deactivate a category

### 3. Admin Product Routes (`/api/admin/products`)

**(Protected: admin only)**

- `GET /get-all-products` → List all products
- `GET /get-products-by-category/:categoryId` → List products by category
- `GET /get-product-by-id/:productId` → Get product by ID
- `POST /create-product` → Create a product (supports image upload)
- `PATCH /update-product/:productId` → Update product (supports image upload)
- `PATCH /deactivate-product/:productId` → Deactivate a product

### 4. Admin Order Routes (`/api/admin/orders`)

**(Protected: admin only)**

- `GET /get-all-orders` → List all orders
- `GET /get-order-by-id/:orderId` → Get order by ID
- `PATCH /update-order-status/:orderId` → Update order status
- `PATCH /cancel-order/:orderId` → Cancel order as admin

### 5. Public Category Routes (`/api/user/categories`)

- `GET /get-public-categories` → List public categories
- `GET /get-category-by-id/:categoryId` → Get public category by ID

### 6. Public Product Routes (`/api/user/products`)

- `GET /get-public-products` → List all public products
- `GET /get-product-by-id/:productId` → Get public product by ID
- `GET /get-products-by-category/:categoryId` → List products by category
- `GET /search-products` → Search products by query

### 7. User Cart Routes (`/api/cart`)

**(Protected: logged-in users)**

- `GET /get-cart` → Get user cart
- `POST /add-to-cart` → Add product to cart
- `DELETE /remove-from-cart/:productId` → Remove product from cart
- `PATCH /update-quantity` → Update product quantity in cart
- `POST /clear-cart` → Clear all items in cart

### 8. User Order Routes (`/api/orders`)

**(Protected: logged-in users)**

- `POST /create-order` → Create an order directly
- `GET /get-user-orders` → Get orders of logged-in user
- `POST /create-order-from-cart` → Create order from cart items
- `PATCH /cancel-order/:orderId` → Cancel own order

---

## UX / UI Highlights

- Clean and consistent design using Tailwind CSS
- Fully responsive layout for mobile and desktop
- Smooth animations with Framer Motion
- Visual feedback for loading, success, and errors
- Clear separation between user and admin flows

---

## Other Features

- Role-based routing and authentication protection
- Reusable and modular code structure
- Scalable and maintainable architecture

---

## Installation

```bash
# Clone the repository
git clone https://github.com/ahmednagradev/ancart-frontend.git
cd ancart-frontend

# Install dependencies
npm install

# Create a .env file with your environment variables
# Example:
NEXT_PUBLIC_BASE_URL=https://your-backend-url.com
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-emailjs-service-id

# Start development server
npm run dev
```
