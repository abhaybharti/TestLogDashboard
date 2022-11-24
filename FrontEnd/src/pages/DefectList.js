import React, { useEffect, useState } from "react";
import { TheList, ListItem, MyDeleteOutline } from "../styles/styled-element";
import { DataGrid } from "@material-ui/data-grid";
import { defectList } from "../dummyData";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../Utils/Config.js";

const DefectList = () => {
  const [data, setData] = useState(defectList);

  useEffect(() => {
    const defectList = async () => {
      try {
        const response = await fetch(BASE_API_URL + "/getDefectList");
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    defectList();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    // { field: "id", headerName: "ID", width: 50 },
    {
      field: "suite",
      headerName: "Suite",
      width: 500,
      renderCell: (params) => {
        return <ListItem>{params.row.suite}</ListItem>;
      },
    },
    {
      field: "testCaseName",
      headerName: "Test Case Name",
      width: 500,
      renderCell: (params) => {
        return <ListItem>{params.row.testcase}</ListItem>;
      },
    },

    {
      field: "env",
      headerName: "Env",
      width: 120,
      renderCell: (params) => {
        return <ListItem>{params.row.env}</ListItem>;
      },
    },
    {
      field: "failureReason",
      headerName: "Failure Reason",
      width: 200,
      renderCell: (params) => {
        return <ListItem>{params.row.failurereason}</ListItem>;
      },
    },
    {
      field: "Date",
      headerName: "Date",
      width: 120,
      renderCell: (params) => {
        return <ListItem>{params.row.timestamp.substring(0, 10)}</ListItem>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}></Link>
            <MyDeleteOutline onClick={() => handleDelete(params.row.id)} />
          </>
        );
      },
    },
  ];

  return (
    <TheList>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </TheList>
  );
};

export default DefectList;
