import { useState, useEffect } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { useFirestore } from '../../hooks/useFirestore'

// styles
import styles from './Signup.module.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  // const uId = email;
  const { signup, isPending, error } = useSignup()
  const { addDocument, response } = useFirestore('students')
  const role = 'student'

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, role)

    // localStorage.setItem("currentUser", JSON.stringify({
    //   uId,
    //   email,
    //   password,
    //   displayName,
    // }));

  }

  useEffect(() => {
    if (response.success) {
      setEmail('')
      setPassword('')
      setDisplayName('')
    }
  }, [response.success])

  return (
    <>
      <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <h2>Register as Student</h2>
        <label>
          <span>Email:</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Username:</span>
          <input
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        {!isPending && <button className="btn">Sign Up</button>}
        {isPending && <button className="btn" disabled>Loading</button>}
        {error && <p>{error}</p>}
      </form>
    </>
  )
}
