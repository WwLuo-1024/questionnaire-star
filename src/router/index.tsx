import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '../Layouts/MainLayout'
import { ManageLayout } from '../Layouts/ManageLayout'
import { QuestionLayout } from '../Layouts/QuestionLayout'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { NotFound } from '../pages/NotFound'
import { List } from '../pages/manage/List'
import { Recycle } from '../pages/manage/Recycle'
import { Star } from '../pages/manage/Star'
import { Edit } from '../pages/question/Edit'
import { Statistic } from '../pages/question/Statistic'

export const routerConfig = createBrowserRouter([
  {
    //Main Page
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },

      //Questionnaire Manage
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'recycle',
            element: <Recycle />,
          },
        ],
      },
      //404
      {
        path: '*', //404 Router Setting
        element: <NotFound />,
      },
    ],
  },

  //Questionnaire Detail
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'statistic/:id',
        element: <Statistic />,
      },
    ],
  },
])
