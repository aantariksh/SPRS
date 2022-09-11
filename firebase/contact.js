import { successMessage, failMessage } from './index.js';
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-database.js";

const db = getDatabase();
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formProps = new FormData(event.target);
  const formData = Object.fromEntries(formProps);
  submitContactForm(formData);
});

function submitContactForm(formData) {
  const date = new Date()
  const id = date.getTime()

  set(ref(db, `SPRS/contact/${id}`), {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
  }).then(successMessage)
  .catch(err => failMessage(err));
}
