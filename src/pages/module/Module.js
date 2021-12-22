import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'
import { useFirestore } from "../../hooks/useFirestore"

// styles
import styles from './Module.module.css'

export default function Module() {
    const { id } = useParams()
    const { updateDocument, response } = useFirestore('modules')
    const { document, error } = useDocument('modules', id)

    const handleIncr = async (points) => {
        const newPoint = points + 1
        await updateDocument(id, {
            points: newPoint
        })
    }

    const handleDecr = async (points) => {
        const newPoint = points - 1
        await updateDocument(id, {
            points: newPoint
        })
    }

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className={styles.module}>
            <>
                <h2 className="page-title">{document.name}</h2>
                <p>Semester {document.semester}</p>
                <p>Participation Points {document.points}</p>
                <button onClick={() => {
                    handleIncr(document.points)
                }}>
                    Increase Participation </button>
                <button onClick={() => {
                    handleDecr(document.points)
                }}>
                    Decrease Participation </button>
            </>
        </div>
    )
}