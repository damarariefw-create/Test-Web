let submit = document.getElementById("submit");
let nama = document.getElementById("nama");
let tujuan = document.getElementById("tujuan");
let jumlah = document.getElementById("jumlah");
let no_telepon = document.getElementById("no-telepon");
let tanggal = document.getElementById("tanggal");
let pembayaran = document.getElementById("pembayaran")

let tnama = document.getElementById("tiket-nama");
let ttujuan = document.getElementById("tiket-tujuan");
let tjumlah = document.getElementById("tiket-jumlah");
let tnotlp = document.getElementById("tiket-notlp");
let ttanggal = document.getElementById("tiket-tanggal");
let tpembayaran = document.getElementById("tiket-pembayaran");


submit.addEventListener("click", function (event) {
    event.preventDefault();
    tnama.innerHTML = `<b>Nama:</b> ${nama.value}`;
    ttujuan.innerHTML = `<b>Tujuan:</b> ${tujuan.value}`;
    tjumlah.innerHTML = `<b>Jumlah Tiket:</b> ${jumlah.value}`;
    tnotlp.innerHTML = `<b>No Telepon:</b> ${no_telepon.value}`;
    ttanggal.innerHTML = `<b>Tanggal:</b> ${new Date(tanggal.value).toLocaleDateString('id-ID')}`;
    tpembayaran.innerHTML = `<b>Pembayaran:</b> ${pembayaran.value}`;

});