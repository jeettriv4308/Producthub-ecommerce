# ProductHub – E-commerce Product Management Platform

ProductHub is a modern and responsive e-commerce frontend application built using React, TypeScript, and Vite. It provides a simple shopping experience where users can explore products, search and filter items, view product details, and manage their shopping cart and wishlist.

The project focuses on reusable components, API integration, responsive UI design, and efficient state management.

## ✨ Features

- **Product Browsing:** Explore products fetched from the DummyJSON API.
- **Search Products:** Find products by their names with debounced search.
- **Category Filtering:** Filter products based on product categories.
- **Sorting:** Sort products according to available sorting options.
- **Price Filtering:** Filter products using minimum and maximum price values.
- **Pagination:** Navigate through product listings page by page.
- **Product Details:** View individual product information.
- **Shopping Cart:** Add products, remove items, and update quantities.
- **Wishlist:** Save and manage favourite products.
- **Persistent Storage:** Maintain cart and wishlist data using browser localStorage.
- **Responsive Design:** Optimized layouts for desktop, tablet, and mobile screens.
- **SEO Metadata:** Includes page titles and website metadata.
- **Reusable Components:** Organized components for easier maintenance and scalability.
- **Loading and Error States:** Improve the user experience during data loading and API failures.

## 🛠️ Tech Stack

| Technology       | Purpose                                |
| ---------------- | -------------------------------------- |
| React.js         | Building the user interface            |
| TypeScript       | Type safety and maintainable code      |
| JavaScript       | Application logic                      |
| HTML5            | Page structure                         |
| CSS3             | Styling and responsive layouts         |
| Vite             | Development server and build tool      |
| React Router DOM | Client-side navigation                 |
| DummyJSON API    | Product data and API integration       |
| Context API      | Global cart and wishlist state         |
| localStorage     | Persistent cart and wishlist data      |
| Git & GitHub     | Version control and project management |

## 🎨 Design System

ProductHub follows a clean, minimal, and modern design approach.

| Color          | Hex Code  | Usage                          |
| -------------- | --------- | ------------------------------ |
| Pure White     | `#FFFFFF` | Main background and structure  |
| Midnight Black | `#09090B` | Navigation, branding, and text |
| Amber Gold     | `#B45309` | Buttons, links, and highlights |

The interface is designed to provide a consistent shopping experience with clear navigation, readable typography, and responsive product layouts.

## 📡 API Integration

ProductHub uses the [DummyJSON Products API](https://dummyjson.com/docs/products) to retrieve product information.

**Base API endpoint:**

```text
https://dummyjson.com/products
```

**API endpoints used:**

| Endpoint                            | Purpose                          |
| ----------------------------------- | -------------------------------- |
| `/products?limit=12&skip=0`         | Fetch products                   |
| `/products/search?q=phone&limit=12` | Search products                  |
| `/products/{id}`                    | Fetch individual product details |
| `/products/categories`              | Retrieve product categories      |

The API provides sample product data for frontend development and testing.

## 📁 Project Structure

```text
ProductHub/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   └── products/
│   │
│   ├── context/
│   │   └── ShopContext.tsx
│   │
│   ├── hooks/
│   │   └── usePageTitle.ts
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── Wishlist.tsx
│   │   ├── Cart.tsx
│   │   └── NotFound.tsx
│   │
│   ├── services/
│   │   └── productService.ts
│   │
│   ├── styles/
│   │   └── responsive.css
│   │
│   ├── types/
│   │   └── product.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## ⚙️ Installation and Setup

Follow these steps to run ProductHub locally.

### 1. Clone the repository

```bash
git clone https://github.com/jeettriv4308/Producthub-ecommerce
```

### 2. Navigate to the project directory

```bash
cd ProductHub
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open in your browser

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## 🧪 Testing and Production Build

Run the following commands to test and prepare the application for production.

**Run tests:**

```bash
npm run test:run
```

**Create production build:**

```bash
npm run build
```

**Preview production build:**

```bash
npm run preview
```

## 🚀 Deployment

ProductHub can be deployed using platforms such as Vercel.

Basic deployment process:

1. Push the project to GitHub.
2. Open [Vercel](https://vercel.com/).
3. Import your GitHub repository.
4. Configure the build command as `npm run build`.
5. Set the output directory to `dist`.
6. Deploy the application.

## 🎯 Project Objectives

The main objectives of ProductHub are:

- Develop a modern e-commerce frontend application.
- Understand React component-based architecture.
- Implement API integration and asynchronous data handling.
- Practice TypeScript and reusable component development.
- Implement global state management using Context API.
- Improve responsive design and user experience.
- Understand application testing and production deployment.

## 🔮 Future Enhancements

- User authentication and account management.
- Backend integration and database support.
- Secure online payment gateway.
- Order history and order tracking.
- Advanced product recommendations.
- Admin dashboard for product management.
- Product reviews and ratings.

## 👨‍💻 Author

**Jeet Trivedi**

Frontend Developer | React.js | TypeScript | JavaScript

## 📄 License

This project is developed for educational and learning purposes. You may modify and extend it according to your requirements.
