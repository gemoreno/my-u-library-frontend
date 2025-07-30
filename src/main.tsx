import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BookSearch from './features/bookSearch/BookSearch.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookSearch />
  </StrictMode>,
)
