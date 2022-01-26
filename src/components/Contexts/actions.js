import axios from "axios";
const ROOT_URL_LOGIN = "http://localhost:8080/login";
export async function loginUser(dispatch, loginPayload) {
  dispatch({ type: "REQUEST_LOGIN" });

  return axios
    .post(ROOT_URL_LOGIN, null, {
      params: {
        email: loginPayload.email,
        password: loginPayload.password,
      },
    })
    .then((response) => {
      console.log("İstek Sonucu:", response);
      //  home page'e login şartı koy
      if (response.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response;
      } else {
        return response;
      }
    })
    .catch((e) => {
      //altta error mesajı ilk aşamada senkron sıkıntısı çıkartıyordu, göstermeyi direkt login sayfasına taşıdık
      // dispatch({ type: 'LOGIN_ERROR', payload: e.response.data.message+"" });
      return e;
    });
}

export async function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("currentUser");
}
