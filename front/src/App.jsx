import React, { useEffect, useState } from 'react';
import './styles/main.scss';
const axios = require('axios');
const ip = 'http://localhost:4444';         // ip сервер разработки
// const ip = 'http://192.168.137.1:4444';   // ip сервер для совместого теста
// const ip = 'http://45.147.179.34:4444';  // ip основной

// Компоненты
import Header from './components/header/Header.jsx';   // Шапка
import Authentication from './components/Authentication/Authentication.jsx';   // Аунтификация
import Content from './components/Content/Content.jsx';   // Контент
import Profile from './components/Profile/Profile.jsx';   // Профиль 
import Marks from './components/marks/Marks.jsx';   // Закладки


export default function App() {

  // Запрос данных пользователя
  const [user, set_user] = useState({})
  useEffect(() => {
    axios.post(ip + '/user', { _id: localStorage.getItem('user_key') })
      .then(function (res) {
        const user = {
          name: res.data[0].profile.name,
          icon: res.data[0].profile.icon,
          key: res.data[0].data.key,
          root: res.data[0].data.roots,
          marks: res.data[0].marks
        }
        set_user(user)
      });
  }, [localStorage.getItem('user_key')])
  // Отображение компонентов
  const [open_authentication, set_open_authentication] = React.useState(false);
  const [open_profile, set_open_profile] = React.useState(false);
  const [open_marks, set_open_marks] = React.useState(false);



  return (
    <>

      {/* Шапка */}
      <Header
        user={user}
        open_authentication={set_open_authentication}
        open_profile={set_open_profile}
        open_marks={set_open_marks}
      />



      {/* Модальные окна */}
      {open_authentication === true && <Authentication close={set_open_authentication} ip={ip} />}
      {open_profile === true && <Profile close={set_open_profile} ip={ip} user={user} />}
      {open_marks === true && <Marks close={set_open_marks} ip={ip} marks={user.marks}/>}


      {/* Книги */}
      <div className="content_subcontent">
        <Content
          ip={ip}
        />
      </div>
    </>
  )
}