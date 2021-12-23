import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function ModuleForm({ uid }) { //for professors' use only, students have separate view: no validation required
  const [name, setName] = useState('');
  const [studentName] = useState('');
  const [studentScore] = useState(0);
  const [semester, setSemester] = useState(1);
  const [year, setYear] = useState(1);
  const { addDocument, response } = useFirestore('modules');
  const [students] = useState([]);
  const [studentCount] = useState(0); //by default 0

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      semester,
      year,
      students,
      studentCount,
    });
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setYear(1)
      setSemester(1)
    }
  }, [response.success])

  return (
    <>
      <h3>Add a Module</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Module name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Year</span>
          <select
            onChange={(e) => setYear(e.target.value)}
            value={year}
          >
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
            <option value="5">Year 5</option>
          </select>
        </label>
        <label>
          <span>Semester:</span>
          <select
            required
            onChange={(e) => setSemester(e.target.value)}
            value={semester}
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
  )
}