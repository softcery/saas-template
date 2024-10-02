import { createBrowserRouter, RouterProvider } from 'react-router-dom'

export const Router = () => {
  const router = createBrowserRouter([{ path: '/', element: <></> }])

  return <RouterProvider router={router} />
}
