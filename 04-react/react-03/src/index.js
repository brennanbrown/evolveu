import React, { Component}  from "react"
import ReactDOM, { render } from "react-dom"
import Library from "./Library"

let bookList = [
    {"title": "The Sun Alsos Rises", "author": "Ernest Hemingway", "pages": 260},
    {"title": "White Teeth", "author": "Zadie Smith", "pages": 480},
    {"title": "Cat's Cradle", "author": "Kurt Vonnegut", "pages": 304},
]

render (
    <Library books={bookList}/>,
    document.getElementById("root")
)