import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FormHelperText, Link as UILink } from "@mui/material";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Copyright from "./Copyright";
import { makeStyles } from "@mui/styles";
import bgImage from "./uni2.jpg";
import { Form, SignUpUseForm } from "./SignUpUseForm";
import Input from "./Input";
import MySelect from "./Select";
import * as SelectService from "./SelectService";
import InputStyles from "./InputStyles";
import axios from "axios";
import RegisterSuccessAlert from "./RegisterSuccessAlert";
import { useEffect } from "react";
import {URL_USERS,URL_UNIVERSITIES,URL_USERFOLLOWS,TYPE_UNI} from "../Contexts/Paths"
//theme için makeStyles,classess yapılarını kullanıyoruz
// globalden body'i style verdiğimiz için classess şimdilik kullanılmadı
const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundImage: `url(${bgImage})`,
      height: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      [theme.breakpoints.down("sm")]: {
        background: "transparent",
      },
    },
  },
  underlinedWhite: {
    color: "blue !important",
    textDecoration: "underline !important",
    [theme.breakpoints.down("sm")]: {
      color: "blue !important",
    },
  },
}));

const initialValues = {
  name: "",
  surname: "",
  password: "",
  confirmPassword: "",
  email: "",
  birthDate: new Date("01/01/2000"),
  gender: "",
  universityId: "",
  departmentId: "",
  type: "",
  degree: "",
};

