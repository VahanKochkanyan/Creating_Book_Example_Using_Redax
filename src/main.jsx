import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Books } from './features/books/books.jsx'
import { Comments } from './features/comments/comments.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import { AddBook } from './components/add-book.jsx'

const router = createBrowserRouter([

  {
    path: '',
    element: <Books />
  },

  {
    path: '/book/:id',
    element: <Comments />
  },

  {
    path: '/add',
    element: <AddBook/>
  }
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
)