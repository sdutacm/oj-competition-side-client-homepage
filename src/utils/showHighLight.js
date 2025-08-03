export function showHightLight(pre) {
    const highlightElements = document.querySelector(`.${pre}-highlight`);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("highlight-enter-active");
            } else {
                entry.target.classList.remove("highlight-enter-active");
            }
        });
    }, { threshold: 0 });

    if (highlightElements) {
        observer.observe(highlightElements);
    }
}