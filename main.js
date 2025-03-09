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
const wrapper = document.querySelector(".wrapper");
const popupTitle = document.querySelector("header p");
const submitBtn = document.querySelector("#submit-btn");

// !localStorage dan note verilerini al.Eğer local storage da note yoksa bunun başlangıç
// !değerini boş dizi olarak ata

let notes = JSON.parse(localStorage.getItem("notes")) || [];
// günvellele işlemi için gereken değişkenler
let isUpdate = false;
let isdateId = null;

// sayfanın yüklenme anını izle

document.addEventListener("DOMContentLoaded", () => {
  // syfa yüklendiğinde notları render eden fonksiyonu çalıştır.

  renderNotes(notes);
});

// addBox elemanına tıklanınca popup ı aç

addBox.addEventListener("click", () => {
  // popupBoxContainer && popupBox ı görünür kılmak için  show class ekle
  popupBoxContainer.classList.add("show");
  popupBox.classList.add("show");

  // body nin kaydırılmasını engellle
  document.querySelector("body").style.overflow = "hidden";
});

// closeBtn e tıklanınca popup ı kapat

closeBtn.addEventListener("click", () => {
  // popupBoxContainer &&popupBox ekranından  show class ı gizlemek için show classını kaldır.
  popupBoxContainer.classList.remove("show");
  popupBox.classList.remove("show");

  // body nin kaydırılmasını autoya çevir.
  document.querySelector("body").style.overflow = "auto";

  // Eğer update işlemi yapılmaz ve popup kapatılırsa popup'ı eski haline çevir
  isUpdate = false;
  updateId = null;
  popupTitle.textContent = "New Note";
  submitBtn.textContent = "Add Note";

  // Formu resetle
  form.reset();
});

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

  if (isUpdate) {
    // Güncelleme yapılmak istenen notu notes dizisi içerisinden bul
    const findIndex = notes.findIndex((note) => note.id == updateId);

    // Index'i bilinen elemanı dizi elemanını güncelle

    notes[findIndex] = {
      title,
      description,
      id,
      date: `${month} ${day},${year}`,
    };

    // Güncelleme modunu kapat ve popup içerisindeki elemanları eskiye çevir
    isUpdate = false;
    updateId = null;
    popupTitle.textContent = "New Note";
    submitBtn.textContent = "Add Note";
  } else {
    // Not verisini yönetmek için bir obje oluştur.

    let noteInfo = {
      id,
      title,
      description,
      date: "${month} ${day} ,${year}",
    };

    // noteinfo yu note dizisine ekle
    notes.push(noteInfo);
  }

  // Local Storage e not dizisini ekle
  localStorage.setItem("notes", JSON.stringify(notes));
  // formu resetle
  form.reset();

  // popupBoxContainer &&popupBox ekranından  show class ı gizlemek için show classını kaldır.
  popupBoxContainer.classList.remove("show");
  popupBox.classList.remove("show");
  // body nin kaydırılmasını autoya çevir.
  document.querySelector("body").style.overflow = "auto";
  // notları render et
  renderNotes(notes);
});
// notları arayüze render edecke fonksiyon
function renderNotes(notes) {
  // !mevcut notları kaldır
  document.querySelectorAll(".note").forEach((li) => li.remove());

  // note dizisindeki her bir eleman için ndön

  notes.forEach((note) => {
    let noteEleman = `<li class="note" data-id='${note.id}'>
    <!-- Note Details -->
    <div class="details">
      <!-- Title && Description -->
      <p class="title">${note.title}</p>
      <p class="description">${note.description}</p>
    </div>
    <!-- Bottom -->
    <div class="bottom">
      <span>${note.date}</span>
      <div class="settings">
        <!-- Icon -->
        <i class="bx bx-dots-horizontal-rounded"></i>
        <!-- Menu -->
        <ul class="menu">
          <li class='editIcon'><i class="bx bx-edit"></i> Düzenle</li>
          <li class='deleteIcon'><i class="bx bx-trash-alt"></i> Sil</li>
        </ul>
      </div>
    </div>
  </li>`;

    // insertAdjacentHTML metodu bir elemanı bir html elemanına göre yerleştirmek için  kullanılır.Bu metot hangi konuma ekleme yapılacağı ve hangi elemanın ekleneceğini belirtmemizi ister.
    addBox.insertAdjacentHTML("afterend", noteEleman);
  });
}
// menu kısmının göeünürlüğünü ayarlayan fomksiyon

function showMenu(eleman) {
  // ! parentElement ==> Bir elemanın kapsayıcısına erişmek için kullanılır.
  // dışarıdan gelene elemanın kapsayıcısına show class ı ekle
  eleman.parentElement.classList.add("show");

  // eklenen show clasını üç nokta haricinde bir yere tıklanırsa kaldır.
  document.addEventListener("click", (e) => {
    // tıklanan eleman üç nokta (i etiketi )değilse yada kapsam dışına tıklandı ise

    if (e.target.tagName != "I" || e.target != eleman) {
      // Kapsam dışarısına tıklandıysa show classını kaldır
      eleman.parentElement.classList.remove("show");
    }
  });
}
// * Wrapper kısmındaki tıklanmaları izle

wrapper.addEventListener("click", (e) => {
  // eğer 3 nokta tıklandı ise,
  if (e.target.classList.contains("bx-dots-horizontal-rounded")) {
    // show menu fonksiyon çalıştır
    showMenu(e.target);
  }

  // eğer sil butonu tıklandı ise
  else if (e.target.classList.contains("deleteIcon")) {
    // kullanıcıdan silme ,şlemi için onay al
    const res = confirm("Bu notu silmek istediğinixe emin misiniz?");
    // eğer kullanıcı silme işini kabul etti ise
    if (res) {
      // parentElement ile rbir elemanın kapsam elemanına eriştik.Ama kapsam eleman sayısı arttıkça
      // bunu yapmamız zorlaşır.Bunun yerine closest metodunu kullanırız.
      // Bu metot belirtilen class yada id'ye göre en yakın elemana erişmek için kullanılır.

      // Tıklanılan elemanın kapsayıcısı olan note kartına eriş
      const note = e.target.closest(".note");

      // erişilen note kartının id sine eriş
      const notedId = parseInt(note.dataset.id);

      // ıd si bilinen note u note dizisinden kaldır.
      notes = notes.filter((note) => note.id != notedId);

      // local storage güncelle
      localStorage.setItem("notes", JSON.stringify(notes));
      // notları render et.
      renderNotes(notes);
    }
  }

  // eğer düzenle butonuna tıklandı ise
  else if (e.target.classList.contains("editIcon)")) {
    // tıknanan düzenle butonunun kapsayıcısı olan note elemanına eriş.
    const note = e.target.closest(".note");
    // erişilen notun ıd sine eriş
    const noteId = parseInt(note.dataset.id);
    // erişilen not dizisi içinde bul
    const foundedNote = notes.find((note) => note.id == noteId);

    // pop up ı güncelle moduna sok
    isUpdate = true;
    updateId = noteId;
    // pop up ı görünür kıl

    popupBoxContainer.classList.add("show");
    popupBox.classList.add("show");

    // popup içindeki input ve textareabtitle ve discription değerlerini ata
    form[0].value = foundedNote.title;
    form[1].value = foundedNote.description;

    // Popup içerisindeki title ve add buttonın içeriğini update moduna göre düzenle
    popupTitle.textContent = "Update Note";
    submitBtn.textContent = "Update";
  }
});
