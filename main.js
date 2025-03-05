// ! Ay Dizisi
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// !html den javascript e çekilen elemanlar
const addBox = document.querySelector(".add-box");
const popupBoxContainer = document.querySelector(".popup-box");
const popupBox = document.querySelector(".popup");
const closeBtn = document.querySelector("#close-btn");
const form = document.querySelector("form");
console.log(form);

// addBox elemanına tıklanınca popup ı aç

addBox.addEventListener("click", () => {
  // popupBoxContainer && popupBox ı görünür kılmak için  show class ekle
  popupBoxContainer.classList.add("show");
  popupBox.classList.add("show");
});
// body nin kaydırılmasını engellle
document.querySelector("body").style.overflow = "hidden";
// closeBtn e tıklanınca popup ı kapat

closeBtn.addEventListener("click", () => {
  // popupBoxContainer &&popupBox ekranından  show class ı gizlemek için show classını kaldır.
  popupBoxContainer.classList.remove("show");
  popupBox.classList.remove("show");
});
// body nin kaydırılmasını autoya çevir.
document.querySelector("body").style.overflow = "auto";

// formun gönderilmesini izle
form.addEventListener("submit", (e) => {
  // formun sayfa yenilemesini engelle
  e.preventDefault();
  // form içindeki input ve text area erişmek için
  const titleInput = e.target[0];
  const descriptionInput = e.target[1];
  // ınput ve text area  nın boşluklarına eriş ve başında -sonunda boşluk var ise bunu kaldır.
  // eğer inputlar boş bırakılmışsa uyarı ver
  let title = titleInput.value.trim();
  let description = descriptionInput.value.trim();

  console.log(title);
  console.log(description);
  //  eğer inputlar boş bırakılmışsa uyarı ver
  if (!title && !description) {
    alert("Formu eksiksiz doldurunuz!");
    return;
    // burada return kullanımı ile ıf bloüu çalıştıktan sonra kodun devam etmesini engelledik.
  }
  // tarih verisini oluştur.
  const date = new Date();
  // Gün, ay , id ve yıl değerleri oluştur.
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const id = date.getTime();

  // not verisini yönetmek için bir obje oluştur.
  let noteInfo = {
    id,
    title,
    description,
    date: "${month} ${day} ,${year}",
  };

  console.log(noteInfo);
});
