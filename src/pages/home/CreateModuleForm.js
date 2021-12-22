import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function ModuleForm({ uid }) {
  const [name, setName] = useState('')
  const [semester, setSemester] = useState('')
  const { addDocument, response } = useFirestore('modules')

  const handleSubmit = (e) => {
    e.preventDefault()
    addDocument({
      uid, 
      name, 
      semester,
    })
  }

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('')
      setSemester('')
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
          <span>Semester:</span>
          <input
            type="number"
            required
            onChange={(e) => setSemester(e.target.value)} 
            value={semester} 
          />
        </label>
        <button>Add Module</button>
      </form>
    </>
  )
}