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
let tharga = document.getElementById("tiket-harga");
let tpembayaran = document.getElementById("tiket-pembayaran");


submit.addEventListener("click", function (event) {
    if (nama.value == "" || tujuan.value == "" || jumlah.value == "" || no_telepon.value == "" || tanggal.value == "" || pembayaran.value == "") {
        alert("Mohon lengkapi data Anda");
        return;
    }
    else {
        event.preventDefault();
        tnama.innerHTML = `<b>Nama:</b> ${nama.value}`;
        ttujuan.innerHTML = `<b>Tujuan:</b> ${tujuan.value}`;
        tjumlah.innerHTML = `<b>Jumlah Tiket:</b> ${jumlah.value}`;
        tnotlp.innerHTML = `<b>No Telepon:</b> ${no_telepon.value}`;
        ttanggal.innerHTML = `<b>Tanggal:</b> ${new Date(tanggal.value).toLocaleDateString('id-ID')}`;
        let harga = 0;
        switch (tujuan.value) {
            case "Jakarta":
                harga = 100000;
                break;
            case "Bandung":
                harga = 120000;
                break;
            case "Surabaya":
                harga = 130000;
                break;
            case "Yogyakarta":
                harga = 140000;
                break;
            case "Semarang":
                harga = 150000;
                break;
        }
        tharga.innerHTML = `<b>Harga:</b> ${harga * jumlah.value}`;

        tpembayaran.innerHTML = `<b>Pembayaran:</b> ${pembayaran.value}`;

        document.getElementById("submit").scrollIntoView({ behavior: "smooth", block: "start" });
    }

});