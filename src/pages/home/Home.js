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

  const { documents: documentStudents } = useCollection(
    'students', ["uId", "==", user.uid]
  )

  const { documents, error } = useCollection(
    'modules', ["uid", "==", user.uid], ['createdAt', 'desc']
  )

  // useEffect(() => 
  //   if (documentStudents) {
  //     setStudents(documentStudents.map(student => {
  //       return { value: student, label: student.displayName }
  //     }));
  //   }
  // }, [documentStudents])

  console.log("hi" + documentStudents)
  console.log("hiee" + documents)
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <ModuleList modules={documents} /> }
        {documentStudents && documentStudents.length != 0 && documentStudents[0].modules.length != 0 && <ModuleList modules={documentStudents[0].modules} /> }
      </div>
      <div className={styles.sidebar}>
        { documentStudents && documentStudents.length === 0 && <ModuleForm uid={user.uid} />}
      </div>
    </div>
  )
}
