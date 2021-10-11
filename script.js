"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false,
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document
    .querySelectorAll(".option")
    .forEach((option) => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;
  console.log("current feature", feature);

  // TODO: Toggle feature in "model"
  if (features[feature] === false) {
    features[feature] = true;
  } else {
    features[feature] = false;
  }

  // If feature is (now) turned on:
  // - mark target as chosen (add class "chosen")

  // - un-hide the feature-layer(s) in the #product-preview;

  // - create featureElement and append to #selected ul
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class!

  // Else - if the feature (became) turned off:
  // - no longer mark target as chosen

  // - hide the feature-layer(s) in the #product-preview
  // - find the existing featureElement in #selected ul
  // - create FLIP-animation to animate featureElement to img in target
  // - when animation is complete, remove featureElement from the DOM

  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);
    target.classList.add("chosen");
    document.querySelector(`[data-feature=${feature}`).classList.remove("hide");
    console.log("features all", features);
    document
      .querySelector("#selected ul")
      .appendChild(createFeatureElement(feature));
    createAnimation(feature);
    // TODO: More code
  } else {
    // feature removed
    target.classList.remove("chosen");
    console.log(`Feature ${feature} is turned off!`);
    document.querySelector(`[data-feature=${feature}`).classList.add("hide");
    console.log("features all", features);
    animateBack(feature);

    // TODO: More code
  }
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}

function createAnimation(feature) {
  const cap = document.querySelector(`li[data-feature=${feature}`);

  // TODO: Create FLIP animation

  const firstFrame = document
    .querySelector(`#options [data-feature=${feature}`)
    .getBoundingClientRect();
  console.log(firstFrame);

  const lastFrame = cap.getBoundingClientRect();
  console.log(lastFrame);

  const deltaX = firstFrame.left - lastFrame.left;
  const deltaY = firstFrame.top - lastFrame.top;
  const deltaWidth = firstFrame.width / lastFrame.width;
  const deltaHeight = firstFrame.height / lastFrame.height;

  cap.animate(
    [
      {
        transformOrigin: "top left",
        transform: `translateX(${deltaX}px) translateY(${deltaY}px)`,
      },
      { transformOrigin: "top left", transform: "none" },
    ],
    { duration: 1000, easing: "ease-in-out" }
  );
}

function animateBack(feature) {
  console.log("has been clicked");

  const cap = document.querySelector(`li[data-feature=${feature}`);
  const firstFrame = document
    .querySelector(`#options [data-feature=${feature}`)
    .getBoundingClientRect();
  console.log(firstFrame);

  const lastFrame = cap.getBoundingClientRect();
  console.log(lastFrame);

  const deltaX = firstFrame.left - lastFrame.left;
  const deltaY = firstFrame.top - lastFrame.top;
  const deltaWidth = firstFrame.width / lastFrame.width;
  const deltaHeight = firstFrame.height / lastFrame.height;

  let myAnimation = cap.animate(
    [
      {
        transformOrigin: "top left",
      },
      {
        transformOrigin: "top left",
        transform: `translateX(${deltaX}px) translateY(${deltaY}px)`,
        /*  transform: `translateX(${firstFrame.left}px) translateY(${firstFrame.top}px)` */
      },
    ],
    { duration: 1000, easing: "ease-in-out" }
  );
  myAnimation.onfinish = function () {
    cap.remove();
  };
}

/* function removeItem(feature) {
  document.querySelector(`li[data-feature=${feature}`).remove();
}
 */
