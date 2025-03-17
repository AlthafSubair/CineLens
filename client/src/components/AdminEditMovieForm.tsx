import { MdClose } from "react-icons/md"
import Button from "./Button"
import Select, { MultiValue, StylesConfig } from "react-select"
import makeAnimated from 'react-select/animated'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from '../redux/store'
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDropzone } from "react-dropzone"
import { editMovie, getMovieById } from "../redux/thunk/adminThunk"
import { toast } from "react-toastify"
import { logout } from "../redux/slice/authSlice"

const animatedComponents = makeAnimated()

interface Option {
  value: string
  label: string
}

interface formDataType {
  title: string
  year: Date | string
  runtime: string
  trailer: string
  desc: string
}

interface propType {
  setOpenEditMovie: React.Dispatch<React.SetStateAction<string | null>>
  openEditMovie: string | null
}

const AdminEditMovieForm = ({ setOpenEditMovie, openEditMovie }: propType) => {
  const options: Option[] = useMemo(() => [
    { value: "thriller", label: "Thriller" },
    { value: "horror", label: "Horror" },
    { value: "romcom", label: "RomCom" },
    { value: "comedy", label: "Comedy" },
    { value: "mystery", label: "Mystery" },
    {value: "drama", label: "Drama" },
    { value: "action", label: "Action" },
    { value: "sci-fi", label: "Sci-Fi" },
    { value: "adventure", label: "Adventure" },
    { value: "fantasy", label: "Fantasy" },
    { value: "crime", label: "Crime" },
  ], []) // Memoize options to prevent re-renders

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const customStyles: StylesConfig<Option, true> = {
    control: (base, { isFocused }) => ({
      ...base,
      backgroundColor: darkMode ? "#37373e" : "#ffff", // bg-slate-700 or bg-slate-50
      color: darkMode ? "rgb(226 232 240)" : "rgb(100 116 139)", // text-slate-200 or text-slate-600
      border: isFocused
        ? `2px solid ${darkMode ? "rgb(243 140 29)" : "rgb(37 99 235)"}` // ring-orange-500 or ring-blue-500
        : `1px solid ${darkMode ? "rgb(75 85 99)" : "rgb(209 213 219)"}`, // border-slate-600 or border-gray-300
      borderRadius: "0.375rem", // Tailwind rounded-md
      padding: "0.25rem", // Tailwind p-4
      boxShadow: "none",
      "&:hover": {
        borderColor: isFocused
          ? darkMode
            ? "rgb(243 140 29)" // ring-orange-500
            : "rgb(37 99 235)" // ring-blue-500
          : darkMode
            ? "rgb(107 114 128)" // border-slate-500
            : "rgb(156 163 175)", // border-gray-400
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: darkMode ? "rgb(55 65 81)" : "rgb(248 250 252)", // bg-slate-700 or bg-slate-50
      borderRadius: "0.375rem", // Tailwind rounded-md
      marginTop: "0.5rem",
      color: darkMode ? "rgb(226 232 240)" : "rgb(100 116 139)", // text-slate-200 or text-slate-600
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused
        ? darkMode
          ? "rgb(75 85 99)" // bg-slate-600
          : "rgb(229 231 235)" // bg-gray-200
        : isSelected
          ? darkMode
            ? "rgb(100 116 139)" // bg-slate-500
            : "rgb(203 213 225)" // bg-blue-200
          : darkMode
            ? "rgb(55 65 81)" // bg-slate-700
            : "rgb(248 250 252)", // bg-slate-50
      color: isSelected
        ? darkMode
          ? "rgb(255 237 213)" // text-orange-100
          : "rgb(30 64 175)" // text-blue-800
        : darkMode
          ? "rgb(226 232 240)" // text-slate-200
          : "rgb(55 65 81)", // text-gray-700
      padding: "0.5rem",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: darkMode ? "rgb(100 116 139)" : "rgb(203 213 225)", // bg-slate-500 or bg-blue-200
      borderRadius: "0.25rem", // Tailwind rounded
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: darkMode ? "rgb(226 232 240)" : "rgb(30 64 175)", // text-slate-200 or text-blue-800
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: darkMode ? "rgb(243 140 29)" : "rgb(59 130 246)", // text-orange-500 or text-blue-500
      ":hover": {
        backgroundColor: darkMode
          ? "rgb(75 85 99)" // bg-slate-600
          : "rgb(219 234 254)", // bg-blue-100
        color: darkMode
          ? "rgb(253 230 138)" // text-orange-300
          : "rgb(37 99 235)", // text-blue-600
      },
    }),
  };

  const [image, setPreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

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

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    year: yup.string().required("Year is required"),
    runtime: yup.string().required("Runtime is required"),
    trailer: yup.string().required("Trailer is required"),
    desc: yup.string().required("Description is required"),
  })

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const handleSelectChange = (selected: MultiValue<Option>) => {
    setSelectedGenres(selected.map(option => option.value))
  }

  const dispatch = useDispatch<AppDispatch>()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data: formDataType) => {
    try {
      const formData = new FormData()
      if (imageFile) formData.append("image", imageFile)
      formData.append("title", data.title)
      formData.append("year", data.year.toString())
      formData.append("runtime", data.runtime)
      formData.append("trailer", data.trailer)
      formData.append("desc", data.desc)
      formData.append("genre", JSON.stringify(selectedGenres))

      const res = await dispatch(editMovie({ formData, id: openEditMovie }))
      if (editMovie.fulfilled.match(res)) {
        toast.success(res.payload.message, { autoClose: 5000, position: "bottom-left" })
        setOpenEditMovie(null)
      } else {
        toast.error(res.payload as string, { position: "bottom-left", autoClose: 5000 })
        if (res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again.") {
          dispatch(logout())
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const { movie, loading } = useSelector((state: RootState) => state.admin)

  useEffect(() => {
    if (openEditMovie) dispatch(getMovieById(openEditMovie))
  }, [dispatch, openEditMovie])

  useEffect(() => {
    if (movie) {
      reset({
        title: movie.title,
        runtime: movie.runtime,
        trailer: movie.trailer,
        desc: movie.desc,
        year: new Date(movie.year).toISOString().split('T')[0],
      })
      setPreview(movie.image)
      setSelectedGenres(movie.genre) // Directly set genres from movie data
    }
  }, [movie, reset]) // Removed options from dependencies

  return (
    <div className="absolute overflow-y-scroll max-h-screen z-50 right-0 top-0 dark:bg-[#2f2f2f] max-w-sm w-96 shadow-lg bg-white rounded-lg p-6">
      <h1 className="dark:text-slate-50 font-semibold text-gray-900 text-xl text-center my-4">
        Edit Movie
      </h1>
      <div className="absolute top-4 dark:text-white text-gray-700 right-4 text-lg ">
        <button onClick={() => setOpenEditMovie(null)}><MdClose /></button>
      </div>

      <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
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
          <input {...register("title")} placeholder="Enter movie title" className="w-full h-10 text-slate-600 dark:text-slate-300 p-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]" />
          {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          
          <input type="date" {...register("year")} className="w-full h-10 text-slate-600 dark:text-slate-300 px-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]" />
          {errors.year && <span className="text-red-500">{errors.year.message}</span>}
          
          <input {...register("runtime")} placeholder="Runtime" className="w-full h-10 text-slate-600 dark:text-slate-300 px-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]" />
          {errors.runtime && <span className="text-red-500">{errors.runtime.message}</span>}
          
          <input {...register("trailer")} placeholder="Trailer link" className="w-full h-10 text-slate-600 dark:text-slate-300 px-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]" />
          {errors.trailer && <span className="text-red-500">{errors.trailer.message}</span>}
          
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={options.filter(opt => selectedGenres.includes(opt.value))}
            options={options}
            styles={customStyles}
            onChange={handleSelectChange}
          />
          
          <textarea {...register('desc')} placeholder="Description" className='w-full text-slate-600 dark:text-slate-300 p-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]' rows={5} />
          {errors.desc && <span className="text-red-500">{errors.desc.message}</span>}
        </div>

        <div>
          <Button color="white" bg='green' text='Submit' isLoading={loading} />
        </div>
      </form>
    </div>
  )
}

export default AdminEditMovieForm