import React, { useEffect, useState } from "react";
import Card from "antd/es/card/Card";
import { useParams } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import api from "../Api/api";
import Avatar from "antd/es/avatar/avatar";

const tabsInfo = [
  { key: "post", tab: "Post" },
  { key: "author", tab: "Author" },
];



const FullPOstInfo = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    api.getPost(id).then((showPost) => {
      setPost(showPost);
    });
  }, []);

  const [activeTab, setActiveTab] = useState("post");
  const ofTabChange = (key) => {
    setActiveTab(key);
  };

  // console.log(post);

  const {
    image,
    author,
    comments,
    created_at,
    isPublished,
    likes,
    tags,
    text,
    title,
    updated_at,
    _id,
  } = post;

  const contentList = {
    post: text,
    author: author?.name,
  };

  // const {avatar: ava} = author;

  // console.log(author);

  return (
    <Card
      tabList={tabsInfo}
      activeTabKey={activeTab}
      onTabChange={(key) => {
        ofTabChange(key);
      }}
      title={title}
      
    >
      {contentList[activeTab]}
      <Card 
      cover={<img src={image} />}
      />
      <Meta
        avatar = {<Avatar src={author?.avatar} />}
        description={text}
      />
    </Card>
  );
};

export default FullPOstInfo;
