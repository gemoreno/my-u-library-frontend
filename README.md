# 📚 My U Library – Frontend

This is the frontend for **My U Library**, a simple library management system built with **React** and **TypeScript**. It provides a responsive, role-based UI for managing books, users, and checkouts, powered by a Django + PostgreSQL backend.

---

## 🚀 Tech Stack

- ⚛️ React 18 + TypeScript
- 🧠 Redux Toolkit (authentication, state management)
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

## 🧪 Features

| Feature                         | Roles              |
|----------------------------------|---------------------|
| 🔐 Email/password login         | All users           |
| 🧾 View personal checkouts      | Student, Librarian  |
| 📚 Search and view books        | All users           |
| ➕ Add books                    | Librarian only      |
| 🔄 Checkout / Return books     | Librarian only      |
| 👤 Add new users                | Admin, Librarian    |
| 📋 View all checkouts          | Librarian only      |

Role-based routing ensures users only see and access what’s relevant.

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
VITE_API_URL=http://localhost:8000/api
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
3. Set `buildCommand` and `startCommand`:

```yaml
buildCommand: npm install && npm run build
startCommand: npm run preview
```

4. Add environment variable:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

> ✅ Use `vite.config.ts` and `import.meta.env` to reference environment vars.

---

## 📦 Key Packages

- `@reduxjs/toolkit`
- `react-router-dom`
- `axios`
- `jwt-decode`
- `tailwindcss`
- `shadcn/ui`
- `clsx` / `classnames`

---

## 📃 License

MIT – Free to use for educational or non-commercial projects.

---

## 🙋‍♂️ Maintainer

Built by **Gerardo Moreno** – Electrical & Software Engineer  
Connect if you want help deploying or extending the system!