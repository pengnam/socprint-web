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

     const res = await fetch(Api.quotaUrl(), {
       method: "POST",
       body: formData
     }).then(res => res.json());
     alert(JSON.stringify(res))
  }

   return (
     <form onSubmit={handleSubmit(onSubmit)}>
       <input {...register('sunfire_id')} type="text" />
       <input {...register('password')} type="password" />
       <input {...register('picture')} type="file" />
       <button>Submit</button>
     </form>
   );
  //return (<div>Bitc</div>) ;
}

export default PrintForm
