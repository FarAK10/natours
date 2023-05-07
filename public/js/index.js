/* eslint-disable */ 
import { login } from "../../controllers/authController";
import '@babel/polyfill'
import { displayMap } from "./mapbox";

const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form')

if(mapBox){
  const locations = JSON.parse(document.getElementById('map').dataset.locations);
  displayMap(locations)
}

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

if(loginForm){
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log('login')
    login(email, password);
});
}
