class FormValidator {
  constructor(form) {
    this.form = form;

    // Single Elements
    this.name = form.querySelector("#name");
    this.email = form.querySelector("#email");
    this.phone = form.querySelector("#phone")
    this.password = form.querySelector("#password");
    this.city = form.querySelector("#city");

    // Multiple Elements
    this.gender = form.querySelectorAll("input[name='gender']");
    this.subjects = form.querySelectorAll("input[name='subjects']");

    // Error Elements
    this.nameError = document.getElementById("nameError");
    this.emailError = document.getElementById("emailError");
    this.phoneError = document.getElementById("phoneError");
    this.passwordError = document.getElementById("passwordError");
    this.cityError = document.getElementById("cityError");
    this.genderError = document.getElementById("genderError");
    this.subjectsError = document.getElementById("subjectsError");

    // Event Listener on submit
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validateAll();
    });

    //  Real-time validation listeners
    this.name.addEventListener("input", () => this.validateName());
    this.email.addEventListener("input", () => this.validateEmail());
    this.phone.addEventListener("input", () => this.validatePhone());
    this.password.addEventListener("input", () => this.validatePassword());
  }

  validateName() {
    const pattern = /^[a-zA-Z .]{3,}$/;
    if (!pattern.test(this.name.value.trim())) {
      this.name.classList.add("invalid");
      this.nameError.style.display = "block";
      return false;
    } else {
      this.name.classList.remove("invalid");
      this.nameError.style.display = "none";
      return true;
    }
  }

  validateEmail() {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(this.email.value.trim())) {
      this.email.classList.add("invalid");
      this.emailError.style.display = "block";
      return false;
    } else {
      this.email.classList.remove("invalid");
      this.emailError.style.display = "none";
      return true;
    }
  }
  validatePhone() {
    const pattern = /^01[3-9]\d{8}$/;
    if (!pattern.test(this.phone.value.trim())) {
      this.phone.classList.add("invalid");
      this.phoneError.style.display = "block";
      return false;
    } else {
      this.phone.classList.remove("invalid");
      this.phoneError.style.display = "none";
      return true;
    }
  }

  validatePassword() {
    if (this.password.value.trim().length < 8) {
      this.password.classList.add("invalid");
      this.passwordError.style.display = "block";
      return false;
    } else {
      this.password.classList.remove("invalid");
      this.passwordError.style.display = "none";
      return true;
    }
  }

  validateCity() {
    if (this.city.value === "") {
      this.city.classList.add("invalid");
      this.cityError.style.display = "block";
      return false;
    } else {
      this.city.classList.remove("invalid");
      this.cityError.style.display = "none";
      return true;
    }
  }

  validateGender() {
    let checked = false;
    this.gender.forEach((g) => {
      if (g.checked) checked = true;
    });
    if (!checked) {
      this.genderError.style.display = "block";
      return false;
    } else {
      this.genderError.style.display = "none";
      return true;
    }
  }

  validateSubjects() {
    let checkedCount = 0;
    this.subjects.forEach((s) => {
      if (s.checked) checkedCount++;
    });
    if (checkedCount === 0) {
      this.subjectsError.style.display = "block";
      return false;
    } else {
      this.subjectsError.style.display = "none";
      return true;
    }
  }

  validateAll() {
    const isValid =
      this.validateName() &
      this.validateEmail() &
      this.validatePhone() &
      this.validatePassword() &
      this.validateCity() &
      this.validateGender() &
      this.validateSubjects();

    if (isValid) {
      let selectedGender = "";
      let selectedSubject = "";
      this.gender.forEach((g) => {
        if (g.checked) {
          selectedGender += g.value;
        }
      });
      this.subjects.forEach((s) => {
        if (s.checked) {
          selectedSubject += s.value + " ";
        }
      });

      const w = window.open("", "_blank", "width=400, height=600");
      w.document.write(`
            
             <html>
          <head>
            <title>Form Data</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; place-content:center; }
              h2 { color: #007bff;}
              div{
              margin-top: 20px;
              display:flex;flex-direction: column;gap:12px;
              }
              p { margin: 5px 0;}
              button{
              padding: 8px;
              }
            </style>
          </head>
          <body>
            <h2>Submitted Form Data</h2>
            <hr>
            <div>
            <p><strong>Name: </strong> ${this.name.value}</p>
            <p><strong>Email: </strong> ${this.email.value}</p>
            <p><strong>Phone: </strong> ${this.phone.value}</p>
            <p><strong>Password: </strong> ${this.password.value}</p>
            <p><strong>City: </strong> ${this.city.value}</p>
            <p><strong>Gender: </strong> ${selectedGender}</p>
            <p><strong>Subjects: </strong> ${selectedSubject}</p>
            <button onClick="self.close()">Close</button>
            <button onClick="print()">Print</button>
            </div>
          </body>
        </html>
            
            `);

      this.form.reset();
    }
  }
}

// Initialize after DOM load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form1");
  new FormValidator(form);
});
