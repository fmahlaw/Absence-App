// Select DOM elements
const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const absenceRequestForm = document.querySelector('#absence-request-form');
const employeeNameInput = document.querySelector('#employee-name');
const startDateInput = document.querySelector('#start-date');
const endDateInput = document.querySelector('#end-date');
const absenceRequestList = document.querySelector('#absence-request-list');

// Create AbsenceManager instance
const absenceManager = new AbsenceManager();

// Add event listeners
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  const user = absenceManager.getUser(username);
  if (user && user.password === password) {
    showAbsenceRequestForm();
  } else {
    alert('Invalid username or password');
  }
});

absenceRequestForm.addEventListener('submit', e => {
  e.preventDefault();
  const employeeName = employeeNameInput.value;
  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  absenceManager.addAbsenceRequest({
    id: absenceManager.getAbsenceRequests().length + 1,
    employeeName,
    startDate,
    endDate,
    status: 'Pending'
  });
  showAbsenceRequests();
});

// Helper functions
function showLoginForm() {
  loginForm.style.display = 'block';
  absenceRequestForm.style.display = 'none';
  absenceRequestList.style.display = 'none';
}

function showAbsenceRequestForm() {
  loginForm.style.display = 'none';
  absenceRequestForm.style.display = 'block';
  absenceRequestList.style.display = 'none';
}

function showAbsenceRequests() {
  loginForm.style.display = 'none';
  absenceRequestForm.style.display = 'none';
  absenceRequestList.style.display = 'block';

  // Clear absence request list
  while (absenceRequestList.firstChild) {
    absenceRequestList.removeChild(absenceRequestList.firstChild);
  }

  // Add absence requests to list
  const absenceRequests = absenceManager.getAbsenceRequests();
  absenceRequests.forEach(request => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${request.employeeName} - ${request.startDate.toDateString()} to ${request.endDate.toDateString()} - ${request.status}`;
    absenceRequestList.appendChild(listItem);
  });
}

// Show login form on page load
showLoginForm();
