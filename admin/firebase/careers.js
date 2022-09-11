import { } from './index.js';
import { getDatabase, child, get, ref } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const dbRef = ref(getDatabase());
const contactTable = document.getElementById('careers-table');

get(child(dbRef, `SPRS/careers`)).then((snapshot) => {
  if (snapshot.exists()) {
    displayData(snapshot.val())
  } else {
    displayMessage("No data available");
  }
}).catch((error) => {
  displayMessage(error);
});

function displayData(data) {
  let tableValues = ''
  const ids = Object.keys(data)
  ids.forEach(id => {
    const row = data[id]
    tableValues += `
      <tr class="text-center">
        <td> ${row.firstName} ${row.lastName} </td>
        <td> ${row.email} </td>
        <td> ${row.phone} </td>
        <td> ${row.gender} </td>
        <td> ${row.position} </td>
        <td> ${row.dob} </td>
        <td> ${row.qualification} </td>
        <td> ${row.portfolio} </td>
        <td> ${row.lastCompany} </td>
        <td> ${row.expYears || 0}, ${row.expMonths || 0} </td>
        <td>
          <a class="btn btn-primary" href="${row.resume}" target="_blank">Link</a>
        </td>
        <td> ${row.message} </td>
      </tr>`
  });

  contactTable.innerHTML = tableValues;
}

function displayMessage(msg) {
  contactTable.innerHTML = `
    <tr>
      <td colspan="5" class="text-center">
        ${msg}
      </td>
    </tr>`
}
