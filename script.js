//VARIABLES
const gender = document.querySelector('#gender');
const users = document.querySelector('#users');
const usersLabel = document.querySelector('#usersLabel');
const myBtn = document.querySelector('#myBtn');
const outputBody = document.querySelector('#output');
let url = `https://randomuser.me/api/`;
let urlVal = {
    usersVal : '?results=1',
    genderVal: ''
}
//EVENTS
myBtn.addEventListener('click', getData);
users.addEventListener('change', getUsers);
gender.addEventListener('change', getGender);
document.querySelector('#sortName').onclick = function(){sortTable(1)};
document.querySelector('#sortGender').onclick = function(){sortTable(2)};
document.querySelector('#sortCity').onclick = function(){sortTable(3)};
document.querySelector('#sortLogin').onclick = function(){sortTable(5)};


//USERS FUNCTION
usersLabel.innerHTML = `1 user`;
function getUsers() {
   urlVal.usersVal = `?results=${this.value}`;
   usersLabel.innerHTML = `${users.value} users`;
}

//GENDER FUNCTION
function getGender() {
   urlVal.genderVal = `&gender=${this.value}`;
}

//URL FUNCTION
function getUrl(){
    let newUrl = url + urlVal.usersVal + urlVal.genderVal;
    //console.log(newUrl);
    return newUrl;
}

//GET FUNCTION 'https://randomuser.me/api/?results=50'
async function getData (){
    const resp = await fetch(getUrl());
    const data = await resp.json();
        //console.log(data);
        let output =``;
        data.results.map(function(lists) {
            output += `
              <tr>
              <td><img src="${lists.picture.thumbnail}"></td>
              <td>${lists.name.first} ${lists.name.last}</td>
              <td>${lists.gender === "male" ? "&#9794;" : "&#9792;"}</td>
              <td>${lists.location.city}</td>
              <td>${lists.email}</td>
              <td>${lists.login.username}</td>
              <td>${lists.login.password}</td>
              <td>${lists.nat}</td>
              <td>${lists.dob.age}</td>
              <td>${lists.dob.date}</td>
              <td>${lists.cell}</td>
              </tr>
          `;
        });   
        outputBody.innerHTML = output;
    };

//SORT FUNCTION
function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.querySelector('#myTable');
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].querySelectorAll('td')[n];
        y = rows[i + 1].querySelectorAll('td')[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
