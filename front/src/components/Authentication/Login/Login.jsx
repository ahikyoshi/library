// Библиотеки
import React from 'react';
const axios = require('axios');
// Стили
import './login.scss';
import './media.scss';

export default function login(props) {

  const [error, set_error] = React.useState('')

  function login() {

    // Вводимые данные
    let user = {
      login: document.querySelector('#login-login').value,
      password: document.querySelector('#login-password').value
    }

    // Cброс ошибок
    document.querySelector('#login-login').classList.remove('login-input-error')
    document.querySelector('#login-password').classList.remove('login-input-error')
    set_error('')

    // Проверка на заполненость обоих форм
    if (user.login === '' && user.password === '') {
      set_error('* Заполните форму')
      document.querySelector('#login-login').classList.add('login-input-error')
      document.querySelector('#login-password').classList.add('login-input-error')
    }else{

      // Проверка на заполненость обеих форм
      if(user.login === '' || user.password === ''){
        
        // Проверка пустоты логина
        if(user.login === ''){
          document.querySelector('#login-login').classList.add('login-input-error')
          console.log('нет логина')
          set_error('* введите логин')
        }

        // Проверка пустоты пароля
        if(user.password === ''){
          document.querySelector('#login-password').classList.add('login-input-error')
          console.log('нет пароля')
          set_error('* введите пароль')
        }

      }else{

        // Запрос на сервер
        axios.post(props.ip + '/auth/login', user)
        .then(function (res) {
          localStorage.setItem('user_key', res.data);
          props.close(false)
        })
        .catch((err) => {
          document.querySelector('#login-login').classList.add('login-input-error')
          document.querySelector('#login-password').classList.add('login-input-error')
          set_error('* данные не верны')
        })
        
      }
    }
    
  }

  return (
    <div className="login">

      <div className="login-content">
        <div className="login-title">Авторизация</div>
        <input className='login-input' type="text" placeholder='Ваш логин: ' id='login-login' />
        <input className='login-input' type="password" placeholder='Ваш пароль: ' id='login-password' />
        <div className="login-error">{error}</div>
        <div className="login-btn" onClick={() => login()}>Войти</div>
      </div>

      <div className="login-welcome">С возвращением!</div>

    </div>
  )
}
