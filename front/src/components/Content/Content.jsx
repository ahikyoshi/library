// Библиотеки
import React from 'react';
import { useEffect, useState } from 'react';
const axios = require('axios')
// Стили
import './content.scss';
// Компоненты
import Book from './Book/Book.jsx';
import New_book from './New_book/New_book.jsx';

export default function Content(props) {

  // Переменные
  const [all_books, set_all_books] = useState([]); // Все книги с сервера
  const [current_books, set_currect_books] = useState([]); // Книги с текущими фильтрами
  const [page_books, set_page_books] = useState([]); // Книги на странице
  const [refresh_books, set_refresh_books] = useState(1)
  // Получение книг с сервера
  useEffect(() => {

    axios.get(props.ip + '/books')
      .then((res) => {
        set_all_books(res.data)
        set_currect_books(res.data)
      })

  }, [refresh_books])

  // Рассчет и отображение страниц
  useEffect(() => {

    // Рассчет кол-во страницы
    let page = current_books.length / 10 + 1;
    let pages = [];

    // Создание панели страниц
    for (let i = 1; page > i; i++) {
      pages.push(i)
    }
    set_pages(pages)

  }, [current_books])

  // Отображение в зависимости от страницы
  const [pages, set_pages] = useState([]); // Страницы
  const [page, set_page] = useState(1); // Текущая страница 
  useEffect(() => {

    // Проверка существования списка
    if (current_books.length != 0) {
      let arr = [];

      // Прогонка с 9 до 0 || с 19 до 10 и т.д
      for (let i = page * 10 - 1; i > page * 10 - 10 - 1; i--) {

        // Проверка на существование книги
        if (current_books[i] != undefined) {

          // Запись книг в массив
          arr.push(current_books[i])

        }

      }

      // Скрол страницы вверх и создание массива с книгами на странице
      window.scrollTo(0, 0)
      set_page_books(arr)

    }
  }, [page, current_books])

  // Сортировка по автору
  function sort_author(author) {

    // Временный массив
    let arr = []

    // Проверка массива на соответсвие с автором
    for (let i = 0; i < all_books.length; i++) {
      if (all_books[i].author === author) {
        arr.push(all_books[i])
      }
    }
    
    // Установка нового массива
    set_currect_books(arr)
  }

  // Сортировка по циклу
  function sort_cycle(cycle) {
    
    console.log(all_books)
    // Буфер массивов
    let arr = [];
    let arr_2 = [];
    // Поиск всех книг цикла
    for (let i = 0; i < all_books.length; i++) {
      if (all_books[i].cycle.name === cycle) {
        arr.push(all_books[i])
      }
    }

    // Прогонка по всем книгам
    for(let a = 1; a < arr.length + 1; a++){

      for(let b = 0; b < arr.length; b ++){

        if(arr[b].cycle.number === String(a)){
          arr_2.push(arr[b])
        }

      }

    }

    set_currect_books(arr_2.reverse())

  }


  return (
    <div className='content' >

      {/* Новая книга */}
      <New_book ip={props.ip}/>
      {/* Список книг */}
      {
        page_books.map((book) =>
          <Book
            book={book}
            sort_author={sort_author}
            sort_cycle={sort_cycle}
            ip={props.ip}
          />
        )
      }
      {/* Навигация по страницам */}
      <nav className="content-pages">
        Страницы:
        <div className="pages-line" style={{ marginLeft: 'calc(59px ' + '+ ' + page * 20 + 'px)' }}></div>
        {
          pages.map((page) => <div className='pages-page' onClick={() => set_page(page)}>{page}</div>)
        }
      </nav>
    </div>
  )

}
