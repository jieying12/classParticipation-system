import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDocument } from '../../hooks/useDocument'
import { useFirestore } from "../../hooks/useFirestore"
import { db } from 'firebase/firebase-remote-config'

// styles
import styles from './Module.module.css'
import AddStudentForm from "./AddStudentForm"

export default function Module() {
    const { id } = useParams()
    const { updateDocument } = useFirestore('modules')
    const { document, error } = useDocument('modules', id)

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <>
            <div className={styles.module}>
                <h2 className="page-title">{document.name}</h2>
                <p>Year {document.year} Semester {document.semester}</p>
                <p>Number of Students: {document.students.length}</p>
                <p>{Array.from(document.students).map((student) => (
                    <div key={student.id}>
                        <h1>{student.studentName}</h1>
                        <p>{student.studentScore}</p>
                        <hr />
                    </div>
                ))}
                </p>
                {/* style */}
                <div className={''}>
                    <AddStudentForm module={document} />
                </div>

            </div>
        </>
    );

    /*

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
                <p>Year {document.year} Semester {document.semester}</p>
                <p>Number of Students: {document.studentCount}</p>
                <p>Participation Points {document.points}</p>
                <p>{document.students}</p>
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

    */
}