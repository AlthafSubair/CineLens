import { useState } from "react";
import Button from "./Button";
import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addRoles } from "../redux/thunk/adminThunk";
import { toast } from "react-toastify";
import { logout } from "../redux/slice/authSlice";


interface prop {
  setAddRole: React.Dispatch<React.SetStateAction<boolean>>;
}

const RolesAddForm = ({ setAddRole }: prop) => {


  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),

  });
  
  const { handleSubmit, reset, register, formState: { errors }, watch } = useForm({
    resolver: yupResolver(validationSchema),
  });
  

  const [image, setPreview] = useState<string | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
      "image/gif": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setImageFile(file); // Store the File object
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string); // Preview the image
        };
        reader.readAsDataURL(file);
      }
    },
  });
  

  const dispatch = useDispatch<AppDispatch>()
  const {loading} = useSelector((state: RootState) => state.admin)

  const name = watch('name')

  const onSubmit = async () => {
    if (!imageFile) {
      return alert("Please upload an image");
    }
  
   try {
    const formData = new FormData();
    formData.append("name", name); // Append the role name
    formData.append("image", imageFile); // Append the actual file object
  
    const res = await dispatch(addRoles(formData));
    if(addRoles.fulfilled.match(res)){
      toast.success(res.payload.message, {
        autoClose: 5000,
        position: "bottom-left"
      })
      reset()
    }else{
      toast.error(res.payload as string, {
        position: "bottom-left",
        autoClose: 5000,
      });
      if(res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again."){
        dispatch(logout())
    }
  }
    
    setPreview(null);
    setImageFile(null);
    setAddRole(false)
   } catch (error) {
    console.log(error);
   } 
  };
  
  



  return (
    <div className="dark:bg-[#2f2f2f] max-w-sm absolute top-0 right-0 h-full w-96 shadow-lg bg-white rounded-lg p-6 overflow-y-scroll">
      <h1 className="dark:text-slate-50 font-semibold text-gray-900 text-xl text-center my-4">
        Add Role
      </h1>

      <div className="absolute top-4 dark:text-white text-gray-700 right-4 text-lg ">
        <button onClick={() => setAddRole(false)}>
          <MdClose />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-8">
        <div className="flex items-center justify-center w-full">
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:bg-[#37373e] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded image"
                className="object-contain h-full w-full rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <input {...getInputProps()} className="hidden" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full h-10 text-slate-600 dark:text-slate-300 p-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

         
        </div>

        <div>
          <Button color="white" bg="green" text="Submit" isLoading={loading}/>
        </div>
      </form>
    </div>
  );
};

export default RolesAddForm;
