import { Button } from "antd";
import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import { useContext, useState } from "react"
import { UserContext } from "../../context/UserContext"
import EditUserForm from "../Forms/edit-user-form";

export const UserInfo = (infoCard, setInfoCard) => {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [infoCard, setInfoCard] = useState('view');
    console.log(infoCard, '<== infoCard', setInfoCard, '<== setInfoCard');

    return (
    infoCard !== 'edit' ?
            <>
        <Card 
            cover={
                <img src={userInfo?.avatar} alt={userInfo?.name} />
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
            setUserInfo={setUserInfo} setInfoCard={setInfoCard} 
        />
        </>

    )
}