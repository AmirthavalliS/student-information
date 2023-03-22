import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
//import "./Home.css";


const Home = () => {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response =await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect( () => {
         loadData();
    },[])

    const deleteContact = (id) =>{
        if(window.confirm("Are you sure delete")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            alert("deleted")
            setTimeout(() => loadData(),500 )
        }
    }
    return(
        <>
        <div>
            <b>STUDENT INFORMATION SYSTEM</b>
        </div>
        <button>
        <p>Search 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
        </p>
        </button>
       

       <div style={{marginTop:"80px"}} >
       <Link to="/addEdit">
        <button >Add</button>
        </Link>
        
        <Table responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Firstname</th>
                    <th>lastname</th>
                    <th>location</th>
                    <th>Email</th>
                    <th>DOB</th>
                    <th>Education</th>
                    <th>Action </th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => {
                    return (
                        <tr key={item.id}>
                            <td scope="row">{index+1}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.location}</td>
                            <td>{item.email}</td>
                            <td>{item.dob}</td>
                            <td>{item.education}</td>
                            <td>
                                <Link to={`/update/${item.id}`}>
                                <button>Edit</button>
                                </Link>
                                </td>
                                <td>
                                <button onClick={() => deleteContact(item.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
       </div> 
       </>
    )
    }
    export default Home;