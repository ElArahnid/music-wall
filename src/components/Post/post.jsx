import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import "../../dayjs/locale/ru";

import s from "./style.module.css";
import cn from "classnames";
import { faHeart, faRemove } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import api from "../Api/api";
import EditForm from "../Forms/edit-form";

const Post = ({
  _id,
  image,
  likes,
  comments,
  title,
  text,
  created_at,
  updated_at,
  isPublished,
  author,
  tags,
}) => {
  const { authState } = useContext(UserContext);
  const [isModalDelOpen, setIsModalDelOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [like, setLike] = useState({state: false, number: likes.length});

  // console.log(title, like);

  const userIdInLS = localStorage.getItem("id");

  useEffect(() => {
    likes.some((isLikes) => {
      isLikes === userIdInLS && setLike({state: true, number: likes.length});
    });
  }, [likes, setLike, userIdInLS]);

  const handleLikeClick = useCallback(
    (postId) => {
      if (like.state) {
        setLike({state: false, number: likes.length - 1});
        api.delLike(postId);
      } else {
        setLike({state: true, number: likes.length === 0 ? likes.length + 1 : likes.length});
        api.addLike(postId);
      }
    },
    [like.state, likes]
  );

  const showDelModal = useCallback(() => {
    setIsModalDelOpen(true);
  }, []);

  const handleDelOk = () => {
    setIsModalDelOpen(false);
  };

  const handleDelCancel = () => {
    setIsModalDelOpen(false);
  };

  const showEditModal = useCallback(() => {
    setIsModalEditOpen(true);
  }, []);

  const handleEditOk = () => {
    setIsModalEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsModalEditOpen(false);
  };

  const { Meta } = Card;

  return (
    <Card
      className={s.card}
      key={_id}
      title={
        <>
          <div className={s.favArea} onClick={() => handleLikeClick(_id, userIdInLS)}>
            <Link to={`/post-${_id}`}>{title}</Link>
            <FontAwesomeIcon
              icon={faHeart}
              className={cn(
                s.favClear,
                userIdInLS && { [s.favClearLiked]: like.state }
              )}
            />
            <span>{like.number > 0 ? `${like.number}` : null}</span>
          </div>
        </>
      }
      style={
        isPublished
          ? {
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignContent: "center",
              justifyContent: "flex-start",
              alignItems: "stretch",
            }
          : { width: 300, border: "3px solid #CCC" }
      }
      cover={
        <div className={s.imgContainer}>
          <Link to={`/post-${_id}`}>
            <img alt={title} src={image} className={s.imgPost} />
          </Link>
        </div>
      }
      actions={
        authState &&
        author._id === "636a510659b98b038f779cee" && [
          <EditOutlined key="edit" onClick={showEditModal} />,
          author._id === "636a510659b98b038f779cee" && (
            <FontAwesomeIcon icon={faRemove} onClick={showDelModal} />
          ),
        ]
      }
    >
      <div className={s.flexRow}>
        <Meta
          avatar={
            <Avatar src={author.avatar} title={author.name} author="scsc" />
          }
        />
      </div>

      <div>{comments.length > 0 ? `comments: ${comments.length}` : null}</div>
      <div>
        {created_at &&
          `создано ${dayjs(created_at)
            .locale("ru")
            .format("D.MM YYYY, H:mm:ss")}`}
      </div>
      <div>
        {updated_at &&
          `изменено ${dayjs(updated_at)
            .locale("ru")
            .format("D.MM YYYY, H:mm:ss")}`}
      </div>
      <div>
        <Link to={`/post-${_id}`}>подробнее &gt;</Link>
      </div>
      <Modal
        title="Точно удалить?"
        open={isModalDelOpen}
        onOk={handleDelOk}
        onCancel={handleDelCancel}
        forceRender
        footer={[]}
      >
        <Button type="primary" onClick={() => {api.delPost(_id).then(handleDelCancel)}}>
          Точно, удаляю
        </Button>
      </Modal>
      <Modal
        title="Редатировать"
        open={isModalEditOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        forceRender
        footer={[]}
      >
        <EditForm
          image={image}
          title={title}
          text={text}
          tags={tags}
          id={_id}
          isPublished={isPublished}
          onOk={handleEditOk}
        />
      </Modal>
    </Card>
  );
};

export default Post;
