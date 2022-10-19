import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './marks.scss'

export default function Marks(props) {

  const [marks_books,set_marks_books] = useState({})

  useEffect(() => {
    // Создание массивов закладок и буффер массива
    const marks = [props.marks.book_1,props.marks.book_2,props.marks.book_3,props.marks.book_4,props.marks.book_5];
    const arr = [];

    // Запрос книг
    axios.get(props.ip + '/books')
    .then((res) => {
      for(let item in marks){
        console.log(res.data.length)
      }
    })

  },[])
  return (
    <>
    <div className="overlay" onClick={() => props.close(false)}></div>
    <div className="marks">
        <div className="title" onClick={() => console.log(props.marks)}>Закладки</div>
    </div>
    </>
  )
}
