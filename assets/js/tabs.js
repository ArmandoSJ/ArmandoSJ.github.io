/*==================== About Tabs ====================*/
const tabsContainer = document.querySelector(".about-tabs");
const aboutSection = document.querySelector(".about__section");

tabsContainer.addEventListener("click", (event) => {

  const clickedTab = event.target.closest(".tab-item");
  if (!clickedTab || clickedTab.classList.contains("active")) return;

  // Eliminar la clase "active" de la pestaña activa anterior
  tabsContainer.querySelector(".active").classList.remove("active");
  // Añadir la clase "active" a la pestaña clicada
  clickedTab.classList.add("active");

  // Obtener el objetivo de la pestaña clicada
  const target = clickedTab.getAttribute("data-target");
  // Ocultar la pestaña de contenido activa anterior
  aboutSection.querySelector(".tab-content.active").classList.remove("active");
  // Mostrar la nueva pestaña de contenido
  aboutSection.querySelector(target).classList.add("active");
});