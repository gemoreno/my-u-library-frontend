import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookListPage from './pages/bookListPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookListPage />
  </StrictMode>,
)
