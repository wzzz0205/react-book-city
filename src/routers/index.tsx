import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

import Home from "@/pages/home"
import BookList from "@/pages/bookList";
import Detail from "@/pages/detail";
import Category from "@/pages/category";
import Chapter from "@/pages/chapter";
import Ranking from "@/pages/ranking";
import Search from "@/pages/search";
import Shelf from "@/pages/shelf";

const Router: React.FC = React.memo(()=>{
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/book-list/:key',
      element: <BookList />,
    },
    {
      path: '/book/:id',
      element: <Detail />,
    },
    {
      path: '/category',
      element: <Category />,
    },
    {
      path: '/book/:bookId/:chapterId',
      element: <Chapter />,
    },
    {
      path: '/ranking',
      element: <Ranking />,
    },
    {
      path: '/search',
      element: <Search />,
    },
    {
      path: '/shelf',
      element: <Shelf />,
    },
    {
      path: '*',
      element: <Navigate to="/" />
    }
  ]);
  return element;
})

export default Router;
