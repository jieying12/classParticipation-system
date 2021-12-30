import React from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from '../../hooks/useCollection'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import 'firebase/firestore';

export default function AddStudentForm({ module }) {
    const [students, setStudents] = useState([])
    const { documents } = useCollection('students')
    const { updateDocument, response } = useFirestore('modules');

    // form fields
    const [selectedStudents, setSelectedStudents] = useState([])
    const [formError, setFormError] = useState(null)

    useEffect(() => {
        if (documents) {
            setStudents(documents.map(student => {
                return { value: student, label: student.displayName }
            }))
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null)

        if (selectedStudents.length < 1) {
            setFormError('Please add at least 1 student')
            return
        }

        const selectedStudentsList = selectedStudents.map(s => {
            return {
                displayName: s.value.displayName,
                email: s.value.email,
                uId: s.value.uId,
                studentScore: 0,
                comments: []
            }
        })

        await updateDocument(module.id, {
            students: [...module.students, ...selectedStudentsList],
        })
    }

    return (
        <>
            <h3>Add a Student</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <Select
                        onChange={(option) => setSelectedStudents(option)}
                        options={students}
                        isMulti
                    />
                </label>
                <button>Add Student</button>

                {formError && <p>{formError}</p>}
            </form>
        </>
    );

}