import React from "react";
import Sider from "antd/es/layout/Sider";
import s from "./style.module.css";

export const MySider = () => {
    return (
        <Sider collapsed={true} theme="light" className={s.MySider}>
            Тут будет облако тегов и дополнительные кнопки редактирования постов для админа (невидимые без авторизации)
        </Sider>
    )
}
