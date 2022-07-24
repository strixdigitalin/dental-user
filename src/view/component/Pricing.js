import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography, Box, Button } from "@mui/material";
import axios from "axios"
import { useCallback } from "react";
import useRazorpay from "react-razorpay";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "250px",
    height: "auto",
    padding: "0 0 30px 0",
    margin: "30px 0",
    border: "1px solid #EDEDED",
    boxSizing: "border-box",
    filter: "drop-shadow(0px 20px 40px rgba(191, 191, 191, 0.16))",
    borderRadius: "5px",
    "&:hover": {
      border: "1px solid #EDEDED",
      boxSizing: "border-box",
      boxShadow: "0px 20px 40px rgba(49, 49, 49, 0.1)",
      borderRadius: "5px",
    },
    // [theme.breakpoints.down(500)]: {
    //   padding: "30px ",
    // },
  },
  listItem: {
    fontSize: "16px",
    lineHeight: "40px",
    color: "#7B7B7B",
    alignItems: "center",
  },
  button: {
    border: "1px solid #7B7B7B",
    boxSizing: "border-box",
    filter:
      "drop-shadow(0px 100px 80px rgba(49, 49, 49, 0.1)) drop-shadow(0px 64.8148px 46.8519px rgba(49, 49, 49, 0.0759259)) drop-shadow(0px 38.5185px 25.4815px rgba(49, 49, 49, 0.0607407)) drop-shadow(0px 20px 13px rgba(49, 49, 49, 0.05)) drop-shadow(0px 8.14815px 6.51852px rgba(49, 49, 49, 0.0392593)) drop-shadow(0px 1.85185px 3.14815px rgba(49, 49, 49, 0.0240741))",
    borderRadius: "5px",
    padding: "8px 50px",
    textDecoration: "none",
    color: "#7B7B7B",
    "&:hover": {
      background: "#E23012",
      color: "#fff",
      border: "1px solid #E23012",
    },
  },
}));
const Pricing = () => {
  const classes = useStyles();
  const [plans, setPlans] = React.useState();
  const getPlans = async () => {
    try {
      const result = await axios.get("https://dworld-back.herokuapp.com/api/v1/subscription/all")
      console.log(result)
      setPlans(result)
    } catch (error) {
      console.log(error)
    }
  }
  React.useEffect(() => {
    getPlans()
  }, [])
  return (
    <>
      <div>
        <Typography
          variant="h1"
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#000",
          }}
        >
          Pricing
        </Typography>
        <br />
        <Typography
          variant="body1"
          sx={{
            fontSize: "1rem",
            textAlign: "center",
            color: "#7B7B7B",
            marginBottom: "70px",
            padding: "0 10px",
          }}
        >
          Slate helps you see how many more days you need to work to reach your
          financial goal.
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {plans && (<>
          {plans?.data.data.map((item, i) => (
            <Box className={classes.card} key={i}>
              <Typography
                style={{
                  fontSize: "20px",
                  background: "#FFF1F3",
                  textAlign: "center",
                  padding: "10px",
                }}
              >
                {item.name}
              </Typography>
              <Container>
                <h1 style={{ textAlign: "center" }}>
                  {item.extensionDays}
                  {/* <span style={{ fontSize: "16px", color: "#7B7B7B" }}>
                    / {item.time}
                  </span> */}
                </h1>
                {/* <p
                  style={{
                    fontSize: "16px",
                    color: "#7B7B7B",
                    textAlign: "center",
                  }}
                >
                  {item.extensionDays}
                </p> 
                <br />*/}
                {item.description.map((item) => (
                  <>
                    <li className={classes.listItem}>{item.title}</li>
                  </>
                ))}
                <br />
                <Typography
                  style={{
                    fontSize: "20px",
                    background: "#FFF1F3",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  <b>{item.amount}</b>
                </Typography>
                <br />
                {/* <PayButton /> */}
              </Container>
              {/* <br />
            <br /> */}
              {/* <div style={{ textAlign: "center" }}>
              <a href="" className={classes.button}>
                Try Now
              </a>
            </div> */}
            </Box>
          ))}
        </>)}
      </div>
    </>
  );
};

export default Pricing;


const PayButton = () => {
  const Razorpay = useRazorpay();

  const handlePayment = useCallback(() => {
    // const order = await createOrder(params);
    const options = {
      key: "rzp_test_EU0IcORo7uNU3F",
      amount: "9000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://dental.bobprep.com/static/media/laptop.9fe0a50d.png",
      // order_id: "12134124",
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);
  return (
    <>
      <div className="App">
        <Button size="large"  sx={{ width: "100%" }} variant="outlined" onClick={handlePayment} color="primary">
          Get Subscription
        </Button>
      </div>
    </>
  )
}