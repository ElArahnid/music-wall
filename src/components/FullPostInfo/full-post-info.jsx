import React, { useEffect, useState } from "react";
import Card from "antd/es/card/Card";
import { useParams } from "react-router-dom";
import api from "../Api/api";
import s from "./style.module.css";
import dayjs from "dayjs";
import { ReviewForm } from "../Forms/review-form";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import { useApi } from "../../hooks/useApi";

const FullPOstInfo = () => {
  const { id } = useParams();
  // const [post, setPost] = useState({});
  const { authState } = useContext(UserContext);

  const userId = localStorage.getItem("id");
  // console.log(userId);

  const viewPost = useCallback( () => api.getPost(id), [id] );

    const {
      data: postView,
      setData: setPostView,
      error: catchError,
    } = useApi(viewPost);

    // console.log(postView);

  const aboutAuthorWhoLiked = (reviewUserId) => {
    api.getUserInfoById(reviewUserId)
    .then(result => result.name)
  };

  const getPostCard = useCallback(() => {
    api.getPost(id)
    .then(data => data)
    // .then(data => setPostView(data))
  }, [id])

  useEffect(() => {
    getPostCard()
    // .then(data => postView(data))
  }, [getPostCard])

  const delReview = useCallback((postId, reviewId) => {
    api.delReview(postId, reviewId).then((result) => setPostView && setPostView(result));
  }, []);

  // if(postView) {const {
  //   _id,
  //   isPublished,
  //   author,
  //   image,
  //   created_at,
  //   updated_at,
  //   comments,
  //   likes,
  //   tags,
  //   text,
  //   title,
  // } = postView;}

  // console.log(postView);

  return ( 
    <>
      <Card
        title={postView?.title}
        className={s.card}
        cover={<img className={s.cardImage} src={postView?.image} alt={postView?.title} />}
      >
        {postView?.text}
        <div className={s.reviewContainer}>
          <h2>Комментарии</h2>
          {postView?.comments?.map((res, i) => {
            return postView?.comments?.length > 0 ? (
              <div className={s.reviewDesc} key={i}>
                <div key={res?._id} className={s.reviewHead}>
                  <div className={s.reviewAuthor}>
                    Автор: {aboutAuthorWhoLiked(res?.author)}
                  </div>
                  <div className={s.reviewDate}>
                    Опубликовано:{" "}
                    {dayjs(res.created_at).format("DD.MM YYYY hh:mm:ss")}
                  </div>
                  {authState && userId === res?.author && (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={s.faStyle}
                      onClick={() => delReview(postView?._id, res?._id)}
                    />
                  )}
                </div>
                <div className={s.reviewText}>{res?.text}</div>
              </div>
            ) : (
              <>Комментариев нет</>
            );
          })}
          <ReviewForm postId={postView?._id} setPostView={setPostView} />
        </div>
      </Card>
    </>
  );
};

export default FullPOstInfo;
