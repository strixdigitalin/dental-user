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
import { makeStyles } from "@mui/styles";
import UserNavigation from "../../component/UserNavigation";
import UserFooter from "../../component/UserFooter";
import api from "../../../infrastructure/utils/axios";

const useStyles = makeStyles({
  thead: {
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#FFFFFF",
  },
});
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

function createData(score, testName, date, mode, testResult) {
  return { score, testName, date, mode, testResult };
}

export default function PreviousTest() {
  const [tests, setTests] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    api.get("testResult/all").then((res) => setTests([...res.data.data]));
  }, []);
  return (
    <>
      <UserNavigation />
      {/* // <section style={{ margin: "100px auto" ,width:'80%'}}> */}
      <Container maxWidth="xl" style={{ margin: "100px auto" }}>
        <Typography
          variant="h4"
          style={{ color: "#434343", fontSize: "27px", margin: "40px 0" }}
        >
          Previous Tests
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontSize: "20px" }}>
                  Score
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  Test Name
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  Date
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  Mode
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ fontSize: "20px" }}>
                  Test Result
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test) => (
                <StyledTableRow key={test.score}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    className={classes.row}
                    style={{ fontSize: "16px" }}
                  >
                    {`${
                      Math.ceil(test["totalScore"]) - test["totalScore"] <=
                      test["totalScore"] - Math.floor(test["totalScore"])
                        ? Math.ceil(test["totalScore"])
                        : Math.floor(test["totalScore"])
                    } %`}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test.test_name}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test["createdAt"].slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test.mode}
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "16px" }}>
                    {test.totalScore < 10
                      ? "Poor"
                      : 10 < test.totalScore && test.totalScore <= 50
                      ? "Good"
                      : "Excellent"}
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
