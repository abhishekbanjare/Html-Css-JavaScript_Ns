function swapTheme() {
    const App = document.getElementById("app");
    const Swap = document.getElementById("swap");

    // change class name of div
    if(App.classList.contains("day")){
        App.classList.remove("day");
        App.classList.add("night");

        Swap.classList.remove("button_day");
        Swap.classList.add("button_night");
    }
    else{
        App.classList.remove("night");
        App.classList.add("day");

        // change class name of button
        Swap.classList.remove("button_night");
        Swap.classList.add("button_day");
    }
}