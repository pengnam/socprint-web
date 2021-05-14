import { FC, ReactElement } from 'react'
import Layout from '../components/Layout'
import PrintForm from '../components/PrintForm'
import StatusIndicator from "../components/StatusIndicator"

const IndexPage: FC = (): ReactElement => (
  <Layout title="SOCprint">
    <StatusIndicator/>
    <div className="container">
        <h1 className="title">SOCprint</h1>
        <h2 className="description">Using a <a href="https://github.com/dlqs/SOCprint">POSIX™-compliant, zero-dependency shell script</a> to print stuff in NUS SoC</h2>
          <div className="card">
          <PrintForm/>
        </div>
    </div>
  </Layout>
)

export default IndexPage
