import React, {useState,useEffect} from "react";
import {useParams, Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import axios from "axios";
//import { toast } from "react-tostify";
import { useNavigate } from 'react-router-dom';

const initialValues = {
    firstName:"",
    lastName:"",
    location:"",
    email: "",
    dob: new Date(),
    education: ""
}

const Addedit = () => {
    const [data,setData] = useState(initialValues);

    const { firstName, lastName, location, email, dob, education} = data;

    //const history = useHistory();
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect( () => {
       axios.get(`http://localhost:5000/api/get/${id}`).
       then((resp) => setData({...resp.data[0]}));
    }, [id] );

    const handleSubmit = (e) => {
        e.preventDefault();
        if( !firstName || !lastName || !location || !email || !dob || !education) {
            alert("please proied each input feild");
        }
        else{
            if(!id){
            axios.post("http://localhost:5000/api/post",{
                firstName ,
                lastName ,
                location ,
                email ,
                dob ,
                education
            }).then(() => {
                setData({id:"",
                firstName:"",
                lastName:"",
                location:"",
                email: "",
                dob: "",
                education: ""
            })
            }).catch((err) => alert(err.response.data));
        }else {
            axios.put(`http://localhost:5000/api/update/${id}`,{
                firstName ,
                lastName ,
                location ,
                email ,
                dob ,
                education
            }).then(() => {
                setData({id:"",
                firstName:"",
                lastName:"",
                location:"",
                email: "",
                dob: "",
                education: ""
            })
            }).catch((err) => alert(err.response.data));
        }
            navigate(`/`);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setData({ ...data,[name]: value });
    }

    return (
        <div style={{marginTop: "100px"}}> 
            <form style={{
                margin: "auto",
                padding: "20px",
                maxWidth: "1000px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit}
            >
           
           <div class="row mb-2">
           <div class="col">
            <label htmlFor="firstName" class="col-sm-2 col-form-label"> Firstname</label>
            <input type="text" id="firstName" name="firstName" value={firstName || ""} onChange={handleInputChange} />
           </div>
           <div class="col">
            <label htmlFor="lastName" class="col-sm-2 col-form-label">Lastname</label>
            <input type="text" id="lastName" name="lastName" value={lastName || ""} onChange={handleInputChange} />
            </div>
            </div>
            <br />

            <div class="form-group mb">
            <label htmlFor="location" class="col-sm-1 col-form-label"> location</label>
            <input type="text" id="location" name="location" value={location || ""} onChange={handleInputChange} />
           </div>
           <br />

           <div class="form-group">
            <label htmlFor="email" class="col-sm-1 col-form-label">Email</label>
            <input type="email" id="email" name="email" value={email || ""} onChange={handleInputChange} />
            </div>
            <br />

            <div class="form-group">
            <label htmlFor="dob" class="col-sm-1 col-form-label">DOB</label>
            <input type="date" id="dob" name="dob" value={dob || ""} onChange={handleInputChange} />
            </div>
            <br />

            <div class="form-group" >
            <label htmlFor="education" class="col-sm-1 col-form-label">Education</label>
            <input style={{ maxWidth: "400px"}} type="text" id="education" name="education" value={education || ""} onChange={handleInputChange} />
            </div>
            <br />

            <div class="form-group">
              <label for="exampleFormControlTextarea1" class="col-sm-1 col-form-label">About</label>
               <textarea style={{ maxWidth: "300px"}} id="about" rows="3"></textarea>
            </div>
            <br />

            <div class="form-group">
            <input type="submit" class="btn btn-dark" value={id ? "update":"submit"} />
            </div>
            </form>
        </div>
    )
}
export default Addedit;