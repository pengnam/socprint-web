import { FC, ReactElement } from 'react'
import Layout from '../components/Layout'
import PrintForm from '../components/PrintForm'

const IndexPage: FC = (): ReactElement => (
  <Layout title="SOCprint">
    <div className="container">
        <h1 className="title">SOCprint</h1>
        <h2 className="description">POSIX™-compliant, zero-dependency shell script to print stuff in NUS SoC</h2>
        <PrintForm/>
    </div>
  </Layout>
)

export default IndexPage
