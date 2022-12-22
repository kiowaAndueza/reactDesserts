import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { MdDelete } from "react-icons/md";
import { store } from "../../token/Token";
import { deleteDessert } from "../../services/ApiServices";
import { confirmationMessage, errorMessage, successfulMessage } from "../messages/Messages";


export function ListDessert({ characters = [] }, props) {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const rowsPerPage = 10;
  let results = [];
  const [token, setToken] = store.useState("token");

  //GET INPUT VALUE OR PAGE NUMBER
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //GET PAGE NUMBER
  const handleChangePage = (e, p) => {
    setSearch(e.target.value);
    setPage(p);
  };

  //DELETE DESSERT
  const handleDelete = async (id, name) => {
    const result = await confirmationMessage(`Delete "${name}"?`);
    if (!result.value) {
      return;
    }
    try {
      await deleteDessert(id, token)
      successfulMessage("Has been removed successfully");
    } catch (error) {
      errorMessage(error);
    }
  };

  //GET SEARCH DESSERTS
  if (!search) {
    results = characters;
  } else {
    results = characters.filter((data) =>
      data.name.toLowerCase().includes(search.toLocaleLowerCase())
    );
  }

  //Make styles for pagination
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  }));

  return (
    <div className="tableAndSearch m-5">
      <h1 className="d-flex mb-3 title-table">Dessert List</h1>
      <div className="form-outline mb-5">
        <input
          type="text"
          value={search}
          id="form1"
          className="form-control"
          onChange={handleChange}
          placeholder="Search by name"
          aria-label="Search"
        />
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="mb-3">
            {results
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  {
                    <TableCell>
                      <MdDelete
                        value={item}
                        onClick={async () => {
                          await handleDelete(item.id, item.name);
                        }}
                      />
                    </TableCell>
                  }
                </TableRow>
              ))}
          </TableBody>
          <TableFooter className="tableFooter">
            <TableRow className={useStyles().root}>
              <TablePagination
                rowsPerPageOptions={[10]}
                component="td"
                count={results.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
