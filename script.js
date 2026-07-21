// Data Mock Armada Bus
const BUS_DATA = [
    {
        id: 1,
        name: "Rosalia Indah",
        classType: "Executive",
        badge: "Favorite Penumpang",
        rating: "4.9 ★",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
        origin: "Surakarta (Solo)",
        destination: "Jakarta",
        deptTime: "07:30 WIB",
        arrTime: "16:00 WIB",
        duration: "8j 30m",
        price: 240000,
        features: ["AC Super", "Reclining Seat 2+2", "Port USB", "Snack & Air Mineral", "Toilet"],
        occupiedSeats: [3, 7, 8, 14, 15, 20]
    },
    {
        id: 2,
        name: "PO Haryanto",
        classType: "VIP Super",
        badge: "Tercepat via Tol Trans-Jawa",
        rating: "4.8 ★",
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
        origin: "Surakarta (Solo)",
        destination: "Jakarta",
        deptTime: "08:30 WIB",
        arrTime: "16:30 WIB",
        duration: "8j 00m",
        price: 270000,
        features: ["AC Super", "Leg Rest 2+2", "Makan Malam Gratis", "Port USB", "Toilet"],
        occupiedSeats: [1, 2, 5, 12, 18]
    },
    {
        id: 3,
        name: "Sudiro Tungga Jaya (STJ)",
        classType: "Sleeper Luxury",
        badge: "Kenyamanan Bintang 5",
        rating: "5.0 ★",
        image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80",
        origin: "Surakarta (Solo)",
        destination: "Jakarta",
        deptTime: "19:00 WIB",
        arrTime: "03:30 WIB",
        duration: "8j 30m",
        price: 380000,
        features: ["Sleeper Bed", "Bantal & Selimut", "Personal TV & Wifi", "Servis Makan", "Toilet"],
        occupiedSeats: [2, 4, 6, 10, 11]
    },
    {
        id: 4,
        name: "Sinar Jaya",
        classType: "Executive",
        badge: "Hemat & Nyaman",
        rating: "4.7 ★",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
        origin: "Surakarta (Solo)",
        destination: "Jakarta",
        deptTime: "13:00 WIB",
        arrTime: "21:30 WIB",
        duration: "8j 30m",
        price: 220000,
        features: ["AC", "Reclining Seat 2+2", "Port USB", "Toilet"],
        occupiedSeats: [9, 13, 17, 19]
    },
    {
        id: 5,
        name: "Juragan99 Trans",
        classType: "Sleeper Luxury",
        badge: "Premium Class",
        rating: "4.9 ★",
        image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80",
        origin: "Surakarta (Solo)",
        destination: "Bandung",
        deptTime: "20:00 WIB",
        arrTime: "05:00 WIB",
        duration: "9j 00m",
        price: 400000,
        features: ["Sleeper Capsule", "Coffee Machine", "Bantal & Selimut", "Wifi High-Speed", "Toilet"],
        occupiedSeats: [1, 3, 5]
    },
    {
        id: 6,
        name: "Efisiensi",
        classType: "VIP Super",
        badge: "Rute Jawa Tengah",
        rating: "4.8 ★",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
        origin: "Yogyakarta",
        destination: "Surabaya",
        deptTime: "09:00 WIB",
        arrTime: "15:00 WIB",
        duration: "6j 00m",
        price: 190000,
        features: ["AC", "Reclining Seat", "Snack Box", "Port USB"],
        occupiedSeats: [4, 8, 12]
    }
];

// App State
let currentFilteredBuses = [...BUS_DATA];
let selectedBus = null;
let selectedSeats = [];
let bookingState = {
    origin: "Surakarta (Solo)",
    destination: "Jakarta",
    date: new Date().toISOString().split('T')[0],
    passengersCount: 1,
    passengerName: "",
    passengerPhone: "",
    passengerNik: "",
    passengerEmail: "",
    paymentMethod: ""
};

// Formatting Helper
const formatRupiah = (num) => {
    return 'Rp ' + num.toLocaleString('id-ID');
};

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
    // Set default departure date input to today
    const dateInput = document.getElementById("depart-date");
    if (dateInput) {
        dateInput.value = bookingState.date;
        dateInput.min = new Date().toISOString().split('T')[0];
    }

    renderBusList(currentFilteredBuses);
    setupEventListeners();
});

