import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { addBook } from "../features/books/books.api";
import { useDispatch } from "react-redux";

export const AddBook = () => {

    const { register, handleSubmit, reset, getValues, formState: {errors} } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onSubmit = async(data) => {
        const newBook = {
            title: getValues("title"),
            author: getValues("author"),
            rate: null,
            photo: getValues("photo"),
        }
        await dispatch(addBook(newBook))
        .unwrap()
        reset()
        navigate("/");
    };


    return <>
        <h3>Adding New Books</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Title:</label>
                <input
                    { ...register("title", { required: "Title is required" }) }
                />
                {errors.title &&  <p>{errors.title.message}</p>}
            </div>

            <div>
                <label>Author:</label>
                <input
                    { ...register("author", { required: "Author is required" }) }
                />
                {errors.author &&  <p>{errors.author.message}</p>}
            </div>

            <div>
                <label>Photo:</label>
               
                <input
                    { ...register("photo", { required: "Photo is required" }) }
                />
                {errors.photo &&  <p>{errors.photo.message}</p>}
            </div>

            <button type="submit">Add Book</button>
        </form>
    </>
}