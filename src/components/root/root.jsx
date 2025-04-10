import { Outlet } from 'react-router-dom'
import { Header } from '../header/header'
import { ContentArea } from '../contentArea/contentArea'
import { Footer } from '../footer/footer'

export const Root = () => {
  return (
    <>
      <Header />
      <ContentArea />
      <Outlet />
      <Footer />
    </>
  )
}
