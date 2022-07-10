import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Table, TableProps, Input } from "antd";
import "antd/dist/antd.css"; // style import needed
import { LinkOutlined } from "@ant-design/icons";

const { Search } = Input;

type TablePaginationPosition =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

function App() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [top, setTop] = useState<TablePaginationPosition | "none">("none");
  const [bottom, setBottom] = useState<TablePaginationPosition>("bottomCenter");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://api.github.com/search/users?q=example")
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data.items);
        setTotalCount(response.data.total_count);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setLoading(false);
      });
  };

  const onSearch = (value: string) => {
    axios
      .get(`https://api.github.com/search/users?q=${value}`)
      .then(function (response) {
        // handle success
        setData(response.data.items);
        setTotalCount(response.data.total_count);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
      });    
  };

  const columns = [
    {
      title: "Profile Picture",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (_, { avatar_url }: any) => {
        return <img src={avatar_url} width={40} height={40} />;
      },
    },
    {
      title: "User ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Repository",
      dataIndex: "repos_url",
      key: "repos_url",
      render: (_, { repos_url }: any) => {
        return (
          <a href={repos_url} target="_blank">
            Link
          </a>
        );
      },
    },
    {
      title: "Repository",
      dataIndex: "repos_url",
      key: "repos_url",
      render: (_, { repos_url }: any) => {
        return (
          <a href={repos_url} target="_blank">
            <LinkOutlined />
          </a>
        );
      },
    },
  ];

  const tableProps: TableProps<DataType> = {
    bordered: true,
    loading,
    // size,
    // expandable,
    // title: showTitle ? defaultTitle : undefined,
    // showHeader,
    // footer: showfooter ? defaultFooter : undefined,
    // rowSelection,
    // scroll,
    tableLayout: "fixed",
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>Github User Search</div>
      </header>
      <main>
        <div className="top-container">
          <div>
            Total Count is: <b>{totalCount}</b>
          </div>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </div>
        <Table
          {...tableProps}
          dataSource={data}
          columns={columns}
          pagination={{ position: [top as TablePaginationPosition, bottom] }}
        />
      </main>
    </div>
  );
}

export default App;
