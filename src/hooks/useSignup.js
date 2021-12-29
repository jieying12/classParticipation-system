import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useFirestore } from './useFirestore'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  const { addDocument : addStudentDocument } = useFirestore('students')
  const { addDocument : addProfessorDocument } = useFirestore('professors')

  const signup = async (email, password, displayName, role) => {
    setError(null)
    setIsPending(true)
  
    try {
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Sign up failed')
      }

      await res.user.updateProfile({ displayName })
      const uId = res.user.uid

      if (role == 'students') {
        addStudentDocument({
          uId,
          email,
          password,
          displayName
        });
      } else {
        addProfessorDocument({
          uId,
          email,
          password,
          displayName
        });
      }

      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}