import React, { useEffect, useState } from 'react';
import '../css/Addstudent.css';
import StudentServices from '../services/StudentServices';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AddStudentComponent = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [tel, setTel] = useState('');
    const [nic, setNic] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const saveOrupdateStudent = (e) => {
        e.preventDefault();
        const student = { name, address, tel, nic };

        if (id) {
            StudentServices.updateStudent(id, student)
                .then((response) => {
                    swal('Learning Plan Updated!', 'Updated successfully!', 'success');
                    navigate('/students');
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            StudentServices.createStudent(student)
                .then((response) => {
                    console.log(response.data);
                    swal('Good job!', 'Learning Plan added successfully!', 'success');
                    navigate('/students');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        if (id) {
            StudentServices.getStudentById(id)
                .then((response) => {
                    setName(response.data.name);
                    setAddress(response.data.address);
                    setTel(response.data.tel);
                    setNic(response.data.nic);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const title = () => {
        if (id) {
            return <h3 className="text-center">Update Learning Plan</h3>;
        } else {
            return <h3 className="text-center">Add Learning Plan</h3>;
        }
    };

    return (
        <>
            <div className="containerr">
                {title()}
                <form className="needs-validation" noValidate>
                    <br />
                    <div className="form-row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustom01">Learning Plan Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="validationCustom01"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div className="valid-feedback">Looks good!</div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustom02">Plan Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="validationCustom02"
                                placeholder="Description"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                            <div className="valid-feedback">Looks good!</div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="validationCustom02">Duration</label>
                            <input
                                type="text"
                                className="form-control"
                                id="validationCustom02"
                                placeholder="hours"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                required
                            />
                            <div className="valid-feedback">Looks good!</div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationCustom02">Plan Identifier</label>
                        <input
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                            placeholder="Identifier"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                            required
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={(e) => saveOrupdateStudent(e)}
                    >
                        Save Learning Plan
                    </button>
                    {/* <Link to="/students" className="btn btn-primary mb-2">Go back</Link> */}
                </form>
            </div>
        </>
    );
};

export default AddStudentComponent;