import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import { useEffect } from 'react'

// styles
import styles from './Home.module.css'

// components
import ModuleList from './ModuleList'
import ModuleForm from './CreateModuleForm'
import { useState } from 'react'

export default function Home() {
  const { user } = useAuthContext()
  const [students, setStudents] = useState([])

  const { documents, error } = useCollection(
    'modules', ["uid", "==", user.uid], ['createdAt', 'desc']
  )

  const { documentStudents } = useCollection(
    'students', ["email", "==", user.email]
  )

  useEffect(() => {
    if (documentStudents) {
      setStudents(documentStudents.map(student => {
        return { value: student, label: student.displayName }
      }));
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <ModuleList modules={documents} />}
      </div>
      <div className={styles.sidebar}>
        {students !== undefined && students.length === 0 && <ModuleForm uid={user.uid} />}
      </div>
    </div>
  )
}
