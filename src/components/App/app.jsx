import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import cn from "classnames";

import Layout from "antd/es/layout/layout";

import s from "./style.module.css";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import AllPosts from "../AllPosts/allposts";
import FullPostInfo from "../FullPostInfo/full-post-info";
import GlobalAuth from "../Context/main-context";
import NotFound from "../NotFound";
import EditForm from "../EditForm/edit-form";
import { MySider } from "../Sider/sider";
import api from '../Api/api';


const App = () => {

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    api.getAllPosts().then((postsData) => {
      setPosts(postsData);
    });
  }, []);

  const [selectByTags, setSelectByTags] = useState('');
  const handleSelectTag = (e) => {
      setSelectByTags(e.target.innerText)
  }

  const handleSelectTagCleared = () => {setSelectByTags('')}

  return (
    <GlobalAuth.Provider value={null}>
      <Layout className={s.layout}>
        <Header />
        <Layout>
          <MySider posts={posts} handleSelectTag={handleSelectTag} selectByTags={selectByTags} handleSelectTagCleared={handleSelectTagCleared} />
          <main className={cn(s.main__content)}>
          <Routes>
            <Route path="/" element={<AllPosts posts={posts} selectByTags={selectByTags} />} />
            <Route path="/post-:id" element={<FullPostInfo />} />
            <Route path="/edit-:id" element={<EditForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </main>
        </Layout>
        <Footer />
      </Layout>
    </GlobalAuth.Provider>
  );
};

export default App;
