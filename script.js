//Create you project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
  ];
// Use moviesList array for displaing the Name in the dropdown menu
const selectMovie = document.getElementById("selectMovie");
const movieNameEl = document.getElementById("movieName");
const moviePriceEl = document.getElementById("moviePrice");
const totalPriceEl = document.getElementById("totalPrice");
const selectedSeatsholder = document.getElementById("selectedSeatsholde");
const numberOfSeatEl = document.getElementById("numberOfSeat");
const proceedBtn = document.getElementById("proceedBtn");
const cancelBtn = document.getElementById("cancelBtn");
const seats = document.querySelectorAll("#seatCont .seat");
let currentMoviePrice = 7;
let selectedSeats = [];

moviesList.forEach((movie, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = movie.movieName;
  selectMovie.appendChild(option);
});
movieNameEl.textContent = "Flash";
moviePriceEl.textContent = "$ 7";

selectMovie.addEventListener("change", (e) => {
  const selectedMovie = moviesList[e.target.value];
  movieNameEl.textContent = selectedMovie.movieName;
  moviePriceEl.textContent = `$ ${selectedMovie.price}`;
  currentMoviePrice = selectedMovie.price;

  updateTotal();
});

seats.forEach((seat, index) => {
  if (!seat.classList.contains("occupied")) {
    seat.addEventListener("click", () => {
      if (seat.classList.contains("selected")) {
        seat.classList.remove("selected");
        selectedSeats = selectedSeats.filter(i => i !== index);
      } else {
        seat.classList.add("selected");
        selectedSeats.push(index);
      }
      updateSeatHolder();
      updateTotal();
    });
  }
});

function updateSeatHolder() {
  selectedSeatsHolder.innerHTML = "";

  if (selectedSeats.length === 0) {
    selectedSeatsHolder.innerHTML = `<span class="noSelected">No Seat Selected</span>`;
    numberOfSeatEl.textContent = 0;
    return;
    }
  selectedSeats.forEach((seatIndex) => {
    const span = document.createElement("span");
    span.textContent = `Seat ${seatIndex + 1} `;
    selectedSeatsHolder.appendChild(span);
  });

  numberOfSeatEl.textContent = selectedSeats.length;
}

function updateTotal() {
  totalPriceEl.textContent = `$ ${selectedSeats.length * currentMoviePrice}`;
}

proceedBtn.addEventListener("click", () => {
  if (selectedSeats.length === 0) {
    alert("Oops no seat Selected");
    return;
  }

  alert("Yayy! Your Seats have been booked");

  selectedSeats.forEach(index => {
    seats[index].classList.remove("selected");
    seats[index].classList.add("occupied");
  });

  resetSelection();
});
cancelBtn.addEventListener("click", () => {
  selectedSeats.forEach(index => {
    seats[index].classList.remove("selected");
  });

  resetSelection();
});
function resetSelection() {
  selectedSeats = [];
  selectedSeatsHolder.innerHTML = `<span class="noSelected">No Seat Selected</span>`;
  numberOfSeatEl.textContent = 0;
  totalPriceEl.textContent = "$ 0";
}