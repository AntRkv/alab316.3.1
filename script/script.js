var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

// Select and cache the <main> element in a variable named mainEl.
let mainEl = document.querySelector("main");

// Set the background color of mainEl to the value stored in the --main-bg CSS custom property.
// Hint: Assign a string that uses the CSS var() function like this: 'var(--main-bg)'.
mainEl.style.backgroundColor = "var(--main-bg)";

//Setting background color using custom CSS properties

// Set the content of mainEl to <h1>DOM Manipulation</h1>. There are a variety of ways to do this; pick whichever one that you think works best in this situation.
mainEl.innerHTML = `<h1>DOM Manipulation</h1>`;

// Add a class of flex-ctr to mainEl.
// Hint: Use the Element.classList API.
mainEl.classList.add(`flex-ctr`);

// Select and cache the <nav id="top-menu"> element in a variable named topMenuEl.
let topMenuEl = document.getElementById(`top-menu`);

// Set the height of the topMenuEl element to be 100%.
topMenuEl.style.height = "100%";

// Set the background color of topMenuEl to the value stored in the --top-menu-bg CSS custom property.
topMenuEl.style.backgroundColor = `var(--top-menu-bg)`;

// Add a class of flex-around to topMenuEl.
topMenuEl.classList.add("flex-around");

// Iterate over the entire menuLinks array and for each "link" object:

menuLinks.forEach((element) => {
  let newLink = document.createElement("a");
  newLink.setAttribute("href", element.href);
  newLink.textContent = element.text;
  topMenuEl.append(newLink);
});

let subMenuEl = document.getElementById(`sub-menu`);

subMenuEl.style.height = "100%";

subMenuEl.style.backgroundColor = `var(--sub-menu-bg)`;

subMenuEl.classList.add("flex-around");

subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

let topMenuLinks = document.querySelectorAll("a");

topMenuEl.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.tagName !== "A") {
    return;
  }

  console.log(e.target.textContent);

  if (!e.target.classList.contains("active")) {
    topMenuLinks.forEach((link) => link.classList.remove("active"));
    e.target.classList.add("active");

    let clickedLink = null;
    menuLinks.forEach((link) => {
      if (link.text === e.target.textContent) {
        clickedLink = link;
      }
    });

    if (clickedLink && clickedLink.subLinks) {
      subMenuEl.style.top = "100%";
      buildSubmenu(clickedLink.subLinks);
    } else {
      subMenuEl.style.top = "0";
      subMenuEl.innerHTML = "";
    }
  } else {
    e.target.classList.remove("active");
    subMenuEl.style.top = "0";
    subMenuEl.innerHTML = "";
  }

  mainEl.innerHTML = `<h1>${e.target.textContent}</h1>`;

  if (e.target.textContent === "about") {
    mainEl.innerHTML = `<h1>About</h1>`;
  }


});

function buildSubmenu(subLinks) {
  subMenuEl.innerHTML = "";
  subLinks.forEach((link) => {
    const newLink = document.createElement("a");
    newLink.setAttribute("href", link.href);
    newLink.textContent = link.text;
    subMenuEl.appendChild(newLink);
  });
}
