const linkTemplate = document.querySelector("#link_temp");
const profileLinks = document.querySelector(".profile_links");

const LINKS = [
    {
        label: "GitHub",
        href: "https://github.com/ShivangamSoni/",
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/shivangam-soni/",
    },
    {
        label: "FrontEnd Mentor",
        href: "https://www.frontendmentor.io/profile/shivangamsoni",
    },
    {
        label: "iCodeThis",
        href: "https://icodethis.com/Shivangam_Soni",
    },
    {
        label: "CodePen",
        href: "https://codepen.io/ShivangamSoni",
    },
    {
        label: "X / Twitter",
        href: "https://x.com/ShivangamSoni",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/shivangam_soni/",
    },
    {
        label: "Threads",
        href: "https://www.threads.net/@shivangam_soni",
    },
];

function createLink({ label, href }) {
    const linkItem = linkTemplate.content.cloneNode(true);
    const link = linkItem.querySelector(".link");
    link.textContent = label;
    link.href = href;
    profileLinks.appendChild(linkItem);
}

LINKS.forEach((item) => createLink(item));
