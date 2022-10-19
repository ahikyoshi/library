import React, { useState, useEffect } from 'react';
import './header.scss';

export default function Header(props) {

    // Окна 
    const [open_settings,   set_open_settings]  = useState(false);  // Окно настроек
    const [open_mobile,     set_open_mobile]    = useState(false) ;  // Мобильное меню
    // Данные
    const [user_loggined,   set_user_loggined]  = useState(false);  // Права пользователя

    // Проверка авторизации
    useEffect(() => {
        if(localStorage.getItem('user_key') != null){
            if (localStorage.getItem('user_key').length > 5) {
                set_user_loggined(true)
            }else{
                set_user_loggined(false)
            }
        }
    }, [localStorage.getItem('user_key')])

    function user_exit(){
        localStorage.setItem('user_key','asd');
        set_open_mobile(false)
    }

    return (
        <header className="header">
            <div className="header-container">

                {/* Логотип приложения */}
                <div className="logotype">
                    <img src="./assets/icons/header/logotype.png" alt="Логотип Personal.Lib" className="logotype-icon" />
                    <div className="logotype-title">{'{' + 'Personal.'}<span className="logotype-subtitle">Lib</span>{'}'}</div>
                </div>

                {/* Десктопное меню */}
                <div className="menu">
                    {user_loggined === false ?
                        <div className="entry" onClick={() => props.open_authentication(true)}>
                            Войти
                        </div>
                        :
                        <>
                            <div className="user">
                                <div className="btn-profile" style={{ backgroundImage: "url(" + props.user.icon + ")" }} onClick={() => props.open_profile(true)}></div>
                                <img 
                                    src="./assets/icons/header/marks.svg" 
                                    width={30}
                                    height={30} 
                                    alt="Закладки" 
                                    className="marks-icon" 
                                    onClick={() => props.open_marks(true)} 
                                />
                                <img 
                                    src="./assets/icons/header/setting.png" 
                                    width={26}
                                    height={26} 
                                    alt="Настройки" 
                                    className='setting-btn' 
                                />
                            </div>
                        </>
                    }
                </div>

                {/* Мобильное меню */}
                <div className="mobile-menu-icon">
                    <span onClick={() => set_open_mobile(true)}>☰</span>
                    {open_mobile === true &&
                        <div className="mobile-menu">
                            {user_loggined === false ?
                                <div className="mobile-items">
                                    <div className="mobile-close" onClick={() => set_open_mobile(false)}>X</div>
                                    <div className="mobile-logo">{'{Personal.'}<span style={{color: "purple"}}>Lib</span>{'}'}</div>
                                    <div className="mobile-item">Последние обновления</div>
                                    <div className="mobile-item">О программе</div>
                                    <div className="mobile-item"  onClick={() => props.open_authentication(true)}>Вход</div>
                                </div>
                                :
                                <div className="mobile-items">
                                    <div className="mobile-close" onClick={() => set_open_mobile(false)}>X</div>
                                    <div className="mobile-logo">{'{Personal.'}<span style={{color: "purple"}}>Lib</span>{'}'}</div>
                                    <div className="mobile-item" onClick={() => { props.open_profile(true); set_open_mobile(false) }}>Профиль</div>
                                    <div className="mobile-item">Настройки</div>
                                    <div className="mobile-item" onClick={() => { props.open_marks(true); set_open_mobile(false) }}>Закладки</div>
                                    <div className="mobile-item" onClick={() => user_exit()}>Выход</div>
                                </div>
                            }
                        </div>
                    }
                </div>

            </div>
        </header>
    )
}
