// =============================================
//            Global variables
// =============================================
const gender = document.querySelector('#gender');
const defaultOpt = gender.querySelectorAll('option')[0];
const rangeOutput = document.querySelector('label[for="amount"]');
const range = document.querySelector('#amount');
const btn = document.querySelector('[type="submit"]');
const tableOutput = document.querySelector('#tableOutput');
let url = `https://randomuser.me/api/`;
let urlParams = {
  genderAlias: '',
  results: '',
}
// Set default values for select and input elements after refresh
rangeOutput.innerHTML = `${range.value} users`;
defaultOpt.selected = 'selected';
defaultOpt.disabled = 'disabled';
// =============================================
//            Main functionality logic
// =============================================

function buildUrl(){
  let temp = url + "?" + Object.values(urlParams).join('&')
  return temp;
}

async function getUsersData(e){
  e.preventDefault();
   const res = await fetch(buildUrl());
   const data = await res.json();

  // render users to a table
   let tableHTML = '';
   data.results.forEach(user => {
      tableHTML += `
      <tr>
        <td>
          <img src="${user.picture.thumbnail}" alt="${user.name.first} ${user.name.last} avatar image" /></td>
        <td>${user.name.first} ${user.name.last}</td>
        <td><small>${user.gender === "female" ? "&#9792;" : "&#9794;"}</small></td>
        <td>${user.location.city}</td>
        <td>${user.email}</td>
        <td>${user.login.username}</td>
        <td>${user.login.password}</td>
        <td>${user.location.country}</td>
        <td>${user.dob.age}</td>
        <td>${new Date(user.dob.date).toLocaleString()}</td>
        <td>${user.cell}</td>
      </tr>
      `
   });
   tableOutput.innerHTML = tableHTML;
}
// =============================================
//            Event lesteneres
// =============================================


function handleGender(){
  if(this.value === 'all') {
    return urlParams.genderAlias = ``;
  }
  urlParams.genderAlias = `gender=${this.value}`
}
 function handleRange(){
   rangeOutput.innerHTML = `${this.value} users`;
   urlParams.results = `results=${this.value}`
  }

range.addEventListener('input', handleRange);
btn.addEventListener('click', getUsersData);
gender.addEventListener('change', handleGender);