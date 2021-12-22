import { useFirestore } from '../../hooks/useFirestore'
import { Link } from 'react-router-dom'

import styles from './Home.module.css'

export default function ModuleList({ modules }) {
  const { deleteDocument } = useFirestore('modules')

  return (
    <ul className={styles.modules}>
      {modules.map((module) => (
        <li key={module.id}>
          <Link to={`/modules/${module.id}`}>
            <p className={styles.name}>{module.name}</p>
          </Link>
          <p className={styles.semester}>Semester {module.semester}</p>
          <button onClick={() => deleteDocument(module.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}