import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root{
  --dark-orange: #edb01e;
  --orange: #fac74e;
  --light-orange: #fdedc8;
  --dark-brown: #4d4020;
  --light-brown: #e6d5b9;
  --gray-brown: #8A7C5A;
}


  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: Koulen;
  }

  body {
    margin: 0;
     }  
`;
