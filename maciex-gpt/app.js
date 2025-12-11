const input = $("#msg");
const send = $("#send");
const box = $("#messages");
const current = $("#currentModel");
const list = $("#modelList");

const answers = [
  "Brzmi ciekawie",
  "Opowiedz coś więcej",
  "Rozumiem",
  "Okej już patrzę",
  "paradoksalnie to gownie dieta",
  "Jasne ziomek",
  "Haha dobre",
];

function addMessage(text, type) {
  const div = $("<div>")
    .addClass("msg " + type)
    .text(text);
  box.append(div);
  box.scrollTop(box[0].scrollHeight);
}

function ladowanie() {
  const wrap = $("<div>").addClass("msg bot");
  const load = $("<div>")
    .addClass("loading")
    .html("<div></div><div></div><div></div>");
  wrap.append(load);
  box.append(wrap);
  box.scrollTop(box[0].scrollHeight);
  return wrap;
}

function maciexgptReply() {
  const text = answers[Math.floor(Math.random() * answers.length)];
  setTimeout(() => addMessage(text, "bot"), 600);
}

function maciexgptMsg() {
  const text = input.val().trim();
  if (!text) return;
  addMessage(text, "user");
  input.val("");
  const loader = ladowanie();
  setTimeout(() => {
    loader.remove();
    maciexgptReply();
  }, 900);
}
// dodanie funkcjonalnosci entera zeby se dzialal i comboboxa z modelami
send.on("click", maciexgptMsg);

input.on("keydown", (e) => {
  if (e.key === "Enter") maciexgptMsg();
});

current.on("click", () => {
  list.toggle();
});

list.find("div").on("click", function () {
  const m = $(this).data("model");
  current.text(m);
  list.hide();
});
