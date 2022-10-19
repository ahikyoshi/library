// Библиотеки
import React from 'react';
import { useState } from 'react';
// Стили
import './authentication.scss';
import './media.scss'
// Компоненты
import Login from './Login/Login.jsx';
import Regist from './Registration/Registration.jsx';

export default function Authentication(props) {

  const [entry, set_entry] = useState(true);

  return (
    <>
      <div className="overlay" onClick={() => props.close(false)}></div>
      <div className="authentication">

        {/* Навигация по авторизации и регистрации */}
        <div className="authentication-nav">
          <div
            className="authentication-btn"
            id={entry === true ? 'authentication-unactive_left' : undefined}
            onClick={() => set_entry(false)}
          >
            Авторизация
          </div>
          <div
            className="authentication-btn"
            id={entry === false ? 'authentication-unactive_right' : undefined}
            onClick={() => set_entry(true)}
          >
            Регистрация
          </div>
        </div>

        {/* Кнопка закрыть */}
        <div className="authentication-close" onClick={() => props.close(false)}>X</div>

        {/* Контент авторизации или регистрации */}
        <div className="authentication-content">
          {entry === false ?
            <Login  ip={props.ip} close={props.close} />
            :
            <Regist ip={props.ip} close={props.close} />
          }  
        </div>

      </div>
    </>
  )
}
