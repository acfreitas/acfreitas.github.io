let currentDate = new Date();
const vaccines = {}; // Objeto para armazenar as vacinas registradas por data

function renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const daysContainer = document.getElementById("days");
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Limpa os dias existentes
    daysContainer.innerHTML = "";

    // Primeira data do mês
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const totalDays = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    // Adiciona espaços em branco para os dias anteriores
    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        daysContainer.appendChild(emptyCell);
    }

    // Adiciona os dias do mês
    for (let day = 1; day <= totalDays; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.textContent = day;

        // Destaque se houver uma vacina registrada nesse dia
        if (vaccines[`${year}-${month + 1}-${day}`]) {
            dayDiv.classList.add("vaccine-day");
        }

        // Adiciona evento de clique para registrar a vacina
        dayDiv.onclick = () => {
            const dateStr = `${year}-${month + 1}-${day}`;
            if (vaccines[dateStr]) {
                alert(`Vacinas registradas em ${dateStr}: ${vaccines[dateStr].join(", ")}`);
            } else {
                showRegisterModal(dateStr);
            }
        };

        daysContainer.appendChild(dayDiv);
    }
}

function showRegisterModal(date) {
    document.getElementById("registerModal").style.display = "block";
    document.getElementById("date").value = date; // Preenche a data no modal
}

function closeModal() {
    document.getElementById("registerModal").style.display = "none";
}

function registerVaccine(event) {
    event.preventDefault();
    const date = document.getElementById("date").value;
    const vaccine = document.getElementById("vaccine").value;

    if (!vaccines[date]) {
        vaccines[date] = [];
    }
    vaccines[date].push(vaccine);
    closeModal();
    renderCalendar(); // Atualiza o calendário
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Renderiza o calendário inicialmente
renderCalendar();
