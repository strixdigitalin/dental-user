import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LinearProgress from "@mui/material/LinearProgress";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { tableCellClasses } from "@mui/material/TableCell";
import UserNavigation from "../../component/UserNavigation";
import UserFooter from "../../component/UserFooter";
import api from "../../../infrastructure/utils/axios";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { useState } from "react";

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

function createData(name, usage, correct, incorrect, ommited) {
  return {
    name,
    usage,
    correct,
    incorrect,
    ommited,
    topics: [
      {
        name: "Nervous System",
        usage: "4/108",
        correct: "3(75%)",
        incorrect: "0(0%)",
        ommited: "1(25%)",
      },
      {
        name: "Pulmonary & Critical Care",
        usage: "1/8",
        correct: "1(100%)",
        incorrect: "0(0%)",
        ommited: "0(0%)",
      },
      {
        name: "Nervous System",
        usage: "4/108",
        correct: "3(75%)",
        incorrect: "0(0%)",
        ommited: "1(25%)",
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(20);

  return (
    <React.Fragment>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Box
            display="flex"
            flexDirection="column"
            sx={{ gap: 5, fontSize: "16px" }}
          >
            {row.name}
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        </TableCell>
        <TableCell align="right" style={{ fontSize: "16px" }}>
          {row.usage}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "16px" }}>
          {row.correct}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "16px" }}>
          {row.incorrect}
        </TableCell>
        <TableCell align="right" style={{ fontSize: "16px" }}>
          {row.ommited}
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: "0 30px" }}>
              <Table aria-label="purchases">
                <TableBody>
                  {row.topics.map((topic) => (
                    <StyledTableRow key={topic.name}>
                      <StyledTableCell />
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ fontSize: "16px" }}
                      >
                        {topic.name}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{ fontSize: "16px" }}
                      >
                        {topic.usage}
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        style={{ fontSize: "16px" }}
                      >
                        {topic.correct}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ fontSize: "16px" }}
                      >
                        {topic.incorrect}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ fontSize: "16px" }}
                      >
                        {topic.ommited}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("Anatomy", "8/286", "7(88%)", "0(0%)", "1(12%)", 3.99),
  createData("Anatomy", "8/286", "7(88%)", "0(0%)", "1(12%)", 3.99),
  createData("Anatomy", "8/286", "7(88%)", "0(0%)", "1(12%)", 3.99),
];

export default function FKnTopics() {
  const [data, setData] = useState();
  useEffect(() => {
    api.get("/testResult/topic/perfomance").then((res) => {
      console.log(res.data.data);
    });
  }, []);
  return (
    <>
      <UserNavigation />
      <Container maxWidth="xl" style={{ margin: "100px auto" }}>
        <Typography
          variant="h4"
          style={{ color: "#434343", fontSize: "27px", margin: "40px 0" }}
        >
          Functional Knowledge and Topics
        </Typography>
        <br />

        <TableContainer component={Paper} style={{ borderRadius: 5 }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell sx={{ fontSize: "20px" }}>
                  Name
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ fontSize: "20px" }}>
                  Usage
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ fontSize: "20px" }}>
                  correct
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ fontSize: "20px" }}>
                  Incorrect
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ fontSize: "20px" }}>
                  Ommited
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <UserFooter />
    </>
  );
}
