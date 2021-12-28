class DataList {
    constructor() {
        this.dataService = new DataService();
        this.addEventListeners();
    }


    async addEventListeners() {
        document.getElementById('form').addEventListener('submit', event =>
            this.genericSubmit(event));
    }

    async startData() {
        const data = await this.dataService.getData();
        this.renderData(data);
    }

    async genericSubmit(event) {
        const gender = document.querySelector('.menu__select');
        const count = document.querySelector('.menu__range');

        const data = await this.dataService.getData(gender.value, parseInt(count.value));

        this.renderData(data);

    }

    async renderData(data) {
        const tableData = document.querySelector('.table__tbody');

        let dataListDomStr = "";



        for (let item of data.results) {
            if (item.gender === 'male') {
                dataListDomStr += `<tr> 
            <td><img src="${item.picture.thumbnail}" alt="photo" > </td>
            <td> ${item.name.first} ${item.name.last}</td>
            <td> \u2642 </td>

            <td> ${item.location.city}</td>
            
            <td> ${item.email}</td>
            <td> ${item.login.username}</td>
            <td> ${item.login.password}</td>
            <td> ${item.nat}</td>
            <td> ${item.dob.age}</td>
            <td> ${item.dob.date}</td>
            <td> ${item.cell}</td>
        </tr>`;
            } else {
                dataListDomStr += `<tr> 
                <td><img src="${item.picture.thumbnail}" alt="photo" > </td>
                <td> ${item.name.first} ${item.name.last}</td>
                <td> \u2640 </td>
    
                <td> ${item.location.city}</td>
                
                <td> ${item.email}</td>
                <td> ${item.login.username}</td>
                <td> ${item.login.password}</td>
                <td> ${item.nat}</td>
                <td> ${item.dob.age}</td>
                <td> ${item.dob.date}</td>
                <td> ${item.cell}</td>
            </tr>`;
            }


        }
        tableData.innerHTML = dataListDomStr;

    }

}