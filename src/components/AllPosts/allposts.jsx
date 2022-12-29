import React, { useEffect, useState } from "react";

import api from '../Api/api'
import Post from "../Post/post";

const AllPosts = () => {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    api.getAllPosts().then((postsData) => {
      setPosts(postsData);
    });
  }, []);

console.log(posts);

  return posts?.map((res) => (
      <Post key={res._id} {...res} />
  ));
};

export default AllPosts;
