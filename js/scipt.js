const generateButton = document.querySelector('.generate');
let select = document.querySelector('.select');
let arrayTh = document.querySelectorAll('th');


select.addEventListener('click', function () {
   if (select.value === '') select.classList.remove('select__error');
})
generateButton.addEventListener('click', function () {
   if (select.value === '') select.classList.add('select__error');
   else {
      let number = document.querySelector('.numout'); //number of users
      switch (select.value) {
         case 'All': {
            fetch(`https://randomuser.me/api/?results=${number.value}`)
               .then(response => response.json())
               .then(data => {
                  createTable(number, data);
               })
               .catch(rejected => {
                  console.log(rejected);
               });
            break;
         }
         case 'Male': {
            fetch(`https://randomuser.me/api/?results=${number.value}&gender=male`)
               .then(response => response.json())
               .then(data => {
                  createTable(number, data);
               })
               .catch(rejected => {
                  console.log(rejected);
               });
            break;
         }
         case 'Female': {
            fetch(`https://randomuser.me/api/?results=${number.value}&gender=female`)
               .then(response => response.json())
               .then(data => {
                  createTable(number, data);
               })
               .catch(rejected => {
                  console.log(rejected);
               });
            break;
         }
      }
   }
})

function createTable(number, data) {
   document.querySelector('.main').innerHTML = ''; //clear main content
   let table = document.createElement('table');
   let header = table.createTHead();
   header.innerHTML = `<tr><th>Picture</th><th class='sort name'>Name</th><th class='sort gender'>Gender</th>
                           <th class='sort city'>City</th><th>Email</th><th class='sort login'>Login</th>
                           <th>Password</th><th>Nat</th><th>Age</th><th>DoB</th><th>Cell</th>
                           </tr>`;
   let tablebody = table.createTBody();

   for (let i = 0; i < number.value; i++) {
      let tr = tablebody.insertRow(i); //add rows
      let short = data.results[i];
      let gender = short.gender;
      if (gender === 'female') gender = '♀';
      else gender = '♂';

      tr.innerHTML = `<td><img src='${short.picture.thumbnail}'></img>
            </td><td>${short.name.first + ' ' + short.name.last}</td>
            <td>${gender}</td><td>${short.location.city}</td><td>${short.email}</td>
            <td>${short.login.username}</td><td>${short.login.password}</td><td>${short.nat}</td>
            <td>${short.dob.age}</td><td>${short.dob.date}</td><td>${short.cell}</td>`;
   }
   document.querySelector('main').appendChild(table); //add a table filling

   [...document.querySelectorAll('.sort')].forEach(function (item) {
      item.addEventListener('click', function () {
         this.classList.toggle('active');
         if (this.classList.contains('active')) {
            switch (true) {
               case (this.classList.contains('name')): {
                  let sortedRows = sortRows(1);
                  table.append(...sortedRows);
                  break;
               }
               case (this.classList.contains('gender') && select.value === 'All'): {
                  let sortedRows = sortRows(2);
                  table.append(...sortedRows);
                  break;
               }
               case (this.classList.contains('city')): {
                  let sortedRows = sortRows(3);
                  table.append(...sortedRows);
                  break;
               }
               case (this.classList.contains('login')): {
                  let sortedRows = sortRows(5);
                  table.append(...sortedRows);
                  break;
               }
            }
         }
         else {
            switch (true) {
               case (this.classList.contains('name')): {
                  let reverseSortedRows = reverseSortRows(1);
                  table.append(...reverseSortedRows);
                  break;
               }
               case (this.classList.contains('gender') && select.value === 'All'): {
                  let reverseSortedRows = reverseSortRows(2);
                  table.append(...reverseSortedRows);
                  break;
               }
               case (this.classList.contains('city')): {
                  let reverseSortedRows = reverseSortRows(3);
                  table.append(...reverseSortedRows);
                  break;
               }
               case (this.classList.contains('login')): {
                  let reverseSortedRows = reverseSortRows(5);
                  table.append(...reverseSortedRows);
                  break;
               }
            }
         }

         function reverseSortRows(i) {
            return Array.from(table.rows).slice(1)
               .sort((rowA, rowB) => rowA.cells[i].innerHTML < rowB.cells[i].innerHTML ? 1 : -1);
         }

         function sortRows(i) {
            return Array.from(table.rows).slice(1)
               .sort((rowA, rowB) => rowA.cells[i].innerHTML > rowB.cells[i].innerHTML ? 1 : -1);
         }
      })
   })
}

