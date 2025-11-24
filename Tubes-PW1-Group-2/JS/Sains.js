const questions = [
    {
        q: "1) Perubahan wujud dari cair menjadi gas disebut?",
        choices: ["A) Evaporasi", "B) Sublimasi", "C) Kondensasi"],
        correct: 0
    },
    {
        q: "2) Energi yang tersimpan pada benda karena ketinggiannya disebut energi __?",
        choices: ["A) Kinetik", "B) Potensial Gravitasi", "C) Massa"],
        correct: 1
    },
    {
        q: "3) Planet yang memiliki ukuran paling besar di tata surya adalah…?",
        choices: ["A) Bumi", "B) Saturnus", "C) Jupiter"],
        correct: 2
    },
    {
        q: "4) Alat untuk mengukur kuat arus listrik adalah… ?",
        choices: ["A) Voltmeter", "B) Amperemeter", "C) Termometer"],
        correct: 1
    },
    {
        q: "5) Zat penyusun terkecil dari suatu unsur disebut?",
        choices: ["A) Atom", "B) Molekul", "C) Proton"],
        correct: 0
    }
];

let idx = 0;
const answers = new Array(questions.length).fill(null);

const qNumber = document.getElementById("q-number");
const qText = document.getElementById("q-text");
const optionsWrap = document.getElementById("options");
const progressPill = document.getElementById("progress-pill");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resultWrap = document.getElementById("result-wrap");

function render() {
    const curr = questions[idx];

    qNumber.textContent = `Soal ${idx + 1}`;
    qText.textContent = curr.q;
    progressPill.textContent = `${idx + 1}/${questions.length} Soal`;

    optionsWrap.innerHTML = "";

    curr.choices.forEach((c, i) => {
        const id = `opt-${idx}-${i}`;

        const wrapper = document.createElement("label");
        wrapper.className = "option";
        wrapper.innerHTML = `
            <input type="radio" name="choice" id="${id}" value="${i}">
            <div>${c}</div>
        `;

        const input = wrapper.querySelector("input");


        if (answers[idx] === i) input.checked = true;


        input.addEventListener("change", () => {
            answers[idx] = i;
            nextBtn.disabled = false;
        });

        optionsWrap.appendChild(wrapper);
    });


    prevBtn.disabled = idx === 0;

    if (idx === questions.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }

    nextBtn.disabled = answers[idx] === null;
}

prevBtn.addEventListener("click", () => {
    if (idx > 0) idx--;
    render();
});

nextBtn.addEventListener("click", () => {
    if (answers[idx] === null) {
        alert("Pilih jawaban dulu ya ");
        return;
    }
    idx++;
    render();
});

submitBtn.addEventListener("click", () => {
    let score = 0;
    let details = "";

    questions.forEach((q, i) => {
        const correct = q.correct;
        const your = answers[i];

        if (your === correct) score++;

        details += `
        <div style="margin-top:6px">
            Soal ${i + 1}: Jawabanmu <strong>${your === null ? "—" : q.choices[your]}</strong> —
            Jawaban Benar: <strong>${q.choices[correct]}</strong>
            ${your === correct ? "✅" : "❌"}
        </div>
        `;
    });

    resultWrap.innerHTML = `
        <div class="result">
            <strong>Hasil: ${score} / ${questions.length}</strong>
            <div>${details}</div>
        </div>
    `;

    prevBtn.disabled = true;
    nextBtn.disabled = true;
    submitBtn.disabled = true;
});

document.getElementById("report-btn").addEventListener("click", () => {
    alert("Laporan soal terkirim!");
    
});

document.getElementById("goto").addEventListener("click", () => {
    window.location.href = "../Page1.html";
});

render();
