import React, { useEffect, useState } from 'react'
import StudentServices from '../services/StudentServices'
import { Link } from 'react-router-dom'
import '../css/ListStudent.css';
import swal from 'sweetalert';
const ListEmployeeComponents = () => {

  const [student,setStudents] = useState([])
  
  useEffect(() =>{
        // StudentServices.getAllStudents().then((response) => {
        //     setStudents(response.data)
        //     console.log(response.data)
        // }).catch(error => {
        //     console.log(error);
        // })
       // swal("deleted!", "deleted successfully!", "success");
        getAllstudents();
  },[])

//---------
const getAllstudents = () => {
    StudentServices.getAllStudents().then((response) => {
      setStudents(response.data)
      console.log(response.data)
  }).catch(error => {
      console.log(error);
  })
}
//-------------------
  const deleteStudent = (studentId) => {
    // console.log(studentId);
    StudentServices.deleteStudent(studentId).then((response) =>{
       
      swal("deleted!", "deleted successfully!", "success");
      getAllstudents();
         
    }).catch(error => {
            console.log(error);
    })
  }
  return (
    <div className='containering'>

        <br/>
        <Link to ="/add-student" className="btn btn-primary mb-2">Add Plan</Link>
        <h2 className='text-center'>List of Students</h2> <br/>
        <table className='table table-success table-striped' style={{marginTop:"10px",color:"#fff"}}>
            <thead>
                <th>Learning Plan Id</th>
                <th>Learning Plan Name</th>
                <th>Plan Description</th>
                <th>Duration</th>
                <th>Instructor ID</th>
                <th>Edit/Update</th>
                <th>Delete</th>
            </thead>
            <tbody>
                {
                  student.map(
                    student=>
                    <tr key={student.sid}>
                        <td>{student.sid}</td>
                        <td>{student.name}</td>
                        <td>{student.address}</td>
                        <td>{student.tel}</td>
                        <td>{student.nic}</td>
                        <td>
                          <Link className="btn btn-info" to={`/edit-student/${student.sid}`}>update</Link>
                        </td>
                        <td>
                          <button className='btn btn-danger' onClick={() => deleteStudent(student.sid)}>delete</button>
                        </td>
                    </tr>
                  )  
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponents
