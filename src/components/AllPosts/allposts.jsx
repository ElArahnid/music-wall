import s from "./style.module.css";

import { List } from "antd";
import Post from "../Post/post";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PostsContext } from "../../context/PostsContext";
import NotFound from "../NotFound";

const AllPosts = () => {

  const { tagpage } = useParams();
  const {posts, debounceSearchQuery} = useContext(PostsContext);

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
    })).filter(res => 
      res.title.toLowerCase().includes(debounceSearchQuery.toLowerCase())
      || res.text.toLowerCase().includes(debounceSearchQuery.toLowerCase())
      );
    return (
      data.length > 0 ?
      <List
        grid={
          {
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 5,
            gutter: 16,
            gap: 10
          }
        }
        className={s.posts}
        dataSource={data}
        pagination={{
          pageSize: 6,
          showTitle: true,
        }}
        size="large"
        renderItem={(item) => (
          <>
            <Post key={item._id} {...item} />
          </>
        )}
      />
      : <NotFound />
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
    })).filter(res => 
      res.title.toLowerCase().includes(debounceSearchQuery.toLowerCase())
      || res.text.toLowerCase().includes(debounceSearchQuery.toLowerCase())
      );
    return (
      data.length > 0 ?
      <List
        grid={
          {
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 5,
            gutter: 16,
            gap: 10
          }
        }
        className={s.posts}
        dataSource={data}
        pagination={{
          pageSize: 6,
          showTitle: true,
        }}
        size="large"
        renderItem={
          (item) => (
          <>
            <Post key={item._id} {...item} />
          </>
        )}
      />
      : <NotFound />
    );
  }
};

export default AllPosts;