// Render List Bus
function renderBusList(buses) {
    const container = document.getElementById("bus-grid-container");
    if (!container) return;

    if (buses.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 16px;">
                <i class="fa-solid fa-bus-slash" style="font-size: 3rem; color: #94a3b8; margin-bottom: 16px;"></i>
                <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Tidak Ada Armada Bus Ditemukan</h3>
                <p style="color: #64748b;">Coba ubah kriteria pencarian rute atau filter kelas bus Anda.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = buses.map(bus => `
        <div class="bus-card" data-bus-id="${bus.id}">
            <div class="bus-img-box">
                <img src="${bus.image}" alt="${bus.name}">
                <span class="bus-badge"><i class="fa-solid fa-star"></i> ${bus.badge}</span>
                <span class="bus-rating">${bus.rating}</span>
            </div>
            <div class="bus-details">
                <div class="bus-title-row">
                    <h3>${bus.name}</h3>
                    <span class="feature-tag" style="background-color: var(--primary-light); color: var(--primary-color); font-weight: 700;">${bus.classType}</span>
                </div>

                <div class="bus-route-time">
                    <div class="time-box">
                        <span>Berangkat</span>
                        <strong>${bus.deptTime}</strong>
                    </div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); text-align: center;">
                        <i class="fa-solid fa-arrow-right"></i>
                        <div>${bus.duration}</div>
                    </div>
                    <div class="time-box" style="text-align: right;">
                        <span>Tiba</span>
                        <strong>${bus.arrTime}</strong>
                    </div>
                </div>

                <div class="bus-features">
                    ${bus.features.map(f => `<span class="feature-tag"><i class="fa-solid fa-check"></i> ${f}</span>`).join('')}
                </div>

                <div class="bus-card-footer">
                    <div class="price-tag">
                        <small>Harga per kursi</small>
                        <strong class="text-price">${formatRupiah(bus.price)}</strong>
                    </div>
                    <button class="btn-select-seat" onclick="openSeatModal(${bus.id})">
                        Pilih Kursi <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    // Search Form Submit
    const searchForm = document.getElementById("bus-search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const origin = document.getElementById("origin").value;
            const destination = document.getElementById("destination").value;
            const date = document.getElementById("depart-date").value;
            const passengers = parseInt(document.getElementById("passengers").value);

            if (origin === destination) {
                alert("Kota asal dan kota tujuan tidak boleh sama!");
                return;
            }

            bookingState.origin = origin;
            bookingState.destination = destination;
            bookingState.date = date;
            bookingState.passengersCount = passengers;

            // Filter logic
            currentFilteredBuses = BUS_DATA.filter(bus => 
                (bus.origin === origin && bus.destination === destination) ||
                (!origin && !destination)
            );

            // Update result subtitle
            const subtitle = document.getElementById("search-result-subtitle");
            if (subtitle) {
                subtitle.textContent = `Menampilkan rute ${origin} → ${destination} (${currentFilteredBuses.length} Armada tersedia)`;
            }

            renderBusList(currentFilteredBuses);
            
            // Scroll to bus list
            document.getElementById("schedule-section").scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Swap Cities Button
    const btnSwap = document.getElementById("btn-swap-cities");
    if (btnSwap) {
        btnSwap.addEventListener("click", () => {
            const originSelect = document.getElementById("origin");
            const destSelect = document.getElementById("destination");
            const temp = originSelect.value;
            originSelect.value = destSelect.value;
            destSelect.value = temp;
        });
    }

    // Filter Tabs
    const filterTabs = document.querySelectorAll(".filter-tabs .tab-btn");
    filterTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            filterTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const filterValue = tab.getAttribute("data-filter");
            if (filterValue === "all") {
                renderBusList(currentFilteredBuses);
            } else {
                const filtered = currentFilteredBuses.filter(b => b.classType === filterValue);
                renderBusList(filtered);
            }
        });
    });

    // Close Modal Controls
    document.getElementById("close-seat-modal")?.addEventListener("click", closeSeatModal);
    document.getElementById("btn-cancel-seat")?.addEventListener("click", closeSeatModal);
    document.getElementById("close-passenger-modal")?.addEventListener("click", closePassengerModal);
    document.getElementById("btn-back-to-seat")?.addEventListener("click", () => {
        closePassengerModal();
        openSeatModal(selectedBus.id);
    });
    document.getElementById("close-ticket-modal")?.addEventListener("click", closeTicketModal);
    document.getElementById("btn-finish-booking")?.addEventListener("click", closeTicketModal);

    // Confirm Seats Button -> Open Passenger Modal
    document.getElementById("btn-confirm-seats")?.addEventListener("click", () => {
        if (selectedSeats.length === 0) return;
        closeSeatModal();
        openPassengerModal();
    });

    // Passenger Form Submit
    const passengerForm = document.getElementById("passenger-form");
    if (passengerForm) {
        passengerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            bookingState.passengerName = document.getElementById("p-name").value;
            bookingState.passengerPhone = document.getElementById("p-phone").value;
            bookingState.passengerNik = document.getElementById("p-nik").value;
            bookingState.passengerEmail = document.getElementById("p-email").value;
            bookingState.paymentMethod = document.getElementById("p-payment").value;

            closePassengerModal();
            openTicketModal();
        });
    }

    // Cek tiket button nav
    document.getElementById("btn-check-my-ticket")?.addEventListener("click", (e) => {
        e.preventDefault();
        if (bookingState.passengerName) {
            openTicketModal();
        } else {
            alert("Belum ada pemesanan tiket aktif. Silakan pilih armada bus dan pesan tiket lebih dulu.");
        }
    });
}

// Open Seat Selection Modal
window.openSeatModal = function(busId) {
    selectedBus = BUS_DATA.find(b => b.id === busId);
    if (!selectedBus) return;

    selectedSeats = [];
    document.getElementById("modal-bus-title").textContent = `Pilih Kursi - ${selectedBus.name}`;
    document.getElementById("modal-bus-subtitle").textContent = `${selectedBus.classType} • ${selectedBus.deptTime}`;
    
    renderSeatGrid(selectedBus);
    updateSeatSummary();

    const modal = document.getElementById("seat-modal");
    if (modal) modal.classList.add("show");
};

function closeSeatModal() {
    const modal = document.getElementById("seat-modal");
    if (modal) modal.classList.remove("show");
}

// Render Seat Grid (20 seats total, layout 2+2 with aisle)
function renderSeatGrid(bus) {
    const grid = document.getElementById("seat-grid-map");
    if (!grid) return;

    let html = "";
    const totalSeats = 20;

    for (let i = 1; i <= totalSeats; i++) {
        const isOccupied = bus.occupiedSeats.includes(i);
        const isSelected = selectedSeats.includes(i);

        let statusClass = "available";
        if (isOccupied) statusClass = "occupied";
        else if (isSelected) statusClass = "selected";

        html += `
            <div class="seat-item ${statusClass}" onclick="toggleSelectSeat(${i})">
                ${i}
            </div>
        `;

        // Add middle aisle after every 2 seats
        if (i % 2 === 0 && i % 4 !== 0) {
            html += `<div class="seat-aisle"></div>`;
        }
    }

    grid.innerHTML = html;
}

// Toggle Seat Selection
window.toggleSelectSeat = function(seatNo) {
    if (!selectedBus) return;
    if (selectedBus.occupiedSeats.includes(seatNo)) return; // occupied

    const index = selectedSeats.indexOf(seatNo);
    if (index > -1) {
        selectedSeats.splice(index, 1);
    } else {
        selectedSeats.push(seatNo);
    }

    renderSeatGrid(selectedBus);
    updateSeatSummary();
};

function updateSeatSummary() {
    const seatsListEl = document.getElementById("selected-seats-list");
    const totalPriceEl = document.getElementById("total-seat-price");
    const confirmBtn = document.getElementById("btn-confirm-seats");

    if (selectedSeats.length === 0) {
        seatsListEl.textContent = "-";
        totalPriceEl.textContent = "Rp 0";
        if (confirmBtn) confirmBtn.disabled = true;
    } else {
        selectedSeats.sort((a, b) => a - b);
        seatsListEl.textContent = selectedSeats.join(", ");
        const total = selectedSeats.length * selectedBus.price;
        totalPriceEl.textContent = formatRupiah(total);
        if (confirmBtn) confirmBtn.disabled = false;
    }
}

// Open Passenger Modal
function openPassengerModal() {
    document.getElementById("summary-bus-name").textContent = selectedBus.name;
    document.getElementById("summary-route").textContent = `${bookingState.origin} → ${bookingState.destination}`;
    document.getElementById("summary-seats").textContent = selectedSeats.join(", ");

    const modal = document.getElementById("passenger-modal");
    if (modal) modal.classList.add("show");
}

function closePassengerModal() {
    const modal = document.getElementById("passenger-modal");
    if (modal) modal.classList.remove("show");
}

// Open Ticket Modal (E-Ticket final)
function openTicketModal() {
    const bookingCode = 'TKT-' + Math.floor(100000 + Math.random() * 900000);
    
    document.getElementById("ticket-booking-code").textContent = bookingCode;
    document.getElementById("ticket-origin").textContent = bookingState.origin;
    document.getElementById("ticket-destination").textContent = bookingState.destination;
    document.getElementById("ticket-dept-time").textContent = selectedBus ? selectedBus.deptTime : "08:00 WIB";
    document.getElementById("ticket-arr-time").textContent = selectedBus ? selectedBus.arrTime : "16:30 WIB";
    document.getElementById("ticket-bus-name").textContent = selectedBus ? `${selectedBus.name} (${selectedBus.classType})` : "Rosalia Indah";
    
    // Format date readable
    const d = new Date(bookingState.date);
    const dateFormatted = d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById("ticket-date").textContent = dateFormatted;

    document.getElementById("ticket-passenger-name").textContent = bookingState.passengerName || "Budi Santoso";
    document.getElementById("ticket-seat-numbers").textContent = selectedSeats.length > 0 ? selectedSeats.join(", ") : "12, 13";
    document.getElementById("ticket-payment-method").textContent = bookingState.paymentMethod || "QRIS / e-Wallet";

    const totalCost = selectedSeats.length * (selectedBus ? selectedBus.price : 250000);
    document.getElementById("ticket-total-price").textContent = formatRupiah(totalCost);

    const modal = document.getElementById("ticket-modal");
    if (modal) modal.classList.add("show");
}

function closeTicketModal() {
    const modal = document.getElementById("ticket-modal");
    if (modal) modal.classList.remove("show");
}