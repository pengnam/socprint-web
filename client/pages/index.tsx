import { FC, ReactElement } from 'react'
import Layout from '../components/Layout'
import PrintForm from '../components/PrintForm'

const IndexPage: FC = (): ReactElement => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋{process.env.NODE_ENV}</h1>
    <PrintForm/>
  </Layout>
)

export default IndexPage
