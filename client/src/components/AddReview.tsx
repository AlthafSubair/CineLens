import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { addReview, getMovieById } from '../redux/thunk/userThunk'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { logout } from '../redux/slice/authSlice'

const myStyles = {
    itemShapes: Star,
    activeFillColor: '#ffb700',
    inactiveFillColor: '#fbf1a9'
}

interface PropTypes {
  revid: string,
  setAddReview: React.Dispatch<React.SetStateAction<boolean>>
  setRevid: React.Dispatch<React.SetStateAction<string>>
}

const AddReview = ({ revid, setAddReview, setRevid }: PropTypes) => {
    const [rate, setRate] = useState(0)
    const [spoiler, setSpoiler] = useState<boolean | null>(null)
    const [caption, setCaption] = useState('')
    const [desc, setDesc] = useState('')

    const { movie } = useSelector((state: RootState) => state.user)
    const { userId } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (revid) {
            dispatch(getMovieById(revid))
        }
    }, [dispatch, revid])

    const { id } = useParams<{ id: string }>()

    const handleClose = () => {
        setAddReview(false)
        setRevid('')
    }
const navigate = useNavigate()
    const handleSubmit = async (event: React.FormEvent) => {
        console.log({ id, userId, rate, spoiler, caption, desc })
        event.preventDefault(); // Prevent page refresh
        try {

            if(desc.length < 250){
                toast.error('Description must be at least 250 characters long', { position: "bottom-left", autoClose: 5000 })
                return
            }

           

            const res = await dispatch(addReview({ id, userId, rate, spoiler, caption, desc }))
            if (addReview.fulfilled.match(res)) {
                toast.success(res.payload.message, { autoClose: 5000, position: "bottom-left" })
            } else {
                toast.error(res.payload as string, { position: "bottom-left", autoClose: 5000 })
                if (res.payload === "Token has expired. Please log in again." || res.payload === "Invalid token. Please log in again.") {
                    dispatch(logout())
                    navigate('/auth/login')
                }
            }
            // Reset fields after submission
            setRevid('')
            setCaption('')
            setRate(0)
            setSpoiler(null)
            setDesc('')
            setAddReview(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="absolute top-16 h-screen right-0 flex flex-col dark:bg-[#1e1e1e] bg-white sm:max-w-sm w-full">
            <div className='p-4'>
                <div className="absolute top-2 right-2 dark:bg-black bg-slate-100 dark:bg-opacity-50 rounded-full">
                    <button onClick={handleClose} className='dark:text-slate-200 text-slate-700 p-2'><MdClose size={20}/></button>
                </div>
                <div className="flex flex-row gap-4 mt-4">
                    <div className='h-40 w-1/3'>
                        <img src={movie?.image} alt="" className='h-full w-full object-cover rounded-md' />
                    </div>
                    <div className='w-2/3 p-2 pt-3 flex flex-col gap-2'>
                        <h4 className='text-lg font-semibold dark:text-white text-gray-800'>{movie?.title}</h4>
                        <div className='flex flex-row gap-2'>
                            <p className='text-sm dark:text-slate-200 text-gray-600'>{String(movie?.year).split('-')[0]}</p>
                            <p className='text-sm dark:text-slate-200 text-gray-600'>{movie?.runtime}</p>
                        </div>
                        <h3 className='text-gray-600 dark:text-slate-400'>⭐ {movie?.rate && movie?.rateCount ? (movie.rate / movie.rateCount).toFixed(1) : 'N/A'}/5</h3>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='my-4'>
                        <input type="text" placeholder='Enter Your caption' value={caption} onChange={(e) => setCaption(e.target.value)} 
                      className="w-full h-10 text-slate-600 dark:text-slate-300 p-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]"/>
                    </div>
                    <div>
                       {
                        desc?.length < 250 &&
                         <p className='text-end text-[15px] pb-1 text-gray-800 dark:text-slate-200'>Minimun characters required: <span className='text-red-600'>{250 - desc.length}</span></p>
                       }
                        <textarea onChange={(e) => setDesc(e.target.value)} className='w-full text-slate-600 dark:text-slate-300 p-4 rounded-md ring-0 focus:outline-none focus:ring-2 dark:focus:ring-[#f38c1d] focus:ring-[#229df2] border border-gray-300 dark:border-slate-600  dark:bg-[#37373e]' rows={5} placeholder='Write your review here...'></textarea>
                    </div>
                    <div className='my-4 text-gray-800 dark:text-slate-200'>
                        <p className='pb-2'>Does this review contain spoilers?</p>
                        <label className='px-2'>
                            <input type="radio" checked={spoiler === true} onChange={() => setSpoiler(true)} /> Yes
                        </label>
                        <label className='px-2'>
                            <input type="radio" checked={spoiler === false} onChange={() => setSpoiler(false)} /> No
                        </label>
                    </div>
                    <div className="flex justify-between gap-4 items-center">
                        <p className='text-gray-800 dark:text-slate-200'>Rate this movie</p>
                        <Rating style={{ maxWidth: 150 }} value={rate} onChange={setRate} itemStyles={myStyles} />
                    </div>
                    <div className="py-6">
                        <button className='w-full p-2 rounded-md bg-green-700 text-white' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddReview
