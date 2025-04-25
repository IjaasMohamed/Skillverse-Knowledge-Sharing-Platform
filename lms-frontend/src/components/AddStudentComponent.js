import React, {useEffect, useState} from 'react'
import '../css/Addstudent.css';
import StudentServices from '../services/StudentServices';
import { useHistory,useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
const AddStudentComponent = () => {

  const [name,setName]=useState('')
  const [address,setAddress]=useState('')
  const [tel,setTel]=useState('')
  const [nic,setNic]=useState('')  
  const history = useHistory();
  const {id} = useParams();
//---------------------------
  const saveOrupdateStudent = (e) => {
    e.preventDefault();
    const student = {name,address,tel,nic}

    if(id){

      StudentServices.updateStudent(id,student).then((response) =>{
        swal("Learning Plan Updated!", "updated successfully!", "success");
        history.push('/students')
      }).catch(error =>{
        console.log(error);
      })

    }else{
      StudentServices.createStudent(student).then((response) =>{

        console.log(response.data)
        swal("Good job!", "Learning Plan adding successfully!", "success");
        history.push('/students');

    }).catch(error => {
        console.log(error)
    })
    // console.log(student);
    }
    
  }

  //-------------------------//
  useEffect(() => {

    StudentServices.getStudentById(id).then((response) =>{
        setName(response.data.name)
        setAddress(response.data.address)
        setTel(response.data.tel)
        setNic(response.data.nic)
    }).catch(error => {
      console.log(error)
  })

  },[])

  const title = () => {
    if(id){
      return <h3 className='text-center'>Update Learning Plan</h3>
    }else{
      return <h3 className='text-center'>Add Learning Plan</h3>
    }
  }

  return (
   <>
   <div className='containerr'>
    {
      title()
    }
   <form class="needs-validation" novalidate>
    <br/>
  <div class="form-row">
    <div class="col-md-4 mb-3">

      <label for="validationCustom01">Learning Plan Name</label>
      <input 
      type="text"
      class="form-control" 
      id="validationCustom01" 
      placeholder="Name" 
      value={name}
      onChange={(e)=>setName(e.target.value)}
      required 
      />

      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <label for="validationCustom02">Plan Description</label>

      <input 
      type="text" 
      class="form-control" 
      id="validationCustom02" 
      placeholder="Description"
      value={address} 
      onChange={(e) => setAddress(e.target.value)}
      required 
      />
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
    <div class="col-md-4 mb-3">

      <label for="validationCustom02">Duration</label>

      <input 
      type="text" 
      class="form-control" 
      id="validationCustom02" 
      placeholder="hours" 
      value={[tel]}
      onChange={(e) => setTel(e.target.value)}
      required 
      />
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
  </div>
  <div class="col-md-4 mb-3">

      <label for="validationCustom02">Plan Identifier</label>

      <input 
      type="text" 
      class="form-control" 
      id="validationCustom02" 
      placeholder="Identifier" 
      required
      value={nic}
      onChange={(e) => setNic(e.target.value)}
       />
      <div class="valid-feedback">
        Looks good!
      </div>
    </div>
  <button class="btn btn-primary" type="submit" onClick={(e) => saveOrupdateStudent(e)}>Save Learning Plan</button>
  {/* <Link to ="/students" className="btn btn-primary mb-2">go back</Link> */}
</form></div>

   </>
  )
}

export default AddStudentComponent
