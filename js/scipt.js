const generateButton = document.querySelector('.generate');
const select = document.querySelector('.select');
const arrayTh = document.querySelectorAll('th');
const form = document.querySelector('form');
const input = document.querySelector('.range')
const output = document.querySelector('.numout')
let selectValue;

form.addEventListener('submit', () => false);
form.addEventListener('input', () => output.value = +input.value);

select.addEventListener('click', function () {
   select.classList.remove('select__error');
})

generateButton.addEventListener('click', function () {
   selectValue = select.value;
   const selectGender = select.value;
   if (selectGender === '') {
      select.classList.add('select__error');
      return;
   }

   let url = `https://randomuser.me/api/?results=${output.value}`;

   switch (selectGender) {
      case 'Male': {
         url = `${url}&gender=male`;
         break;
      }
      case 'Female': {
         url = `${url}&gender=female`;
         break;
      }
   }

   fetch(url)
      .then(response => response.json())
      .then(data => {
         createTable(output, data);
      })
      .catch(rejected => {
         console.log(rejected);
      });

});

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
      const gender = short.gender === 'female' ? '♀' : '♂';

      tr.innerHTML = `<td><img src='${short.picture.thumbnail}'></img>
            </td><td>${short.name.first + ' ' + short.name.last}</td>
            <td>${gender}</td><td>${short.location.city}</td><td>${short.email}</td>
            <td>${short.login.username}</td><td>${short.login.password}</td><td>${short.nat}</td>
            <td>${short.dob.age}</td><td>${short.dob.date}</td><td>${short.cell}</td>`;
   }

   document.querySelector('main').appendChild(table); //add a table filling

   [...document.querySelectorAll('.sort')].forEach(function (item) { //add sort listeners
      item.addEventListener('click', tableSortFunc);
   });

   function tableSortFunc() {
      if (this.classList.contains('gender') && selectValue !== 'All') {
         return;
      }
      this.classList.toggle('active');

      const direction = this.classList.contains('active') ? 1 : -1;
      let pref = 0;

      switch (true) {
         case (this.classList.contains('name')): {
            pref = 1;
            break;
         }
         case (this.classList.contains('gender') && selectValue === 'All'): {
            pref = 2;
            break;
         }
         case (this.classList.contains('city')): {
            pref = 3;
            break;
         }
         case (this.classList.contains('login')): {
            pref = 5;
            break;
         }
      }

      /*  const classesCount = {
          name: 1,
          gender: 2,
          city: 3,
          login: 5
       };

      const className = this.className.replace('sort', '').replace('active', '').trim();
      pref = classesCount[className] */
      let sortedRows = sortRows(pref, direction);
      table.append(...sortedRows);

      function sortRows(i, direction = 1) {
         return Array.from(table.rows).slice(1)
            .sort((rowA, rowB) => direction * (rowA.cells[i].innerHTML > rowB.cells[i].innerHTML ? 1 : -1));
      }
   };
}
