// Библиотеки
import React from 'react';
const axios = require('axios');
// Стили
import './registration.scss';
import './media.scss'   ;

export default function Registration(props) {

    // Завершение регистрации
    const [reg_success, set_reg_success] = React.useState(false)
    const [user_key,    set_user_key]    = React.useState('')
    // Тексты ошибок при заполнении формы
    const [name_error, set_name_error] = React.useState('Ваше имя будет публичным');
    const [login_error, set_login_error] = React.useState('');
    const [password_error, set_password_error] = React.useState('Пароль невозможно восстановить');
    // Функция регестрации пользователя
    function registration() {

        // Переменные успеха
        let login_success = false;
        let name_succes = false;
        let password_succes = false;
        let unic_code = Math.floor(Math.random() * 10000);

        // Данные введенные пользователем
        const user = {
            "name": document.querySelector('#user_name').value,
            "login": document.querySelector('#user_login').value,
            "password": document.querySelector('#user_password').value,
            "password_2": document.querySelector('#user_password_2').value,
            "icon": "./assets/images/standart_logo_profile.jpg",
            "user_key": unic_code
        }
        // Проверка валиндности имени
        if (user.name.length === 0) {
            set_name_error('* Введите имя')
            document.querySelector('#user_name').classList.add('error')
            document.querySelector('#user_name').classList.remove('success');
            name_succes = false;
        } else {
            if (user.name.length < 3 || user.name.length > 12) {
                set_name_error('* От 3 до 12 символов');
                document.querySelector('#user_name').classList.add('error');
                document.querySelector('#user_name').classList.remove('success');
                name_succes = false;
            } else {
                document.querySelector('#user_name').classList.remove('error');
                document.querySelector('#user_name').classList.add('success');
                set_name_error('Имя подходит');
                name_succes = true;
            }
        }
        // Проверка валидности логина
        if (user.login.length === 0) {
            set_login_error('* Введите логин');
            document.querySelector('#user_login').classList.add('error');
            login_success = false;
        } else {
            if (user.login.length > 12 || user.login.length < 3) {
                set_login_error('* От 3 до 12');
                document.querySelector('#user_login').classList.add('error');
            } else {
                let user_name = user.login.split('');
                for (let i = 0; user_name.length > i; i++) {
                    if (user_name[i] === '1' ||
                        user_name[i] === '2' ||
                        user_name[i] === '3' ||
                        user_name[i] === '4' ||
                        user_name[i] === '5' ||
                        user_name[i] === '6' ||
                        user_name[i] === '7' ||
                        user_name[i] === '8' ||
                        user_name[i] === '9' ||
                        user_name[i] === '0'
                    ) {
                        document.querySelector('#user_login').classList.remove('error');
                        document.querySelector('#user_login').classList.add('success');
                        set_login_error('Логин подходит')
                        login_success = true;
                        break
                    } else {
                        document.querySelector('#user_login').classList.remove('success');
                        document.querySelector('#user_login').classList.add('error');
                        set_login_error('* Логин должен содержать цифры')
                        login_success = false;
                    }
                }
            }
        }
        // Проверка валидности пароля
        if (user.password === '') {
            set_password_error('* Введите пароль');
            document.querySelector("#user_password").classList.add('error');
            document.querySelector("#user_password_2").classList.add('error');
        } else {
            if (user.password === user.password_2) {
                document.querySelector("#user_password").classList.remove('error');
                document.querySelector("#user_password_2").classList.remove('error');
                document.querySelector("#user_password").classList.add('success');
                document.querySelector("#user_password_2").classList.add('success');
                set_password_error('');
                password_succes = true;
            } else {
                document.querySelector("#user_password").classList.add('error');
                document.querySelector("#user_password_2").classList.add('error');
                set_password_error('* Пороли не совпадают')
            }
        }
        // Проверка валидности формы и отправка на сервер
        if (name_succes === true && password_succes === true && login_success === true) {
            axios.post(props.ip + '/auth/registration', user)
                .then(function (res) {
                    console.log(res)
                    set_login_error('');
                    document.querySelector('#user_login').classList.add('success');
                    document.querySelector('#user_login').classList.remove('error');
                    set_reg_success(true);
                    set_user_key(res.data[0]._id)
                })
                .catch((err) => {
                    console.log(err)
                    set_login_error('Логин уже используется');
                    document.querySelector('#user_login').classList.remove('success');
                    document.querySelector('#user_login').classList.add('error');
                })
        }
    };
    function cont() {
        localStorage.setItem('user_key',user_key)
        props.close(false);
    }

    return (
        <>
            {reg_success === false
                ?
                <>
                    <div className="registration">

                        {/* Форма регистрации */}
                        <div className="registration-content">

                            <div className="registration-title">Регистрация</div>

                            <div className="registration-item">
                                <input className='registration-input' type="text" id='user_name' placeholder='Имя: ' />
                                <div className='error_text'>{name_error}</div>
                            </div>

                            <div className="registration-item">
                                <input className='registration-input' type="text" id='user_login' placeholder='Логин: ' />
                                <div className='error_text'>{login_error}</div>
                            </div>

                            <div className="registration-item">
                                <input className='registration-input' type="password" id='user_password' placeholder='Пароль: ' />
                                <div className='error_text'>{password_error}</div>
                            </div>

                            <div className="registration-item">
                                <input className='registration-input' type="password" id='user_password_2' placeholder='Подтвердите пароль: ' />
                                <div className='error_text'>{password_error}</div>
                            </div>

                            {/* *Добавить checkbox конф персоналных данных* */}

                            <div className="registration-btn" onClick={() => registration()}>Зарегистрироваться</div>

                        </div>

                        {/* Бонус за регистрацию */}
                        <div className="registration-bonus">

                            <div className="registration-bonus-title">После регистрации вам станут доступны следующие функции</div>
                            
                            <div className="registration-bonus-item">
                                {/* <img src="" alt="" /> */}
                                <div className="text">Возможность сохронять до 10 книг в свою библиотеку</div>
                            </div>
                            
                            <div className="registration-bonus-item">
                                {/* <img src="" alt="" /> */}
                                <div className="text">Оставлять оценки и комментарии под понравившимися произведениями</div>
                            </div>
                            
                            <div className="registration-bonus-item">
                                {/* <img src="" alt="" /> */}
                                <div className="text">Заказывай добавление книг на сайт</div>
                            </div>
                            
                            <div className="registration-bonus-item">
                                {/* <img src="" alt="" /> */}
                                <div className="text">Отправлять друзьям свою коллекцию</div>
                            
                            </div>
                        </div>

                    </div>
                </>
                :
                <>
                    <div className="registration-success">
                        <div className="registration-success-title">
                            Регистрация прошла успешно
                            <div className="registration-success-subtitle">Добро пожаловать на Personal.Lib</div>
                        </div>
                        <div className="registration-success-btn" onClick={() => cont()}>Войти</div>
                        <div className="registration-success-subbtn" onClick={() => props.close(false)}>Войти позже</div>

                    </div>
                </>
            }
        </>
    )
}