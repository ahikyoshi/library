import React, { useEffect, useState } from 'react';
import './profile.scss';    // Стили
import axios from "axios";  // Библиотека для запросов на сервер

export default function Profile(props) {

  // Изменение изображения
  function Change_icon() {
    let req = {
      new_img: document.querySelector('.profile-change-input').value,
      user_key: localStorage.getItem('user_key')
    }
    axios.post(props.ip + '/user/change/icon', req)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  function Check_icon() {
    let new_img = document.querySelector('.profile-change-input').value;
    console.log(new_img)
    set_new_img(new_img)
    console.log(props.ip)
  }

  // Данные о пользователе
  const [change_icon, set_change_icon] = useState(false);
  const [new_img, set_new_img] = useState();
  return (
    <>

      <div className='profile'>

        <div className="bg"></div>

        <div className="btn-close" onClick={() => props.close(false)}>X</div>

        <div className="content">

          <img style={{ backgroundImage: "url(" + props.user.icon + ")" }} alt="" className="icon" />
          <div className="change-img" onClick={() => set_change_icon(true)}>Изменить</div>


          <div className="name">{props.user.name}</div>

          <div className="email">Ваш ключ: #{props.user.key}</div>

          <div className="prof-stats">
            <div className="stats-item">
              <div className="stats-num">0</div>
              <div className="stats-title">Прочтено</div>
            </div>
            <div className="stats-item">
              <div className="stats-num">0</div>
              <div className="stats-title">Комментариев</div>
            </div>
            <div className="stats-item">
              <div className="stats-num">0</div>
              <div className="stats-title">Оценок</div>
            </div>
          </div>

          <div className="about">
            Нет описания пользователя
          </div>

          {/* Соц сети пользователя */}
          {/* <div className="prof-social">
        <div className="social-items"></div>
      </div> */}

        </div>
      </div>

      {change_icon === true &&
        <>
          <div className="overlay" onClick={() => set_change_icon(false)}>
          </div>
          <div className="profile-change-content">

            <div className="profile-change-img_1" style={{ backgroundImage: "url(" + new_img + ")" }}></div>
            <span>Основное изображение профиля</span>
            <div className="profile-change-img_2" style={{ backgroundImage: "url(" + new_img + ")" }}></div>
            <span>Малое изображение профиля</span>
            <div>
              <span>url: нового изображение</span>
              <input type="text" className="profile-change-input" />
            </div>

            <div className="profile-change-btns">

              <button className="profile-change-change" onClick={() => Change_icon()}>Изменить</button>
              <button className="profile-change-check" onClick={() => Check_icon()}>Проверить</button>
            </div>

          </div>
        </>
      }

    </>

  )
}
