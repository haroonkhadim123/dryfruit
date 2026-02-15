DryFruit E-Commerce Website

A modern full-stack e-commerce web application for buying and selling dry fruits online, built with Next.js. This project demonstrates real-world web development practices including server-side rendering, API integration, responsive design, authentication, and smooth UI/UX animations. It is designed to provide a seamless shopping experience for customers and an easy-to-use dashboard for admins.

Features
User Features

Product Catalog: Browse a variety of dry fruits with images, descriptions, and prices.

Search & Filter: Easily find products by name, category, or price.

Shopping Cart: Add, remove, and update product quantities.

User Authentication: Secure login and registration with account management.

Order History: View past orders and track current orders.

Responsive Design: Optimized for mobile, tablet, and desktop devices.

Smooth Animations: Engaging UI with Framer Motion for a modern experience.

Admin Features

Dashboard: Manage products, categories, and orders from a single panel.

Product Management: Add, edit, or remove products efficiently.

Order Management: Track and update order status.

Tech Stack

Frontend: Next.js, React, Tailwind CSS, Framer Motion

Backend: Node.js, Express (or Next.js API routes)

Database: MongoDB or MySQL

Authentication: NextAuth.js or JWT-based system

Payment Integration: Ready for Stripe or other payment gateways

Problems Faced & Solutions

Developing a full-stack e-commerce website comes with its challenges. Some of the key problems I faced and how I solved them:

Image Upload and Display Issues

Problem: Product images were not showing correctly on some pages and in production.

Solution: Used Next.js Image component with correct src paths, width and height attributes, and priority for main images.

Authentication and Session Management

Problem: Handling user sessions securely with login, signup, and protected routes.

Solution: Implemented NextAuth.js for authentication and used React hooks to manage session state.

Responsive Layout Challenges

Problem: Some sections were overflowing on smaller screens and horizontal scrollbars appeared.

Solution: Used Tailwind CSS utilities like overflow-x-hidden, flex-wrap, and responsive breakpoints to fix layout issues.

Shopping Cart and State Management

Problem: Cart items were not persisting after page reloads.

Solution: Implemented localStorage along with React state management to persist cart data.

Smooth Animations Without Performance Issues

Problem: Animations caused lag on slower devices.

Solution: Used Framer Motion with optimized transitions and whileInView triggers to reduce performance impact.

Deployment Issues

Problem: Some API routes and images were not working correctly after deploying to Vercel.

Solution: Ensured all environment variables were correctly set and image paths were relative to the /public folder.
Live Demo:https://dryfruit-five.vercel.app/

