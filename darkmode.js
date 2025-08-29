let darkmode = localStorage.getItem('dark-mode');
const themeSwitch = document.getElementById('themeSwitch');

const enableDarkmode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'active')
}

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', null)
}

if(darkmode === "active") enableDarkmode()


themeSwitch.addEventListener('click', ()=> {
    darkmode = localStorage.getItem('dark-mode')
    darkmode !== "active" ? enableDarkmode() : disableDarkMode()
})