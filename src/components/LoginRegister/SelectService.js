import axios from "axios"


export const getGenderCollection = () => [
  { id: "FEMALE", name: "Kadın" },
  { id: "MALE", name: "Erkek" },
];

export const getDepartmentCollection = () => [
  { id: "Bilgisayar Mühendisliği", name: "Bilgisayar Mühendisliği" },
  { id: "Hukuk", name: "Hukuk" },
  { id: "İşletme", name: "İşletme" },
];

export const getTypeCollection = () => [
  { id: "TEACHER", name: "Teacher" },
  { id: "STUDENT", name: "Student" },
];

export const getDegreeCollection = () => [
  { id: "Lisans", name: "Lisans" },
  { id: "Ön Lisans", name: "Ön Lisans" },
];
