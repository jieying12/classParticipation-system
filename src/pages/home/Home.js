import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

// styles
import styles from './Home.module.css'

// components
import ModuleList from './ModuleList'
import ModuleForm from './CreateModuleForm'

export default function Home() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection(
    'modules', ["uid", "==", user.uid], ['createdAt', 'desc']
  )

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <ModuleList modules={documents} />}
      </div>
      <div className={styles.sidebar}>
        <ModuleForm uid={user.uid} />
      </div>
    </div>
  )
}
