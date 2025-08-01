import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookSearch from './features/bookSearch/BookSearch'
import LibrarianDashboard from './features/checkoutManagement/LibrarianDashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookSearch />} />
        <Route path="/librarian" element={<LibrarianDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
