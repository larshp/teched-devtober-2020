let currentSlide = 1;

function removeGrey() {
  const elements = document.getElementsByClassName("grey");
  if (elements.length > 0) {
    elements.item(0).classList.remove("grey");
    setTimeout(removeGrey, 100);
  }
}

function updateSlide() {
  for (const e of document.getElementsByClassName("middle")) {
    if (e.attributes.getNamedItem("slide").value === currentSlide + "") {
      e.classList.remove("hidden");
    } else {
      e.classList.add("hidden");
    }
  }
  if (currentSlide === 3) {
    removeGrey();
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

function background() {
  const columns = 7;
  const rows = 15;

  const height = Math.floor(document.documentElement.clientHeight / rows);
  const width = Math.floor(document.documentElement.clientWidth / columns);

  const topMargin = (document.documentElement.clientHeight - (height * rows))/2;

  const div = document.getElementById("background");
  div.innerHTML = "";

  let data = window.gitdata.slice();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const left = c * width + 2;
      const top = r * height + topMargin;
      const font = height - 20;
      const name = data.pop();

      const cell = `<div class="background" style="z-index: -${r}; font-size: ${font}px; top: ${top}px; left: ${left}px; height: ${height}px; width: ${width}px;">
      <img src="./users/${name}.png?size=64" class="grey" height="${height-4}px" width="${height-4}px">
      ${name}
      </div>`;
      div.innerHTML = div.innerHTML + cell;
    }
  }
}

document.addEventListener('DOMContentLoaded', background, false);

var doit;
window.addEventListener('resize', function() {
  clearTimeout(doit);
  doit = setTimeout(background, 300);
});