import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import cn from "classnames";

import Layout from "antd/es/layout/layout";

import s from "./style.module.css";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import AllPosts from "../AllPosts/allposts";
import FullPostInfo from "../FullPostInfo/full-post-info";
import GlobalAuth from '../Context/main-context'
import NotFound from '../NotFound'
import EditForm from "../EditForm/edit-form";

const App = ({postId}) => {
  return (
    <GlobalAuth.Provider value={null}>
    <BrowserRouter>
      <Layout className={s.layout}>
        <Header />
        <Layout>
          <main className={cn(s.main__content)}>
            <Routes>
            <Route path='/' element={<AllPosts />} />
            <Route path='/post-:id' element={<FullPostInfo />} />
            <Route path='/edit-:id' element={<EditForm />} />
            <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
        </Layout>
        <Footer />
      </Layout>
    </BrowserRouter>
    </GlobalAuth.Provider>
  );
};

export default App;
