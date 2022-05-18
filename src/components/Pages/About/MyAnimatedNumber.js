import React,{ useState } from "react";
import AnimatedNumbers from "react-animated-numbers";
import AboutStyles from "./AboutStyles";
import MuiAlert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function MyAnimatedNumber({title,severity,count,icon}) {

  const classes= AboutStyles()
  return (
    <div className={classes.NumberItem}>
      <Alert severity={severity} icon={icon} className={classes.Alert}>
        <AnimatedNumbers
        className={classes.Animated}
         animateToNumber={count}
         fontStyle={{ fontSize: 28,justifyContent:"center !important" }}
         configs={(number, index) => {
           return { mass: 1, tension: 230 * (index + 1), friction: 140 };
         }}
        />
        <div className={classes.Title}>{title}</div>
        </Alert>
    </div>
  );
}

export default MyAnimatedNumber;
