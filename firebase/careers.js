import { successMessage, failMessage } from './index.js';
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-storage.js";

const db = getDatabase();
const storage = getStorage();
const careersForm = document.getElementById('careers-form');

careersForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formProps = new FormData(event.target);
  const formData = Object.fromEntries(formProps);
  submitCareersForm(formData);
});

function submitCareersForm(formData) {
  const date = new Date()
  const id = date.getTime()

  const input = document.getElementById('resume');
  const file = input.files[0];
  const fileName = `${id}.pdf`

  const uploadTask = uploadBytesResumable(
    storageRef(storage, `SPRS/${fileName}`),
    file
  );
  const dataRef = ref(db, `SPRS/careers/${id}`);

  uploadTask.on('state_changed',
    () => {}, // check progress
    failMessage, // error
    () => { // success
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        set(dataRef, {
          entryDateTime: date,
          ...formData,
          resume: downloadURL
        }).then(successMessage).catch(failMessage);
      });
    }
  );
}
