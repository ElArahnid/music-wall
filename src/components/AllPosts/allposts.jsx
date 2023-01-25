import s from "./style.module.css";

import { List } from "antd";
import Post from "../Post/post";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PostsContext } from "../../context/PostsContext";

const AllPosts = () => {

  const { tagpage } = useParams();
  const {posts, setPosts} = useContext(PostsContext);
  console.log(posts);

  const handleClearTag = (value) => {
    return value.slice(0, 25).toLowerCase().replace(/\s/g, "");
  };

/////////////////////////////////////////////////////////////////////

  if (!tagpage) {

    const data = posts?.map((res, i) => (
      {
        avatar: res.author.avatar,
        authorName: res.author.name,
        title: res.title,
        text: res.text,
        _id: res._id,
        image: res.image,
        likes: res.likes,
        comments: res.comments,
        author: res.author,
        isPublished: res.isPublished,
        created_at: res.created_at,
        updated_at: res.updated_at,
        tags: res.tags,
    }));

    return (
      <List
        grid={{ xs: 5 }}
        className={s.posts}
        dataSource={data}
        pagination={{
          pageSize: 6,
          showTitle: true,
        }}
        renderItem={(item) => (
          <>
            <Post key={item._id} {...item} />
          </>
        )}
      />
    );

  } else {

    let allTags = [];
    posts?.map((res) => {
      res.tags.map((tag) => {
        if (handleClearTag(tag) === tagpage) {
          allTags = [...allTags, res];
        }
      });
    });

    const data = allTags?.map((res, i) => ({
      avatar: res.author.avatar,
      authorName: res.author.name,
      title: res.title,
      text: res.text,
      _id: res._id,
      image: res.image,
      likes: res.likes,
      comments: res.comments,
      author: res.author,
      isPublished: res.isPublished,
      created_at: res.created_at,
      updated_at: res.updated_at,
      tags: res.tags,
    }));

    return (
      <List
        className={s.posts}
        dataSource={data}
        pagination={{pageSize: 6}}
        renderItem={(item) => (
          <>
            <Post key={item._id} {...item} />
          </>
        )}
      />
    );
  }
};

export default AllPosts;
