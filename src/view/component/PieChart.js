import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Chart,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { Typography, Box } from "@mui/material";
import { pink } from "@mui/material/colors";
import Checkbox from "@mui/material/Checkbox";

const data = [
  { title: "Total Correct", val: 4119626293 },
  { title: "Total Correct", val: 1012956064 },
  { title: "Total Correct", val: 344124520 },
  { title: "Total Correct", val: 590946440 },
];

export default class PieChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <>
        <Paper
          style={{
            border: "1px solid #BABABA",
            boxSizing: "border-box",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <Chart data={chartData}>
            <PieSeries
              valueField="val"
              argumentField="title"
              innerRadius={0.6}
            />
            {/* <Title
            text="The Population of Continents and titles"
          /> */}
            <Animation />
          </Chart>
          {/* {data.map((item, i) => (

                        <div key={i}>
                            <Typography style={{ color: '#676767', fontSize: '18px' }}>
                                <Checkbox
                                    defaultChecked
                                    sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        },
                                    }}
                                />   {item.title}
                            </Typography>
                        </div>

                    ))} */}
        </Paper>
      </>
    );
  }
}
