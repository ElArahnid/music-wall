import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import dayjs from "dayjs";
import "../../dayjs/locale/ru";

import s from "./style.module.css";
import { Link } from "react-router-dom";

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
  avatar,
  name
}) => {

  const { Meta } = Card;
  const hello = () => {
    console.log("hello");
  };

  return (
    <Card
      key={_id}
      style={
        isPublished
          ? { width: 250, flexGrow: 1, alignSelf: 'stretch', justifySelf: 'stretch', }
          : { width: 300, border: "3px solid #CCC" }
      }
      className={s.postContainer}
      cover={<img alt={title} src={image} className={s.imgPost} />}
      actions={[
        <SettingOutlined key="setting" onClick={hello} />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <div className={s.flexRow}>
        <Meta avatar={<Avatar src={avatar} />} /> {name}
      </div>
      <Meta title={title} description={text} EllipsisOutlined />
      <div>{likes.length > 0 ? `likes: ${likes.length}` : null}</div>
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
    </Card>
  );
};

export default Post;