const SignUpPage = () => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "First Name is required";
    if ("surname" in fieldValues)
      temp.surname = fieldValues.surname ? "" : "Last Name is required";
    if ("email" in fieldValues)
      temp.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.edu.tr$/.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid";

    if ("password" in fieldValues) {
      if (fieldValues.password.length > 5) {
        temp.password = "";
        temp.confirmPassword = "";
        if (fieldValues.password !== values.confirmPassword) {
          temp.password = "Passwords are not match";
          temp.confirmPassword = "Passwords are not match";
        }
      } else {
        temp.password = "Password must be least 6 characters";
      }
    }

    if ("confirmPassword" in fieldValues) {
      if (fieldValues.confirmPassword.length > 5) {
        temp.password = "";
        temp.confirmPassword = "";
        if (values.password !== fieldValues.confirmPassword) {
          temp.password = "Passwords are not match";
          temp.confirmPassword = "Passwords are not match";
        }
      } else {
        temp.confirmPassword = "Password must be least 6 characters";
      }
    }

    if ("gender" in fieldValues)
      temp.gender = fieldValues.gender.length !== 0 ? "" : "Required";
    if ("universityId" in fieldValues)
      temp.universityId =
        fieldValues.universityId.length !== 0 ? "" : "Required";
    /*
        if ('departmentId' in fieldValues)
             temp.departmentId = fieldValues.departmentId.length !== 0 ? "" : "Required"
        if ('type' in fieldValues)
             temp.type = fieldValues.type.length !== 0 ? "" : "Required"
        if ('degree' in fieldValues)
             temp.degree = fieldValues.degree !== 0 ? "" : "Required"
        */
    // departmentId,type,degree kullanılmıyor yorum satırına alındı
    // birthDate ile ilgili olanlar kendi onchange'inde

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange } =
    SignUpUseForm(initialValues, true, validate);

  // kullanım koşulları için 2 state var, birincisi form submiti sırasında kontrol ediliyor
  // ikinicisi birincisine bağlı çalışmakta, eğer birincisi false ise ikinicisi false olup form submit olunca görünüyor.
  const [checked, setChecked] = React.useState(false);
  const [checkError, setcheckError] = React.useState(false);
  const [showAlert, setAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState("bos");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!checked) {
      setcheckError(true);
    }
    if (validate() && checked) {
      let mydate = values.birthDate;
      mydate.setTime(mydate.getTime() + 3 * 60 * 60 * 1000);
      let datestring = mydate.toISOString();
      console.log("values:", values);
      setTypeWithEmail(values.email);
      let yeniKayit = JSON.parse(JSON.stringify(values));
      yeniKayit.birthDate = datestring;
      yeniKayit.departmentId = "";

      console.log("yeniKayit:", yeniKayit);
      console.log(checked);
      // yeniKayit nesnesi gönderilecek
      window.scrollTo(0, 0);
      //post işlemi:
      axios(URL_USERS, {
        method: "POST",
        header: { "Content-type": "application/json" },
        data: yeniKayit,
      })
        .then((response) => {
          console.log("Response:", response);
          handleResponse(response);
          setAlert(true);
          window.scrollTo(0, 0);
        })
        .catch((error) => {
          setAlertType("error");
          setAlertMsg(error.response.data.message);
          setAlert(true);
        });
    }
  };

  const handleResponse = (response) => {
    // let status=response.status
    let status = response.status;
    if (status === 200) {
      setAlertType("success");
      setAlertMsg("Register Sucess");
      // olusturulan kullaniciya universitesini takip ettirme
      axios(URL_USERFOLLOWS, {
        method: "POST",
        header: { "Content-type": "application/json" },
        data: {
          followId:values.universityId,
          userId:response.data.id,
          followType:TYPE_UNI
        },
      }).then((response) => {
        console.log("Uni Ekleme Response:", response);
      });
    } else if (status === 404) {
      setAlertType("error");
      setAlertMsg("Register Failed");
    }
  };

  const controlDate = (event) => {
    let control = "valid";

    if (event !== null) {
      event = new Date(event);
      console.log(event);
      let myDate = event.toLocaleDateString();
      let dateArr = myDate.split(".");
      console.log(event);
      console.log(myDate);
      console.log(dateArr);
      //length < 3 : girilen tarih zaten bozuksa, component onu invalid olarak getiriyor
      // bu yüzden düzgün 3 elemanlı split olmamış oluyor ve direkt hatalı koşulu sağlıyor.
      if ((dateArr.length < 3) | (dateArr[2] > 2014) | (dateArr[2] < 1925)) {
        control = "invalid";
        setErrors({ ...errors, birthDate: "Invalid Date" });
      } else {
        control = "valid";
        setErrors({ ...errors, birthDate: "" });
      }
    } else {
      control = "blank birthDate";
      setErrors({ ...errors, birthDate: "Please Enter Date" });
    }
    console.log(control);
    return control;
  };
  const setTypeWithEmail = (email) => {
    let mailArr = email.split("@");
    console.log(mailArr);
    mailArr = mailArr[1].split(".");
    if (mailArr[0] !== "stu") {
      values.type = "TEACHER";
    } else {
      values.type = "STUDENT";
    }
  };

  const maxDate = new Date("12-31-2014");
  const minDate = new Date("01-01-1925");
  //theme için
  const classes = useStyles();
  const selectionClasses = InputStyles();

  const [uniList, setUniList] = React.useState([]);
  useEffect(() => {
    
    axios
      .get(URL_UNIVERSITIES)
      .then((response) => {
        console.log("res:", response.data.content);
        setUniList(response.data.content);
      })
      .catch((e) => {
        console.log("getall-uni-error");
      });
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      {showAlert && (
        <RegisterSuccessAlert type={alertType} alertMsg={alertMsg} />
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component={Form} onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                fullWidth
                autoComplete="given-name"
                id="name"
                label="First Name"
                name="name"
                value={values.name}
                error={errors.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                fullWidth
                id="surname"
                label="Last Name"
                name="surname"
                value={values.surname}
                error={errors.surname}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                error={errors.email}
                autoComplete="email"
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                fullWidth
                name="password"
                value={values.password}
                label="Password"
                type="password"
                id="password"
                error={errors.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <MySelect
                  name="gender"
                  label="Gender"
                  value={values.gender}
                  onChange={handleInputChange}
                  options={SelectService.getGenderCollection()}
                  error={errors.gender}
                ></MySelect>
              </Box>
            </Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Birth Date"
                  inputFormat="dd/MM/yyyy"
                  minDate={minDate}
                  maxDate={maxDate}
                  value={values.birthDate}
                  onChange={(newValue) => {
                    setValues({ ...values, birthDate: newValue });
                    controlDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={
                        errors.birthDate === "" ? "" : errors.birthDate
                      }
                      className={selectionClasses.root}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </LocalizationProvider>

            <Grid item xs={12} sm={12}>
              <Box>
                <MySelect
                  name="universityId"
                  label="University"
                  onChange={handleInputChange}
                  value={values.universityId}
                  options={uniList}
                  error={errors.universityId}
                ></MySelect>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} display={"none"}>
              <Box>
                <MySelect
                  name="departmentId"
                  label="Department"
                  onChange={handleInputChange}
                  value={values.departmentId}
                  options={SelectService.getDepartmentCollection()}
                  error={errors.departmentId}
                ></MySelect>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} display={"none"}>
              <Box>
                <MySelect
                  name="type"
                  label="Type"
                  value={values.type}
                  onChange={handleInputChange}
                  options={SelectService.getTypeCollection()}
                  error={errors.type}
                ></MySelect>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} display={"none"}>
              <Box>
                <MySelect
                  name="degree"
                  label="Degree"
                  value={values.degree}
                  onChange={handleInputChange}
                  options={SelectService.getDegreeCollection()}
                  error={errors.degree}
                ></MySelect>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      if (e.target.checked) setcheckError(false);
                    }}
                    value="kosullar"
                    color="primary"
                  />
                }
                label="I have read, and accept the terms of use"
              />
              <FormHelperText error>
                {checkError ? "You must accept the terms of use" : ""}
              </FormHelperText>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <UILink
            component={Link}
            to="/SignIn"
            variant="body2"
            className={classes.underlinedWhite}
          >
            {"Already have an account? Sign In"}
          </UILink>
        </Box>
      </Box>
      <Copyright cpymrg={2} />
    </Container>
  );
};
export default SignUpPage;
