let submit = document.getElementById("submit");
let nama = document.getElementById("nama");
let tujuan = document.getElementById("tujuan");
let jumlah = document.getElementById("jumlah");
let no_telepon = document.getElementById("no-telepon");
let tanggal = document.getElementById("tanggal");
let pembayaran = document.getElementById("pembayaran")


submit.addEventListener("click", function () {
    alert(`${nama.value} telah memesan ${jumlah.value} tiket ke ${tujuan.value} pada tanggal ${tanggal.value} dengan nomor telepon ${no_telepon.value} melalui pembayaran ${pembayaran.value}`);
});