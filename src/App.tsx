import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BookSearch from './features/bookSearch/BookSearchPage'
import LibrarianDashboard from './features/checkoutManagement/LibrarianDashboard'
import Layout from './components/Layout'
import MyCheckoutsPage from './features/checkoutManagement/MyCheckoutsPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<BookSearch />} />
          <Route path='my-checkouts' element={<MyCheckoutsPage />} />
          <Route path="/librarian" element={<LibrarianDashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
