function setTheme(themeName) {
    localStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
    
    themeSwitcher = document.getElementById("theme-switcher")
    if (themeName == "dark") {
        themeSwitcher.innerHTML = "☀︎"
    } else {
        themeSwitcher.innerHTML = "☾"
    }
}

function toggleTheme() {
    if (localStorage.getItem("theme") == "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}

if (localStorage.getItem("theme") == "dark") {
    setTheme("dark");
} else {
    setTheme("light");
}