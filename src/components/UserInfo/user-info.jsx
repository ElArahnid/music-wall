import { Button } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import EditUserForm from "../Forms/edit-user-form";
import s from './style.module.css';

export const UserInfo = () => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [infoCard, setInfoCard] = useState('view');
    // console.log(infoCard, '<== infoCard', setInfoCard, '<== setInfoCard');

    return (
    infoCard === 'view' ?
            <>
        <Card className={s.card} 
            cover={
                <img src={userInfo?.avatar} alt={userInfo?.name} className={s.img} />
            }
            >
            <Meta 
            title={userInfo?.name}
            description={
            <>
                <div>Обо мне: {userInfo?.about}</div>
                <div>E-Mail: {userInfo?.email}</div>
                <Button type="primary" onClick={() => setInfoCard('edit')}>Редактировать</Button>
            </>
            }

            />
            </Card>
        </>
        : 
        <>
        <EditUserForm 
            titleHead="Редактирование имени и информации" 
            setUserInfo={setUserInfo} userInfo={userInfo} setInfoCard={setInfoCard} 
        />
        </>

    )
}