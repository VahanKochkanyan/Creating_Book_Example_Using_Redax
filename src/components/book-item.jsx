import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBook } from "../features/books/books.api";
import { addComment } from "../features/comments/comments.api";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";

export const BookItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const current = useSelector((state) => state.books.current);

  const [open, setOpen] = useState(false); 
  const [comment, setComment] = useState(""); 
  const [rate, setRate] = useState("");
  const [comments, setComments] = useState([]); 

  useEffect(() => {
    dispatch(getBook(id));
  }, [id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setComment("");
    setRate("");
  };

  const handleAddComment = async () => {
    const newComment = {
      text: comment,
      rate: rate,
      book: current.id,
    };

    await dispatch(addComment(newComment)).unwrap();
    setComments(prev => [
      ...prev, 
      newComment
    ]); 
    handleClose();
  };

  if(!current) {
    return;
  }

  return (
    <>
      <h3>Book Item</h3>
      { current && (
        <div>
          <img src={current.photo} style={{ height: 300 }} alt={current.title} />
          <p>{current.title}</p>
          <strong>By {current.author}</strong>
        </div>
      )}

      <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
        Add Comment
      </Button>

      <Typography variant="h5" sx={{ mt: 3 }}>
        Comments:
      </Typography>

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <Typography variant="subtitle1">
              <strong>Rating: {comment.rate}</strong>
            </Typography>
            <Typography>{comment.text}</Typography>
          </div>
        ))
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Add Comment for {current.title}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Write your comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{ mb: 2 }}
          />

          <select
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="styled-select"
            style={{ width: "100%", padding: "10px", marginBottom: "16px" }}
          >
            <option value="">Select Rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAddComment}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};