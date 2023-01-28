import s from "./style.module.css";
import { useForm } from "react-hook-form";
import api from "../Api/api";
import { useCallback } from "react";

export const ReviewForm = ({ postId, setPostView }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    api.addReview(postId, data)
    .then((result) => setPostView && setPostView(result))
    .finally(setValue("text", ""))
    .catch(error => console.log(error))
  };

  const reviewText = register("text", {
    required: {
      value: true,
      message: 'нельзя отправлять пустое сообщение',
    }
  });

  return (
    <form className={s.reviewForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.reviewError}>
        {errors?.text && (
          <p className="errorMessage">{errors?.text?.message}</p>
        )}
      </div>
      <textarea name="text" {...reviewText}  className={s.reviewTextArea}></textarea>
      <button className={s.reviewButton}>Отправить комментарий</button>
    </form>
  );
};
