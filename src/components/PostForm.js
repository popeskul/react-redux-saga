import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, showAlert } from "../redux/actions";
import { Alert } from "./Alert";

const PostForm = () => {
  const alert = useSelector((state) => state.app.alert);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return dispatch(showAlert("Название поста не может быть пустым"));
    }

    const newPostId = Date.now().toString();
    const newPost = { title, id: newPostId };

    dispatch(createPost(newPost));
    setTitle("");
  };

  const changeInputHandler = (event) => {
    const { value } = event.target;
    setTitle(value);
  };

  return (
    <form onSubmit={submitHandler}>
      {alert && <Alert text={alert} />}

      <div className="form-group">
        <label htmlFor="title">Заголовок поста</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          name="title"
          onChange={changeInputHandler}
        />
      </div>
      <button className="btn btn-success" type="submit">
        Создать
      </button>
    </form>
  );
};

export default PostForm;
