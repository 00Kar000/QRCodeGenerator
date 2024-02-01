const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const showSpinner = () => {
  return (document.getElementById("spinner").style.display = "block");
};

const hideSpinner = () => {
  return (document.getElementById("spinner").style.display = "none");
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const clearUI = () => {
  qr.innerHTML = "";
  const saveLink = document.getElementById("save-link");
  if (saveLink) saveLink.remove();
};

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 mx-auto my-5";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerText = "Save Image";
  document.getElementById("generated").appendChild(link);
};

const onGenerateSubmit = (e) => {
  clearUI();
  e.preventDefault();
  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (!url) {
    alert("Please enter a URL");
  } else {
    return (
      showSpinner(),
      setTimeout(() => {
        hideSpinner(),
          generateQRCode(url, size),
          setTimeout(() => {
            const saveUrl = qr.querySelector("img").src;
            createSaveBtn(saveUrl);
          }, 50);
      }, 1000)
    );
  }

  hideSpinner();
};

form.addEventListener("submit", onGenerateSubmit);
