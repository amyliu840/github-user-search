import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Table, TableProps, Input, TablePaginationConfig, Alert, Button } from "antd";
import "antd/dist/antd.css"; // style import needed
import { LinkOutlined } from "@ant-design/icons";
import { SorterResult } from "antd/lib/table/interface";

const { Search } = Input;

interface Params {
  pagination?: TablePaginationConfig;
  sorter?: SorterResult<any> | SorterResult<any>[];
  total?: number;
  sortField?: string;
  sortOrder?: string;
}

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
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [errorText, setErrorText] = useState(undefined)

  useEffect(() => {
    fetchData({pagination});
    return () => setErrorText(undefined)
  }, []);

  const fetchData = (params: Params = {}) => {
    setLoading(true);
    setErrorText(undefined)
    axios
      .get("https://api.github.com/search/users?q=example")
      .then(function (response) {
        // handle success
        console.log(response);
        setData(response.data.items);
        setTotalCount(response.data.total_count);
        setPagination({
          ...params.pagination,
          total: response.data.total_count,
        });
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setLoading(false);
      });
  };

  const onSearch = (value: string) => {
    setErrorText(undefined)
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
        setErrorText(error.message)
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
    tableLayout: "fixed",
  };

  const handleTableChange = (
    newPagination: TablePaginationConfig,
  ) => {
    fetchData({
      pagination: newPagination,
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>Github User Search</div>
      </header>
      <main>
        {errorText && <Alert
          message="Error Text"
          showIcon
          description={errorText}
          type="error"
          closable
        />}
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
          // pagination={{ position: [top as TablePaginationPosition, bottom] }}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </main>
    </div>
  );
}

export default App;
