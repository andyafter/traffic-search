import { Layout } from "antd";
import logo from "./logo.svg";
import SearchPage from "./pages/searchPage/searchPage";

import "antd/dist/antd.css";
import "./App.css";

const { Header, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header>
          <img width={80} src={logo} className="App-logo" alt="logo" />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <SearchPage />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
