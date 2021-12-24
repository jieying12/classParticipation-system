import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'

// styles
import styles from './Navbar.module.css'

export default function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <Link to="#" className="menu-bars">
        <ul>
          <li className={styles.title}>Class Participation Records</li>

          {!user && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Register as Student</Link></li>
              <li><Link to="/signupProf">Register as Professor</Link></li>
            </>
          )}

          {user && (
            <>
              <li>welcome {user.displayName}</li>
              <li>
                <button className="btn" onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </Link>
    </nav>
  )
}
