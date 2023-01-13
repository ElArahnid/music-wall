import React from "react";
import Sider from "antd/es/layout/Sider";
import s from "./style.module.css";

export const MySider = ({ posts, handleSelectTag, handleSelectTagCleared }) => {
    
    let tags = [];
    posts?.map((res) => {
        (res?.tags).map((tag, i) => 
            tags.push((tag.slice(0, 50)).toLowerCase().replace(/\s/g, ""))
         )
    })

    const cloodTags = [...new Set(tags)].sort();

    return (
        <Sider collapsed={false} theme="light" className={s.MySider}>
            <div className={s.tag} onClick={handleSelectTagCleared}>Все посты</div>
            { cloodTags?.map((tagFromCloud, i) => 
                <span className={s.tag} key={i} onClick={handleSelectTag}>{tagFromCloud}</span>
            ) }
        </Sider>
    )
}
