import moment from "moment";
export const validateMessage = (text) => {
  if ((text === undefined) | (text === "")) return false;
  if (/^(?! *$)[a-zA-ZıiİçÇşŞğĞÜüÖö.+ '-,-\/\\?\\!\\=\\_\\(\\)\\{\\}:\d+]+$/.test(text) === false) return false; //eslint-disable-line

  return true;
};

export const validateSurvey = (myOptions) => {
  let control = true;
  myOptions.forEach((element) => {
    if ((element.info === undefined) | (element.info === "")) {
      // direkt return false calismadi, kod biraz uzadi
      control = false;
      return control;
    }
    if (/^(?! *$)[a-zA-ZıiİçÇşŞğĞÜüÖö.+ '-]+$/.test(element.info) === false) {
      control = false;
      return false;
    }
  });
  return control;
};

export const validateISODate = (dateISO,maxDate) => {

  if(dateISO==="invalid"){
    return {econtrol:false,emsg:"Select Valid Date"}
  }

   let selected = new Date(dateISO);
   selected.setTime(selected.getTime() - 3 * 60 * 60 * 1000);

   //console.log("selected:",selected)
   //console.log("maxDate:",maxDate)

  let t1=new Date(moment())-selected
  let t2=selected-maxDate
  // t1 geçmiş zaman kontrolü
  // t2 en fazla 1 yıl kontrolü,
  // modal açıldıktan sonraki bir yıl için geçerli çünkü takvimdeki seçenekler modal açılınca belirleniyor
 
  if (t1>0) {
    return {econtrol:false,emsg:"Select Future Date"}
  }
  if (t2>0) {
    return {econtrol:false,emsg:"Select Max 1 Year Ahead"}
  }

  return {econtrol:true,emsg:""}
};

export const validateEventLocation = (loc) => {

  if ((loc === undefined) | (loc === "")) return false;
  if (/^(?! *$)[a-zA-ZıiİçÇşŞğĞÜüÖö.+ '-,-\/:\d+]+$/.test(loc) === false) return false; //eslint-disable-line

  return true;
};

export const validateEventTitle = (loc) => {

  if ((loc === undefined) | (loc === "")) return false;
  if (/^(?! *$)[a-zA-ZıiİçÇşŞğĞÜüÖö.+ '-,-\/:\d+]+$/.test(loc) === false) return false; //eslint-disable-line

  return true;
};

export const validateFileSize = (size) => {
  if (size >= 5242880) return false;
  return true;
};

export const validateFileExtension = (type) => {
  if (type === "image/gif" | type === "image/png" | type === "image/jpeg") return true;
  return false;
};

