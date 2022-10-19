// Библиотеки
import React from 'react'
import { useState } from 'react'
const axios = require('axios')
// Стили
import './new_book.scss'

export default function New_book(props) {

    const [test_img, set_test_img] = useState('');

    // Проверка изображения
    function check_image() {
        set_test_img(document.querySelector('#new_book_img').value)
    }

    // Отправка книги
    function new_book() {
        let arr = {
            title: document.querySelector('.new_book-title').value,
            images: document.querySelector('#new_book_img').value,
            link: document.querySelector('.new_book-link').value,
            cycle: {
                name: document.querySelector('.new_book-cycle-name').value,
                number: document.querySelector('.new_book-cycle-number').value
            },
            author: document.querySelector('.new_book-author').value,
            discribe: document.querySelector('.new_book-discribe').value,
        }

        axios.post(props.ip + '/books/new_book',arr)
            .then((res) => {
                console.log(res)
            })

    }

    return (
        <div className='new_book'>

            {/* Изменение изображения */}
            <div className="new_book-subcontent">
                <img src={test_img} alt="" className="new_book-image" />
                <input type="text" className='new_book-check_input' id='new_book_img' placeholder='Изображение: ' />
                <button className="new_book-check_btn" onClick={() => check_image()}>Проверить изображение</button>
            </div>

            {/* Контент книжки */}
            <div className="new_book-content">
                {/* Название произведения */}
                <input type="text" className="new_book-title" placeholder='Название произведения' />
                {/* Цикл произведения */}
                <div className="new_book-cycle">
                    <input type="text" className="new_book-cycle-name" placeholder='Цикл' />
                    (<input type="text" className="new_book-cycle-number" placeholder='0' />)
                </div>
                {/* Автор */}
                <input type="text" className="new_book-author" placeholder='Автор'/>
                {/* Описание */}
                <textarea className="new_book-discribe" placeholder='Описание'></textarea>
                {/* Ссылка */}
                <div className="new_book-menu">
                    <input type="text" className="new_book-link" placeholder='Ссылка'/>
                    <button className="new_book-btn" onClick={() => new_book()}>Добавить книгу</button>
                </div>
            </div>

        </div>
    )
}
