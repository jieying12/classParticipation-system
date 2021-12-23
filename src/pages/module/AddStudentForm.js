import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";
import { db } from "../../firebase/config";
import 'firebase/firestore';

export default function AddStudentForm() {

    /*
    const id = useParams;
    const [studentName, setStudentName] = useState('');
    const { updateDocument } = useFirestore('modules');
    const { document, error } = useDocument('modules', id);

    const [students, setStudents] = useState([]);
    const studentsRef = (collection(db, 'students'));

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    const handleSubmit = async (studentName) => {
        await updateDocument(id, {
            students: {
                studentName: studentName,
                studentScore: 0,
            }
        })
    }

    return (
        <>
            <h3>Add a Student</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Student:</span>
                    <select
                        required
                        onChange={(e) => setStudentName(e.target.value)}
                        value={studentName}
                    >
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Special Term 1</option>
                        <option value="4">Special Term 2</option>
                    </select>
                </label>
                <button>Add Module</button>
            </form>
        </>
    );
    */
}