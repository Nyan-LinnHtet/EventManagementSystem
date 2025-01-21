document.getElementById('registerBtn').addEventListener('click', function() {
    
    document.getElementById('container').style.display = 'block';
    document.getElementById('loginSection').style.display = 'block';
    document.querySelector('.header-section').style.display = 'none';
    document.querySelector('.card-container').style.display = 'none';  
});

const validEmail = "user@example.com";
const validPassword = "12345";


function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === validEmail && password === validPassword) {
    alert("Login successful!");
    document.getElementById("loginSection").style.display = "none";
    document.getElementById("add-event-form").style.display = "block";
    document.getElementById("confirm-events-btn").style.display = "block";
    document.getElementById("deleteAllButton").style.display = "block";
    document.getElementById("footer").style.display = "none";
  } else {
    alert("Invalid email or password!");
  }
}


window.onload = function () {
    displaySavedEvents();
  };
  
  
  function addNewEvent() {
    const eventName = document.getElementById("eventName").value;
    const availableSeats = parseInt(document.getElementById("availableSeats").value, 10);
    const category = document.getElementById("category").value;
  
    if (!eventName || !availableSeats || !category) {
      alert("Please fill in all fields!");
      return;
    }
  
    
    const eventsData = JSON.parse(localStorage.getItem("eventsData")) || {};
  
    
    eventsData[eventName] = {
      seats: availableSeats,
      category,
    };
  
    
    localStorage.setItem("eventsData", JSON.stringify(eventsData));
  
    
    document.getElementById("eventName").value = "";
    document.getElementById("availableSeats").value = "";
    document.getElementById("category").value = "Theater";
  
    alert(`Event "${eventName}" added successfully!`);
    displaySavedEvents();
  }
  
  
  function displaySavedEvents() {
    const eventsData = JSON.parse(localStorage.getItem("eventsData")) || {};
  
    if (Object.keys(eventsData).length === 0) {
      return; 
    }
  
    const eventsHtml = `
      <h2>Available Events</h2>
        <div class="card-container">
            <div class="card">
                <h3>Theater</h3>
                <ul>
                    ${Object.keys(eventsData)
                    .filter((event) => eventsData[event].category === "Theater")
                    .map((event) => `
                        <li>${event} <br> Seats: ${eventsData[event].seats}
                        <button onclick="bookEvent('${event}')">Book Now</button>
                        </li>
                    `).join("")}
                </ul>
            </div>
            <div class="card">
                <h3>Cinema</h3>
                <ul>
                    ${Object.keys(eventsData)
                    .filter((event) => eventsData[event].category === "Cinema")
                    .map((event) => `
                        <li>${event} <br> Seats: ${eventsData[event].seats}
                        <button onclick="bookEvent('${event}')">Book Now</button>
                        </li>
                    `).join("")}
                </ul>
            </div>
            <div class="card">
                <h3>Exhibition</h3>
                <ul>
                    ${Object.keys(eventsData)
                    .filter((event) => eventsData[event].category === "Exhibition")
                    .map((event) => `
                        <li>${event} <br> Seats: ${eventsData[event].seats}
                        <button onclick="bookEvent('${event}')">Book Now</button>
                        </li>
                    `).join("")}
                </ul>
            </div>
      </div>
    `;
  
    const eventSection = document.querySelector(".main-events") || document.createElement("div");
    eventSection.className = "main-events";
    eventSection.innerHTML = eventsHtml;
  
    if (!document.querySelector(".main-events")) {
        document.getElementById("footer").style.display = "none";
      document.body.appendChild(eventSection);
    }
  }


  
  function deleteAllEvents() {
    document.getElementById("footer").style.display = "block";
    document.getElementById("footer").style.display = "block";
    if (confirm("Are you sure you want to delete all events?")) {
      localStorage.removeItem("eventsData"); 
      alert("All events have been deleted.");
      confirmEvents(); 
    }
  }
  
  
  function bookEvent(eventName) {
    const eventsData = JSON.parse(localStorage.getItem("eventsData")) || {};
  
    if (eventsData[eventName]) {
      if (eventsData[eventName].seats > 0) {
        eventsData[eventName].seats--;
        localStorage.setItem("eventsData", JSON.stringify(eventsData));
        alert(`You successfully booked: ${eventName}. Remaining seats: ${eventsData[eventName].seats}`);
      } else {
        alert(`Sorry, no seats available for: ${eventName}.`);
      }
    } else {
      alert(`Event not found: ${eventName}.`);
    }
  
    displaySavedEvents();
  }