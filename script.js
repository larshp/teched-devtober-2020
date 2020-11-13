console.dir(window.gitdata);

let currentSlide = 1;

function updateSlide() {
  console.dir("render " + currentSlide);
  const elements = document.getElementsByClassName("middle");
  for (const e of elements) {
    if (e.attributes.getNamedItem("slide").value === currentSlide + "") {
      e.classList.remove("hidden");
    } else {
      e.classList.add("hidden");
    }
  }
}

const s = new URL(window.location.href).searchParams.get("slide");
if (s) {
  currentSlide = s;
  document.addEventListener('DOMContentLoaded', updateSlide, false);
}

const minSlide = 1;
const maxSlide = 3;

function onKeyDown(event) {
  let update = false;
  if (event.which == 33) {
    currentSlide = Math.max(currentSlide - 1, minSlide);
    event.preventDefault();
    update = true;
  } else if (event.which == 34) {
    currentSlide = Math.min(currentSlide + 1, maxSlide);
    event.preventDefault();
    update = true;
  }

  if (update) {
    window.history.replaceState({}, "ignore title", window.location.origin + window.location.pathname + "?slide=" + currentSlide);
    updateSlide();
  }
}

document.addEventListener("keydown", onKeyDown);