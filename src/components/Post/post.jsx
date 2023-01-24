import React, { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
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
      key={_id}
      style={
        isPublished
          ? {
              width: 250,
              flexGrow: 1,
              alignSelf: "stretch",
              justifySelf: "stretch",
            }
          : { width: 300, border: "3px solid #CCC" }
      }
      className={s.postContainer}
      cover={<img alt={title} src={image} className={s.imgPost} />}
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
        <Meta avatar={<Avatar src={author.avatar} />} /> {author.name}{" "}
        {author._id}
      </div>
      <Meta title={title} description={text.slice(0, 100) + " >>"} EllipsisOutlined />
      <div>
        {likes.length > 0 ? `likes: ${likes.length}` : null}
        <FontAwesomeIcon icon={faHeart} className={cn(s.favClear)} />
      </div>
      <div>{comments.length > 0 ? `comments: ${comments.length}` : null}</div>
      <div>
        {created_at &&
          `создано ${dayjs(created_at)
            .locale("ru")
            .format("D MMMM YYYY dd, H:mm:s")}`}
      </div>
      <div>
        {updated_at &&
          `изменено ${dayjs(updated_at)
            .locale("ru")
            .format("D MMMM YYYY dd, H:mm:s")}`}
      </div>
      <div>
        <Link to={`/post-${_id}`}>подробнее &gt; {_id}</Link>
      </div>
      <Modal
        title="Точно удалить?"
        open={isModalDelOpen}
        onOk={handleDelOk}
        onCancel={handleDelCancel}
        forceRender
        footer={[]}
      >
        <Button type="primary" onClick={() => api.delPost(_id)}>
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
