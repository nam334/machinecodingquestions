// const cards = document.querySelectorAll(".card");
// const observer = new IntersectionObserver(
//   (entries, observer) => {
//     entries.forEach((entry) => {
//       console.log("enry is", entry);
//       if (entry.isIntersecting) {
//         entry.target.classList.add("show");
//         observer.unobserve(entry.target);
//       }
//     });
//   },
//   {
//     threshold: 0.2,
//   }
// );

// cards.forEach((card) => observer.observe(card));

const images = document.querySelectorAll("img[data-src]");

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.onload = () => img.classList.add("show");

        observer.unobserve(img);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

images.forEach((img) => observer.observe(img));
