import { useForm } from 'react-hook-form'
import Api from './api';
function PrintForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
     console.log(data);
     const formData = new FormData()
     formData.append("sunfire_id", data.sunfire_id)
     formData.append("password", data.password)
     formData.append("picture", data.picture[0])

     const res = await fetch(Api.printUrl(), {
       method: "POST",
       body: formData
     }).then(res => res.json());
     alert(JSON.stringify(res))
  }

   return (
     <form onSubmit={handleSubmit(onSubmit)}>
       <label htmlFor="sunfire_id">sunfire id</label>
       <input {...register('sunfire_id')} type="text" />
       <br/>
       <label htmlFor="password">password</label>
       <input {...register('password')} type="password" />
       <br/>
       <label htmlFor="file">file</label>
       <input {...register('picture')} type="file" />
       <br/>
       <button>Submit</button>
     </form>
   );
  //return (<div>Bitc</div>) ;
}

export default PrintForm
