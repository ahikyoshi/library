// Библиотеки
import axios from 'axios';
import React from 'react'           ;
// Стили
import './book.scss'                ;
import './media.scss'               ;

export default function Book(props) {

    function add_marks() {
        axios.post(props.ip + '/user/marks', {book_id: props.book._id, user_key: localStorage.getItem('user_key')})
            .then((res) => console.log(res))
    }

    return (
        <div className='book'>

            {/* Изображение и ссылка */}
            <div className="book-subcontent">
                {/* Исправить отсютсвия блока при отсютвии изображения */}
                <img src={props.book.images} alt={props.book.title} className="book-image" width={130}/>
                <a href={props.book.link} className="book-read_btn" target={'_blank'}>Читать</a>
            </div>

            {/* Контент */}
            <div className="book-content">

                {/* Название книги и добавление в закладки */}
                <div className="book-title">
                    {props.book.title}
                    <div className="book-mark_add" onClick={() => add_marks()}>+</div>
                </div>

                {/* Цикл и номер цикла */}
                <div className="book-cycle" onClick={() => props.sort_cycle(props.book.cycle.name)}>
                    {props.book.cycle.name}
                    <div className="book-cycle_number">({props.book.cycle.number})</div>
                </div>

                {/* Автор */}
                <div className="book-author" onClick={() => props.sort_author(props.book.author)}>
                    {props.book.author}
                </div>

                {/* Описание */}
                <div className="book-discribe">
                    {props.book.discribe}
                </div>

                {/* Комментировать и меню */}
                <nav className="book-menu">
                    <div className="book-comment">Комментировать</div>
                    <div className="book-more_btn">...</div>
                </nav>

            </div>

        </div>
    )
}
