# 📚 My U Library – Frontend

This is the frontend for **My U Library**, a simple library management system built with **React** and **TypeScript**. It provides a responsive, role-based UI for managing books, users, and checkouts, powered by a Django + PostgreSQL backend.

---

## 🌐 Live Demo

You can try the deployed app here:

🔗 [My U Library on Render](https://my-u-library-frontend.onrender.com/)

Use the credentials in the table below to log in as a student or librarian.

---

## 🔑 Test User Credentials

| Email        | Password   | Role      |
|--------------|------------|-----------|
| s1@g.com     | lib12345   | Student   |
| s2@g.com     | lib12345   | Student   |
| s3@g.com     | lib12345   | Student   |
| s4@g.com     | lib12345   | Student   |
| l1@g.com     | lib12345   | Librarian |
| l2@g.com     | lib12345   | Librarian |

---

## 🧪 Features

| Feature                         | Roles              |
|---------------------------------|--------------------|
| 🔐 Email/password login         | All users          |
| 🧾 View personal checkouts      | Student only       |
| 📚 Search and view books        | All users          |
| ➕ Add books                    | Librarian only     |
| ↗️ Checkout books               | Student only       |
| 🔄 Return books                 | Librarian only     |
| 👤 Add new users                | Librarian only     |
| 📋 View all checkouts           | Librarian only     |

Role-based routing ensures users only see and access what’s relevant.

---

## 🚀 Tech Stack

- ⚛️ React 18 + TypeScript
- 🧠 Redux Toolkit (authentication and current user state)
- 🔐 JWT Auth with role-based access
- 🎨 Tailwind CSS + shadcn/ui (accessible components)
- 🔁 Axios (API integration)
- 🧭 React Router
- 🧑‍💻 Deployed on **Render**

---

## 📁 Project Structure

```
my-u-lib-front/
│
├── src/
│   ├── App.tsx                # Root component with routing
│   ├── assets/                # Static assets (e.g., logos)
│   ├── components/            # Reusable UI and layout components
│   │   ├── AddBookDialog.tsx
│   │   ├── BookCard.tsx
│   │   ├── Layout.tsx
│   │   └── ui/                # shadcn/ui-based components
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       └── ...
│   ├── constants.ts           # Role constants, configs
│   ├── features/              # App logic split by domain
│   │   ├── auth/              # Login, token, user info
│   │   ├── bookSearch/        # Book search and list
│   │   ├── checkoutManagement/ # Checkout/return features
│   │   └── userManagement/    # Admin/Librarian user actions
│   ├── lib/                   # Axios instance, utilities
│   ├── store.ts               # Redux store setup
│   └── main.tsx               # Vite + React root
├── vite.config.ts             # Vite configuration
└── tsconfig.*.json            # TypeScript settings
```

---

## 🧑‍💻 Getting Started (Local)

1. **Clone the repository**

```bash
git clone https://github.com/your-username/my-u-lib-front.git
cd my-u-lib-front
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables**

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

Update the URL if your backend is deployed on Render.

4. **Run the app**

```bash
npm run dev
```

App will be available at [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deployment (Render)

To deploy the frontend:

1. Push to GitHub
2. Create a new **Web Service** in [Render](https://render.com/)
3. Set `Build Command` and `Publish Directory`:

```yaml
buildCommand: npm install; npm run build
publishDirectory: dist
```

4. Add environment variable:

```
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

---

## 📦 Key Packages

- `@reduxjs/toolkit`
- `react-router-dom`
- `axios`
- `jwt-decode`
- `tailwindcss`
- `shadcn/ui`

---

## 📃 License

MIT – Free to use for educational or non-commercial projects.

---

## 🙋‍♂️ Maintainer

Built by **Gerardo Moreno** – Electrical & Software Engineer  
Connect if you want help deploying or extending the system!
