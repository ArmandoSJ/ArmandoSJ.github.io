const tabsLanguage = document.querySelector(".language-tabs");

function changeLanguage(e) {
    if (e.target.classList.contains("tab-language")) {
        e.stopPropagation(); 
        const targetLanguage = e.target.getAttribute("data-target");
        setLanguage(targetLanguage);
        getTexts(targetLanguage);
        
        const previousActiveTab = tabsLanguage.querySelector(".active");
        if (previousActiveTab !== e.target) {
            previousActiveTab.classList.remove("active");
            e.target.classList.add("active");
        }
    }
}

function setLanguage(language) {
    localStorage.setItem("language", language);
}

function getLanguage() {
    return localStorage.getItem("language");
}

function setTexts(texts) {
    /* Home Texts */
    document.getElementById("title").textContent = texts["title"];
    document.getElementById("subtitle").textContent = texts["subtitle"];
    document.getElementById("description").textContent = texts["description"];
    document.getElementById("home").textContent = texts["menu"]["home"];
    document.getElementById("about").textContent = texts["menu"]["about"];
    document.getElementById("about-me-btn").textContent = texts["buttons"]["aboutme"];
    document.getElementById("download-btn").textContent = texts["buttons"]["cv"];

    /* About me Texts */
    document.getElementById("aboutme-title").textContent = texts["aboutme"]["aboutme-title"];
    document.getElementById("long-description").textContent = texts["aboutme"]["long-description"];
    document.getElementById("skills-title").textContent = texts["aboutme"]["skills-title"];
    document.querySelector(".education-desc").textContent = texts["aboutme"]["about-tabs"]["education"];
    document.querySelector(".experience-desc").textContent = texts["aboutme"]["about-tabs"]["experience"];
    displaySkills(texts["aboutme"]["skills"]);
    displayEducation(texts["aboutme"]["education"]);
    displayExperience(texts["aboutme"]["experience"]);
}

function displaySkills(skillsData){
    const skillDiv = document.querySelector(".skills");

    if(skillDiv.children.length === 0){
        const skills = Object.entries(skillsData);
        skills.forEach(([key, skill]) => {
            const skillItem = document.createElement("div");
            skillItem.classList.add("skill-item");
    
            skillItem.textContent = skill;
            
            skillDiv.appendChild(skillItem);
        });
    }
}

function displayEducation(educations) {
    const educationDiv = document.querySelector(".educationDiv");

    // Eliminar todos los elementos existentes en educationDiv para evitar duplicados
    educationDiv.innerHTML = '';

    educations.forEach(education => {
        const educationElement = document.createElement("div");
        educationElement.classList.add("timeline-item");

        const periodElement = document.createElement("span");
        periodElement.classList.add("date");
        periodElement.textContent = education.period;

        const gradeElement = document.createElement("h4");
        gradeElement.textContent = education.grade + " ";

        const schoolNameElement = document.createElement("span");
        schoolNameElement.textContent = education.schoolName;

        const schoolDescElement = document.createElement("p");
        schoolDescElement.textContent = education.schoolDesc;

        educationDiv.appendChild(educationElement);
        educationElement.appendChild(periodElement);
        gradeElement.appendChild(schoolNameElement);
        educationElement.appendChild(gradeElement);
        educationElement.appendChild(schoolDescElement);
    });
}

function displayExperience(experiences) {
    const experienceDiv = document.querySelector(".experienceDiv");

    experienceDiv.innerHTML = '';

    experiences.forEach(experience => {
        const experienceElement = document.createElement("div");
        experienceElement.classList.add("timeline-item");

        const periodElement = document.createElement("span");
        periodElement.classList.add("date");
        periodElement.textContent = experience.period;

        const carrerElement = document.createElement("h4");
        carrerElement.textContent = experience.carrer;

        const companyElement = document.createElement("span");
        companyElement.textContent = experience.company;

        const roleDescElement = document.createElement("p");
        roleDescElement.textContent = experience.roleDesc;

        experienceDiv.appendChild(experienceElement);
        experienceElement.appendChild(periodElement);
        carrerElement.appendChild(companyElement);
        experienceElement.appendChild(carrerElement);
        experienceElement.appendChild(roleDescElement);
    });
}

function getTexts(language) {
  fetch("texts.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Hubo un problema al obtener los datos.");
        }
        return response.json();
    })
    .then((data) => {
        const texts = data[language];
        setTexts(texts);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

// Función para actualizar la apariencia de los botones de idioma
function updateLanguageButtons(selectedButton) {
    const languageButtons = tabsLanguage.querySelectorAll(".tab-language");
    languageButtons.forEach(button => {
        button.classList.remove("active");
    });
    
    selectedButton.classList.add("active");
}


tabsLanguage.addEventListener("click", changeLanguage);

document.addEventListener("DOMContentLoaded", function() {
    let language = getLanguage();
    if (!language) {
        // Si el idioma no esta configurado por el usuario, usa el idioma predeterminado del navegador
        language = navigator.language.split("-")[0];
        // Si el idioma predeterminado no está disponible, usar 'es' como idioma predeterminado
        if (!['es', 'en'].includes(language)) {
        language = 'es';
        }
        setLanguage(language);
    }
    
    const tabLanguage = tabsLanguage.querySelector(`[data-target="${language}"]`);
    if (tabLanguage) {
        updateLanguageButtons(tabLanguage);
    }
    getTexts(language);
});