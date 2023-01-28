import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import cn from "classnames";
import s from "./style.module.css";

import Layout from "antd/es/layout/layout";

import { UserContext } from "../../context/UserContext";
import { PostsContext } from "../../context/PostsContext";

import api from "../Api/api";
import Header from "../Header/header";
import { Tags } from "../Tags/tags";
import AllPosts from "../AllPosts/allposts";
import FullPostInfo from "../FullPostInfo/full-post-info";
import EditForm from "../Forms/edit-form";
import Footer from "../Footer/footer";
import NotFound from "../NotFound";
import useDebounce from "../../hooks/useDebounce";

const App = () => {

  const [selectByTags, setSelectByTags] = useState("");
  const [posts, setPosts] = useState([]);
  const [authState, setAuthState] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearchQuery = useDebounce(searchQuery, 500);

  const AccessAllowed = useCallback((email, password) => {
    let result =
    localStorage.getItem("id") === "636a510659b98b038f779cee" &&
    localStorage.getItem("authorised") === 'true';
    api.putAuthLocalInfo(email, password);
    setAuthState(result)
  }, []);

  const exit = useCallback(() => {
    localStorage.removeItem("id");
    localStorage.removeItem("authorised");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    setAuthState(false)
    console.log('Good by');
  }, []);

  (function () {
    if(!authState && (localStorage.getItem('authorised') === 'true')) {
      setAuthState(true)
    }
  }())


  useEffect(() => {
    api.getAllPosts()
    .then((postsData) => {
      let filteredPosts = postsData.filter((value) => {
        return value.author._id === '636a510659b98b038f779cee'
      })


      setPosts(filteredPosts.sort((a, b) => Date.parse(b?.created_at) - Date.parse(a?.created_at)) );
    });
  }, [AccessAllowed, exit, authState, searchQuery, debounceSearchQuery]);
  

  const handleSelectTag = (e) => {
    setSelectByTags(e.target.innerText);
  };

  const handleSelectTagCleared = useCallback(() => {
    setSelectByTags("");
  }, []);

  return (
  <UserContext.Provider value={ {authState, AccessAllowed, exit, setAuthState} }>
      <PostsContext.Provider value={{posts, setPosts, isLoading, setIsLoading, searchQuery, setSearchQuery, debounceSearchQuery}} >
      <Layout className={s.layout}>
        <Header handleSelectTagCleared={handleSelectTagCleared} />
        <Layout className={s.layout}>
          <Tags
            posts={posts}
            handleSelectTag={handleSelectTag}
            selectByTags={selectByTags}
            handleSelectTagCleared={handleSelectTagCleared}
          />
          <main className={cn(s.main__content)}>
            <Routes>
              <Route index element={<AllPosts posts={posts} selectByTags={selectByTags} />} />
              <Route path="tagpage-:tagpage" element={<AllPosts posts={posts} selectByTags={selectByTags} />} />
              <Route path="/post-:id" element={<FullPostInfo />} />
              <Route path="/edit-:id" element={<EditForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Layout>
        <Footer />
      </Layout>
      </PostsContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
