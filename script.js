const model1 = document.getElementById("cakeModel");
const model2 = document.getElementById("cakeModel2");
const titleBlock = document.getElementById("titleBlock");
const modelContainer = document.querySelector('.model-container');
const homepage = document.getElementById('homepage');

const baseScale = 0.6;
const minScale = baseScale;
const maxScale = baseScale * 1.2;
const maxCameraDistance = 100;

const morphStart = 0.25;
const morphEnd = 0.55;

function handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    const containerTop = modelContainer.offsetTop;
    const containerHeight = modelContainer.offsetHeight;

    let progress = (scrollTop - containerTop + windowHeight/2) / containerHeight;
    progress = Math.max(0, Math.min(1, progress));

    let opacity = 1 - Math.min(1, scrollTop / 200);
    titleBlock.style.opacity = opacity;

    const distance = 100 - (progress * maxCameraDistance);
    const rotation = progress * 360;
    model1.setAttribute("camera-orbit", `${rotation}deg 60deg ${distance}%`);
    model2.setAttribute("camera-orbit", `${rotation}deg 60deg ${distance}%`);

    let morphProgress = (progress - morphStart) / (morphEnd - morphStart);
    morphProgress = Math.max(0, Math.min(1, morphProgress));

    model1.style.opacity = 1 - morphProgress;
    model2.style.opacity = morphProgress;

    if (progress >= 1) {
        homepage.style.display = 'block';
    }
}

let ticking = false;
window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener("load", handleScroll);
window.addEventListener("resize", handleScroll);

handleScroll();
