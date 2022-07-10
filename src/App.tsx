import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Table, TableProps } from "antd";
import 'antd/dist/antd.css'; // style import needed

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
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [top, setTop] = useState<TablePaginationPosition | 'none'>('none');
  const [bottom, setBottom] = useState<TablePaginationPosition>('bottomCenter');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://api.github.com/search/users?q=example")
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data.items);
        setTotalCount(response.data.total_count);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };


  // avatar_url: "https://avatars.githubusercontent.com/u/57936?v=4"
  // events_url: "https://api.github.com/users/example/events{/privacy}"
  // followers_url: "https://api.github.com/users/example/followers"
  // following_url: "https://api.github.com/users/example/following{/other_user}"
  // gists_url: "https://api.github.com/users/example/gists{/gist_id}"
  // gravatar_id: ""
  // html_url: "https://github.com/example"
  // id: 57936
  // login: "example"
  // node_id: "MDQ6VXNlcjU3OTM2"
  // organizations_url: "https://api.github.com/users/example/orgs"
  // received_events_url: "https://api.github.com/users/example/received_events"
  // repos_url: "https://api.github.com/users/example/repos"
  // score: 1
  // site_admin: false
  // starred_url: "https://api.github.com/users/example/starred{/owner}{/repo}"
  // subscriptions_url: "https://api.github.com/users/example/subscriptions"
  // type: "User"
  // url: "https://api.github.com/users/example"
  const columns = [
    {
      title: "score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "avatar_url",
      dataIndex: "avatar_url",
      key: "avatar_url",
    },
    // {
    //   title: '住址',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    // {
    //   title: '姓名',
    //   dataIndex: 'name',
    //   key: 'name',
    // },
    // {
    //   title: '年龄',
    //   dataIndex: 'age',
    //   key: 'age',
    // },
    // {
    //   title: '住址',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
  ];

  const tableProps: TableProps<DataType> = {
    bordered: true,
    loading: false,
    // size,
    // expandable,
    // title: showTitle ? defaultTitle : undefined,
    // showHeader,
    // footer: showfooter ? defaultFooter : undefined,
    // rowSelection,
    // scroll,
    // tableLayout,
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Github User Search</p>
      </header>
      <main>
        <p>Total Count is: {totalCount}</p>
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
