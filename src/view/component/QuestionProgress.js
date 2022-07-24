import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setQuestionVisitCount } from "../../application/reducers/testSlice";
import Flag from "../assets/markFlag.svg";
import FlagDark from "../assets/markFlagDark.svg";

function Circles({ visited, number, marked }) {
  const style = {
    container: {
      backgroundColor: visited ? "#F23A5E" : "#FCC9C9",
      height: "2.2rem",
      width: "2.2rem",
      borderRadius: "1.1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box sx={style.container}>
        <Typography sx={{ color: visited ? "white" : "#F23A5E" }}>
          {number}
        </Typography>
      </Box>
      <img src={marked ? FlagDark : Flag} alt="" />
    </Box>
  );
}

export default function QuestionProgress() {
  const dispatch = useDispatch();
  const {
    testQuestion,
    questionVisitCount,
    testResult: { questions_details },
    totalQuestion,
  } = useSelector((state) => state.test);

  const style = {
    container: {
      width: "100%",
      height: "15%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
  };

  return (
    <Box sx={style.container}>
      {[...Array(totalQuestion ? totalQuestion : 0).keys()].map((index) => {
        const data = questions_details[index]
          ? questions_details[index]
          : false;
        const isMarked = data ? data["isMarked"] : false;

        return (
          <div
            key={index}
            onClick={() => dispatch(setQuestionVisitCount(index + 1))}
          >
            <Circles
              number={index + 1}
              visited={index + 1 <= questionVisitCount ? true : false}
              marked={isMarked}
            />
          </div>
        );
      })}
    </Box>
  );
}
