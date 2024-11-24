import './App.css'
import React , { useState } from 'react'

function App() {

  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  gender: "",
  dob: "",
  nationality: "",
  hobbies:[],
  address: "",
  phoneNumber: "",
  yearOfStudy: "",
  yearOfPassing: "",
});

// List of courses and nationalities for dropdown
const courses = ["Tamil", "Math", "Science", "English", "History"];
const nationalities = ["USA", "India", "Canada", "Australia"];
const yearOfPassing = [2020, 2021, 2022, 2023, 2024];

// Handle form input change
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

// Handle checkbox change
const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;
  setFormData((prev) => {
    const hobbies = checked
      ? [...prev.hobbies, value]
      : prev.hobbies.filter((hobby) => hobby !== value);
    return {
      ...prev,
      hobbies,
    };
  });
};

// Handle form submit (Create operation)
const handleSubmit = (e) => {
  e.preventDefault();
  if (formData.name && formData.email) {
    setEmployees([...employees, { ...formData, id: Date.now() }]);
    setFormData({
      name: "",
      email: "",
      gender: "",
      dob: "",
      nationality: "",
      hobbies: [],
      address: "",
      phoneNumber: "",
      studiedCourse: "",
      yearOfPassing: "",
    });
  } else {
    alert("Please fill in the required fields!");
  }
};
// handleSearchChange
const handleSearchChange = (e) => {
  const searchText = e.target.value.toLowerCase()
  const filteredEmployees = employees.find((employee) => employee.name===searchText)
  setEmployees(filteredEmployees)
}

// Handle delete employee
const handleDelete = (id) => {
  setEmployees(employees.filter((employee) => employee.id !== id));
};

// Handle update employee
const handleEdit = (id) => {
  const employeeToEdit = employees.find((employee) => employee.id === id);
  setFormData(employeeToEdit);
};
  return (
    <>
      <div className="form-container">
      <h2>Employee Registration Form</h2>
      <form onSubmit={handleSubmit}>
      <table className="form-table">
        <tbody>
          <tr>
            <td>Name</td>
            <td><input type="text" name="name" value={formData.name} onChange={handleInputChange} required /> </td>
          </tr>
          <tr>
            <td>Email</td>
            <td><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /> </td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>
             <label><input type="radio" name="gender" value="Male" checked={formData.gender==="Male"} onChange={handleInputChange}  /> <span>Male</span></label>
             <label><input type="radio" name="gender" value="Female" checked={formData.gender==="Female"} onChange={handleInputChange}  /> <span> Female </span></label>
             <label><input type="radio" name="gender" value="Other" checked={formData.gender==="Other"} onChange={handleInputChange}  /><span> Other</span> </label>
             </td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td><input type="date" name="dob" value={formData.dob} onChange={handleInputChange}  /> </td>
          </tr>
          <tr>
            <td>Nationality</td>
            <td>
            <select name="nationality" value={formData.nationality} onChange={handleInputChange} >
            <option value="">Select Nationality</option>
            {nationalities.map((nation) => (
              <option key={nation} value={nation}>
                {nation}
              </option>
            ))}
          </select>
            </td>
          </tr>
          <tr>
            <td>Hobbies</td>
            <td>
                <label> <input type="checkbox" value="Reading" checked={formData.hobbies.includes("Reading")} onChange={handleCheckboxChange} /> <span>Reading</span></label>
                <label> <input type="checkbox" value="Sports" checked={formData.hobbies.includes("Sports")} onChange={handleCheckboxChange} /> <span>Sports</span></label>
                <label> <input type="checkbox" value="Traveling" checked={formData.hobbies.includes("Traveling")} onChange={handleCheckboxChange} /> <span>Traveling</span></label>
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
            <textarea name="address" value={formData.address} onChange={handleInputChange} />
            </td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td><input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}  /> </td>
          </tr>
          <tr>
            <td>Studied Course</td>
            <td>
            <select name="studiedCourse" value={formData.studiedCourse} onChange={handleInputChange} >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course} value={course}> {course} </option>
            ))}
          </select>
            </td>
          </tr>
          <tr>
            <td>Year Of Passing</td>
            <td><select name='yearOfPassing' value={formData.yearOfPassing} onChange={handleInputChange} >
              <option value="" >Select Year</option>
              {
                yearOfPassing.map((year)=>(
                  <option key={year} value={year}>{year}</option>
                ))
              }
              </select></td>
          </tr>
          
        </tbody>
      </table>
      <button className="submit" type="submit">{formData.id?"Update":"Submit"}</button>
      </form>
      </div>
      <h2>Registered Employees</h2>
      <input className='search' type='search' placeholder='search employee' onChange={handleSearchChange}/>
      <table className='formdata-table' >
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Nationality</th>
            <th>Hobbies</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Studied Course</th>
            <th>Year Of Passing</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee,index) => (
            <tr key={employee.id}>
              <td>{ index+1 }</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>{employee.dob}</td>
              <td>{employee.nationality}</td>
              <td>{employee.hobbies}</td>
              <td>{employee.address}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.studiedCourse}</td>
              <td>{employee.yearOfPassing}</td>
              <td>
                <button className='edit' onClick={() => handleEdit(employee.id)}>Edit</button>
                <button className='delete' onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default App
