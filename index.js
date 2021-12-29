const generateBtn = document.querySelector('.generate_btn');
const selectGender = document.querySelector('.select_gender');
const range = document.querySelector('.range');

// range.addEventListener('change', function () {
//     return numberOfUsers = this.value
// });

generateBtn.addEventListener('click', generateTable);

function createTable(data) {

    document.querySelector('.main').innerHTML = '';

    let table = document.createElement('table');
    // table.classList.add('sortable'); Класс для работы библиотеки
    table.classList.add('table_sort');
    let tableHeader = table.createTHead();

    tableHeader.innerHTML = `<tr>
                                <th class="no-sort">Picture</th>
                                <th class="sort name">Name</th>
                                <th class="sort gender">Gander</th>
                                <th class="sort city">City</th>
                                <th class="no-sort">Email</th>
                                <th class="sort login">Login</th>
                                <th class="no-sort">Password</th>
                                <th class="no-sort">Nat</th>
                                <th class="no-sort">Age</th>
                                <th class="no-sort">DoB</th>
                                <th class="no-sort">Cell</th>
                            </tr>`

    let tableBody = table.createTBody(); 

    for(let i = 0; i < data.results.length; i++) {
        let row = tableBody.insertRow(i);
        let dataOfUser = data.results[i];
        let gender = dataOfUser.gender;
        if (gender === 'male') {
            gender = `<i class="fas fa-mars"></i>`
        } else {
            gender = `<i class="fas fa-venus"></i>`
        }

        row.innerHTML = `<td><img src="${dataOfUser.picture.thumbnail}" alt="Avatar"></td>
                        <td>${dataOfUser.name.first} ${dataOfUser.name.last}</td>
                        <td>${gender}</td>
                        <td>${dataOfUser.location.city}</td>
                        <td>${dataOfUser.email}</td>
                        <td>${dataOfUser.login.username}</td>
                        <td>${dataOfUser.login.password}</td>
                        <td>${dataOfUser.nat}</td>
                        <td>${dataOfUser.dob.age}</td>
                        <td>${dataOfUser.dob.date.slice(0, 10)}</td>
                        <td>${dataOfUser.cell}</td>` 
    }

    document.querySelector('.main').appendChild(table);

    sortRows();
}

function generateTable() {

    if (selectGender.value === 'Gender') {
        selectGender.classList.add('select_gender_error');
    }   else {
        selectGender.classList.remove('select_gender_error');
    }

    const numberOfUsers = document.querySelector('input').value;
 
    switch (selectGender.value) {
        case 'All': {
            fetch(`https://randomuser.me/api/?results=${numberOfUsers}`)
                .then(response => response.json())
                .then(data => createTable(data));
        }
            break;

        case 'Male': {
            fetch(`https://randomuser.me/api/?results=${numberOfUsers}&gender=male`)
                .then(response => response.json())
                .then(data => createTable(data));
        }
            break;
        
        case 'Female': {
            fetch(`https://randomuser.me/api/?results=${numberOfUsers}&gender=female`)
                .then(response => response.json())
                .then(data => createTable(data));
        }
            break;
    
        default:
            break;
    }
}

function sortRows() {
    const getSort = ({ target }) => {
        const order = (target.dataset.order = -(target.dataset.order || -1));
        const index = [...target.parentNode.cells].indexOf(target);
        const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
        const comparator = (index, order) => (a, b) => order * collator.compare(
            a.children[index].innerHTML,
            b.children[index].innerHTML
        );
        
        for(const tBody of target.closest('table').tBodies)
            tBody.append(...[...tBody.rows].sort(comparator(index, order)));

        for(const cell of target.parentNode.cells)
            cell.classList.toggle('sorted', cell === target);
    };
    
    document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));
}