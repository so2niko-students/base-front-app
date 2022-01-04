// =============================================
//            Global variables
// =============================================
const gender = document.querySelector('#gender');
const defaultOpt = gender.querySelectorAll('option')[0];
const rangeOutput = document.querySelector('label[for="amount"]');
const range = document.querySelector('#amount');
const btn = document.querySelector('[type="submit"]');
const tableOutput = document.querySelector('#tableOutput');
const tableColumns = document.querySelectorAll('.sortable');
let url = `https://randomuser.me/api/`;
let urlParams = {
  genderAlias: '',
  results: `results=${range.value}`,
}
let results = '';
// Set default values for select and input elements after refresh
rangeOutput.innerHTML = `${range.value} users`;
defaultOpt.selected = 'selected';
defaultOpt.disabled = 'disabled';
// =============================================
//            Main functionality logic
// =============================================

function buildUrl(){
  let temp = url + "?" + Object.values(urlParams).join('&');
  return temp;
}

//  Sort columns alphabetic
function handleColumnsSorting(){
  let clmn = this.dataset.type;

  if(!results) return;

  if(clmn === 'name'){
    if(!this.classList.contains('sorted')) {
      this.classList.add('sorted');
      results.sort((a, b) => {
        let firstA = a.name.first;
        let firstB = b.name.first;

        if(firstA < firstB){
          return -1;
        }
        if(firstA > firstB){
          return 1;
        }
        return 0;
      });
      renderTable(results);
    } else {
      this.classList.remove('sorted');
      results.sort((a, b) => {
        let firstA = a.name.first;
        let firstB = b.name.first;

        if(firstA < firstB){
          return 1;
        }
        if(firstA > firstB){
          return -1;
        }
        return 0;
      });
      renderTable(results);
    }
  }
  if(clmn === 'gen'){
    if(!this.classList.contains('sorted')) {
      this.classList.add('sorted');
      results.sort((a, b) => {
        let firstA = a.gender;
        let firstB = b.gender;

        if(firstA < firstB){
          return -1;
        }
        if(firstA > firstB){
          return 1;
        }
        return 0;
      });
      renderTable(results);
    } else {
      this.classList.remove('sorted');
      results.sort((a, b) => {
        let firstA = a.gender;
        let firstB = b.gender;

        if(firstA < firstB){
          return 1;
        }
        if(firstA > firstB){
          return -1;
        }
        return 0;
      });
      renderTable(results);
    }
  }
  if(clmn === 'city'){
    if(!this.classList.contains('sorted')) {
      this.classList.add('sorted');
      results.sort((a, b) => {
        let firstA = a.location.city;
        let firstB = b.location.city;

        if(firstA < firstB){
          return -1;
        }
        if(firstA > firstB){
          return 1;
        }
        return 0;
      });
      renderTable(results);
    } else {
      this.classList.remove('sorted');
      results.sort((a, b) => {
        let firstA = a.location.city;
        let firstB = b.location.city;

        if(firstA < firstB){
          return 1;
        }
        if(firstA > firstB){
          return -1;
        }
        return 0;
      });
      renderTable(results);
    }
  }
  if(clmn === 'login'){
    if(!this.classList.contains('sorted')) {
      this.classList.add('sorted');
      results.sort((a, b) => {
        let firstA = a.login.username;
        let firstB = b.login.username;

        if(firstA < firstB){
          return -1;
        }
        if(firstA > firstB){
          return 1;
        }
        return 0;
      });
      renderTable(results);
    } else {
      this.classList.remove('sorted');
      results.sort((a, b) => {
        let firstA = a.login.username;
        let firstB = b.login.username;

        if(firstA < firstB){
          return 1;
        }
        if(firstA > firstB){
          return -1;
        }
        return 0;
      });
      renderTable(results);
    }
  }
}

function renderTable(arr){
  let tableHTML = '';
   arr.forEach(user => {
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

async function getUsersData(e){
  e.preventDefault();
   const res = await fetch(buildUrl());
   const data = await res.json();

   results = data.results;
  // render users to a table
   renderTable(results);
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
tableColumns.forEach(th => th.addEventListener('click', handleColumnsSorting));