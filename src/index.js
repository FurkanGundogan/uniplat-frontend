import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import MyApp from './MyApp';

//theme: global temada kullanılmak için kullanılıyor
//theme providera parametre olarak gitti
const theme = createTheme({

});

ReactDOM.render(
  <React.StrictMode> 
      <ThemeProvider theme={theme} >
        <MyApp/>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
