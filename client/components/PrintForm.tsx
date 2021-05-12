import { useForm } from 'react-hook-form'
import Api from './api';
import {useState} from "react";
import axios from "axios";

function PrintForm() {
  const { register, handleSubmit } = useForm()

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const setStatesForNewSubmission = () => {
    setSubmitting(true)
    setErrorMessage("")
    setSuccessMessage("")
  }
  const onSubmit = async (data: any) => {
     console.log(data);
     const formData = new FormData()
     formData.append("sunfire_id", data.sunfire_id)
     formData.append("password", data.password)
     formData.append("printer", data.printer)
     formData.append("file", data.file[0])
     setStatesForNewSubmission();
     
     axios({
      method: 'post',
      url: Api.printUrl(),
      data: formData
    })
     .then(res => {
       setSubmitting(false);
       setSuccessMessage(JSON.stringify(res.data));
      })
     .catch(error => {
       if (error.response) {
         // Request sent, but error code falls outside 2XX
        setSubmitting(false);
        setErrorMessage("Request failed: " + error.response.data);
       } else if (error.request) {
         // Request sent but no response received
         setSubmitting(false);
         setErrorMessage("Response not received. Likely a connection problem.\n Contents of request:" + JSON.stringify(error.request))
       } else {
         // Some other internal error, likely on client side
         setErrorMessage("Client-side error, please contact admin.\n" + JSON.stringify(error.config))
       }
      })
  }

   return (
     <>
     <form onSubmit={handleSubmit(onSubmit)} >
       <label htmlFor="sunfire_id">sunfire id</label>
       <input {...register('sunfire_id', {required:true, maxLength: 80})} type="text" disabled={submitting}/>
       <br/>
       <label htmlFor="password">password</label>
       <input {...register('password', {required:true, maxLength: 80})} type="password" disabled={submitting}/>
       <br/>
       <label htmlFor="printer">printer</label>
       <input {...register('printer', {required: true, maxLength: 10})} type="text" disabled={submitting}/>
       <br/>
       <label htmlFor="file">file</label>
       <input {...register('file', {required: true})} type="file" disabled={submitting}/>
       <br/>
       <button className="submitButton" disabled={submitting}>SUBMIT</button>
     </form>
     {errorMessage && <div className="error">{errorMessage}</div>}
     {successMessage && <div className="success">{successMessage}</div>}
     </>

   );
}

export default PrintForm
