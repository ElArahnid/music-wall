import React from "react";
import Sider from "antd/es/layout/Sider";
import s from "./style.module.css";
import { getColor, getNumber } from "../../utilites/utilites";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

export const Tags = ({ posts, handleSelectTag }) => {
  
  let tags = [];
  
  // console.log(posts);

const findAndClearTags = () => {
    posts?.map((res) => {
    (res?.tags).map((tag, i) =>
      tags?.push(tag.slice(0, 25).toLowerCase().replace(/\s/g, ""))
    )
  })
}

findAndClearTags()

  const cloodTags = [...new Set(tags)].sort();

  return (
    <Sider 
      collapsible={true} 
      style={{position: 'relative'}} className={s.mySider}>
      {
      cloodTags?.map((tagFromCloud, i) => (
        <Link to={`tagpage-${tagFromCloud}`}
          className={s.tag}
          key={i}
          style={{ backgroundColor: getColor(30), fontSize: getNumber(12, 20) }}
          onClick={handleSelectTag}
        >
          {tagFromCloud}
        </Link>
      ))
      }
    </Sider>
  );
};
