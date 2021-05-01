import { useForm } from 'react-hook-form'
function PrintForm() {
    const { register, handleSubmit } = useForm()


  const onSubmit = async (data: { picture: (string | Blob)[]; }) => {
      console.log(data);
     const formData = new FormData()
     debugger;
     formData.append("picture", data.picture[0])

     const res = await fetch("http://localhost:8000/picture", {
       method: "POST",
       body: formData
     }).then(res => res.json()).catch(()=>{debugger;});
     alert(JSON.stringify(res))
  }

   return (
     <form onSubmit={handleSubmit(onSubmit)}>
       <input {...register('picture')} type="file" />
       <button>Submit</button>
     </form>
   );
  return (<div>Bitc</div>) ;
}

export default PrintForm
