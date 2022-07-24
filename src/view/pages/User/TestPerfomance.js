import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserNavigation from "../../component/UserNavigation";
import UserFooter from "../../component/UserFooter";
import api from "../../../infrastructure/utils/axios";
import { NavLink } from "react-router-dom";

// const useStyles = makeStyles({
//   thead: {
//     fontWeight: 600,
//     fontSize: "20px",
//     lineHeight: "24px",
//     color: "#FFFFFF",
//   },
// });
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F23A5E",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  ViewScore,
  name,
  created,
  Correct,
  Incorrect,
  Unanswered,
  Qlist
) {
  return { ViewScore, name, created, Correct, Incorrect, Unanswered, Qlist };
}

const rows = [
  createData("View Result", "Some Test 1", "15th June, 2021", 10, 5, 70, 33),
  createData("View Result", "Some Test 1", "15th June, 2021", 10, 5, 70, 33),
  createData("View Result", "Some Test 1", "15th June, 2021", 10, 5, 70, 33),
  createData("View Result", "Some Test 1", "15th June, 2021", 10, 5, 70, 33),
  createData("View Result", "Some Test 1", "15th June, 2021", 10, 5, 70, 33),
  createData("View Result", "Some Test 1", "15th June, 2021", 10, 5, 70, 33),
  createData("View Result", "Some Test 1", "15th June, 2021", 10, 5, 70, 33),
];

export default function TestPerfomance() {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    api.get("testResult/all").then((res) => setTests([...res.data.data]));
  });
  return (
    <>
      <UserNavigation />
      <Container maxWidth="xl" style={{ margin: "100px auto" }}>
        <Typography
          variant="h4"
          style={{ color: "#434343", fontSize: "27px", margin: "40px 0" }}
        >
          Test Performance
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontSize: "20px" }}>
                  View
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  created
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  Correct
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  In Correct
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  Unanswered
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  # of Que
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test) => (
                <StyledTableRow key={test.ViewScore}>
                  <StyledTableCell component="th" scope="row">
                    <NavLink
                      to={`/user/result/${test["_id"]}`}
                      style={{ color: "#F23A5E", fontSize: "16px" }}
                    >
                      View Result
                    </NavLink>
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test.test_name}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test["createdAt"].slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test.totalCorrect}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test.totalIncorrect}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test.totalUnanswered}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test.totalQuestion}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <UserFooter />
    </>
  );
}
