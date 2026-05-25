let currentPage = 0; 
const totalPages = 13;

const pagesContainer = document.getElementById('pagesContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');

function updateBookState() {
    const viewportWidth = document.querySelector('.book-viewport').clientWidth;
    pagesContainer.style.transform = `translateX(-${currentPage * viewportWidth}px)`;
    prevBtn.disabled = (currentPage === 0);
    nextBtn.disabled = (currentPage === totalPages - 1);
    const progressPercent = ((currentPage + 1) / totalPages) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function changePage(direction) {
    currentPage += direction;
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    updateBookState();
}

function goToPage(pageIndex) {
    currentPage = pageIndex;
    if (currentPage < 0) currentPage = 0;
    if (currentPage >= totalPages) currentPage = totalPages - 1;
    updateBookState();
}
prevBtn.addEventListener('click', () => changePage(-1));
nextBtn.addEventListener('click', () => changePage(1));
window.addEventListener('resize', updateBookState);
document.addEventListener("DOMContentLoaded", () => {
    updateBookState();
    const modelSelect = document.getElementById('modelSelect');
    const webViewer = document.getElementById('webViewer');

    if (modelSelect && webViewer) {
        modelSelect.addEventListener('change', (event) => {
            webViewer.setAttribute('src', event.target.value);
            const selectedText = modelSelect.options[modelSelect.selectedIndex].text;
            webViewer.setAttribute('alt', `Modelo 3D interactivo de: ${selectedText}`);
        });
    }
});
function checkAnswer(isCorrect, buttonElement) {
    const resultDiv = document.getElementById('quizResult');
    const buttons = document.querySelectorAll('.quiz-option-btn');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        buttonElement.style.backgroundColor = '#2ecc71'; 
        buttonElement.style.color = 'white';
        resultDiv.innerHTML = "<p style='color: #27ae60; font-weight: bold;'>¡Excelente! Respuesta correcta. La manipulación tridimensional facilita el mapeo mental de infraestructuras complejas.</p>";
    } else {
        buttonElement.style.backgroundColor = '#e74c3c'; 
        buttonElement.style.color = 'white';
        resultDiv.innerHTML = "<p style='color: #c0392b; font-weight: bold;'>Respuesta incorrecta. Recuerda que las TICs inmersivas potencian la memoria espacial sin sustituir los fundamentos teóricos.</p>";
    }
}