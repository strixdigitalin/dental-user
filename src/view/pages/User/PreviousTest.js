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
import { BACKEND_URL } from "../../Constant";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
  const UserData = useSelector((state) => state.auth);
  const { userId } = UserData.user;
  useEffect(() => {
    console.log(UserData);
    api
      .get(`${BACKEND_URL}/api/v1/package-test-result/previous`, {
        params: { user: userId },
      })
      .then((res) => setTests([...res.data.data].reverse()));
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
                  Package
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
                    <Link
                      to={`/user/result/${test?._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {test?.package?.title}
                    </Link>
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
                  {/* </span> */}
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
