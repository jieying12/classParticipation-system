import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useDocument } from "../../hooks/useDocument";
import 'firebase/firestore';

export default function AddStudentForm({ module }) {
    const [studentName, setStudentName] = useState('');
    const { updateDocument, response } = useFirestore('modules');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const student = {
            studentName: studentName,
            studentScore: 0,
            comments: []
        }

        await updateDocument(module.id, {
            students: [...module.students, student],
        })
        if (!response.error) {
            setStudentName('')
        }
    }

    return (
        <>
            <h3>Add a Student</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Student name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setStudentName(e.target.value)}
                        value={studentName}
                    />
                </label>
                <button>Add Student</button>
            </form>
        </>
    );

}