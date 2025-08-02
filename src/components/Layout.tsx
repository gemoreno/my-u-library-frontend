import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/features/auth/authSlice'
import LoginDialog from './LoginDialog'
import { ROUTES, USER_ROLES } from '@/constants'
import NavButton from './NavButton'
import AddUserDialog from './AddUserDialog'
import { useUser } from '@/features/userManagement/useUser'
const Layout = () => {
  const userRole = useSelector(selectCurrentUser)?.role;
  const { handleAddUser, loading } = useUser();

  return (
    <>
      <nav className="bg-gray-100 px-4 py-3 flex justify-between items-center shadow">
        <div className="text-xl font-bold text-blue-800">
          My U Library
        </div>
        <div className="flex space-x-4">
            <NavButton to={ROUTES.HOME} label='Book Search' />
            {userRole === USER_ROLES.STUDENT && (
                <NavButton to={ROUTES.MY_CHECKOUTS} label='My Checkouts' />
            )}
            {userRole === USER_ROLES.LIBRARIAN && (
                <NavButton to={ROUTES.LIBRARIAN_DASHBOARD} label='Dashboard' />
            )}
            {userRole === USER_ROLES.LIBRARIAN && (
                <AddUserDialog onAddUser={handleAddUser} loading={loading}/>
            )}
            <LoginDialog />
        </div>
      </nav>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
