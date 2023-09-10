const hamburgerBtn = document.querySelector(".hamburger-btn");
const navBtn = document.querySelector(".nav-btn");

let close = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="m13.99 10.012.84-.84M9.17 14.828l2.75-2.75M14.83 14.832l-5.66-5.66M4 6c-1.25 1.67-2 3.75-2 6 0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2c-1.43 0-2.8.3-4.03.85" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
let open = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M3 7h18M9.49 12H21M3 12h2.99M3 17h18" stroke="#000" stroke-width="1.5" stroke-linecap="round"></path></svg>`;

hamburgerBtn.innerHTML = open;

hamburgerBtn.addEventListener("click", () => {
  console.log(navBtn.style.display);
  if (navBtn.style.display === "none" || navBtn.style.display === "") {
    navBtn.style.display = "block";
    hamburgerBtn.innerHTML = close;
  } else {
    navBtn.style.display = "none";
    hamburgerBtn.innerHTML = open;
  }
});
