import React, { useState } from "react";
import { useCallback } from "react";
import { Button, Modal } from "antd";
import { NavLink } from "react-router-dom";
import { getColor, getNumber } from "../../utilites/utilites";
import { AuthForm } from "../Forms/auth-form";
import s from "./style.module.css";
import logo from "./img/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AddForm from "../Forms/add-form";

const Header = ({ handleSelectTagCleared }) => {
  const squareWidth = 3;

  const [squads, setSquads] = useState(
    Math.floor((window.innerWidth - 50) / squareWidth)
  );
  const { authState } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showAddModal = useCallback(() => {
    setIsModalAddOpen(true);
  }, []);

  const handleAddOk = () => {
    setIsModalAddOpen(false);
  };

  const handleAddCancel = () => {
    setIsModalAddOpen(false);
  };

  window.addEventListener("resize", () =>
    setSquads(Math.floor((window.innerWidth - 50) / squareWidth))
  );

  const colorSquare = useCallback((squares) => {
    let i = 0;
    let div = [];
    while (i <= squares) {
      i++;
      div.push(
        <div
          key={i}
          style={{
            width: squareWidth,
            height: `${getNumber(1, 100)}%`,
            backgroundColor: getColor(80),
          }}
          className={s.colorSquare}
        >
          &nbsp;
        </div>
      );
    }
    return div;
  }, []);

  return (
    <>
      <header className={s.header}>
        <div className={s.headerBG}>{colorSquare(squads)}</div>
        <div className={s.logo}>
          <NavLink to="/" onClick={() => handleSelectTagCleared()}>
            <img
              src={logo}
              className={s.logo__img}
              alt="То в музыке, что я люблю!"
            />
            <span>То, что я люблю</span>
          </NavLink>
        </div>
        <div className={s.userPanel}>
          {!authState ? (
            <Button type="primary" onClick={showModal}>
              <FontAwesomeIcon icon={faMusic} />
              <FontAwesomeIcon icon={faUser} />
            </Button>
          ) : (
            <div>
              <img
                src={localStorage.getItem("avatar")}
                alt={localStorage.getItem("name")}
                className={s.avatar}
              />

              <FontAwesomeIcon
                icon={faPlus}
                className={s.faButtons}
                onClick={showAddModal}
              />
            </div>
          )}
          <Modal
            title="Авторизация"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            forceRender={false}
            footer={[]}
          >
            <AuthForm />
          </Modal>
          <Modal
            title="Добавление поста"
            open={isModalAddOpen}
            onOk={handleAddOk}
            onCancel={handleAddCancel}
            forceRender={false}
            footer={[]}
          >
            <AddForm />
          </Modal>
        </div>
      </header>
    </>
  );
};

export default Header;
