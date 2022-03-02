import { 
    addMonths, 
    format, 
    getUnixTime, 
    fromUnixTime, 
    subMonths, 
    eachDayOfInterval, 
    startOfMonth, 
    startOfWeek, 
    endOfMonth, 
    endOfWeek,
    getDate, 
    isSameMonth,
    isSameDay
} from "date-fns"
const date_picker_button = document.querySelector(".date-picker-button")
const date_picker = document.querySelector(".date-picker")
const current_month = document.querySelector(".current-month")
const next_month_button = document.querySelector(".next-month-button")
const prev_month_button = document.querySelector(".prev-month-button")
const date_picker_grid_dates = document.querySelector(".date-picker-grid-dates")

let current_date = new Date()

set_up_date(current_date)

date_picker_button.addEventListener("click", () => {
    date_picker.classList.toggle("show")
    const selected_date = fromUnixTime(date_picker_button.dataset.time)
    update_current_month(selected_date)
    set_up_calender(selected_date)
})


next_month_button.addEventListener("click", () => {
    current_date = addMonths(current_date, 1)
    update_current_month(current_date)
    set_up_calender(current_date)
})

prev_month_button.addEventListener("click", () => {
    current_date = subMonths(current_date, 1)
    update_current_month(current_date)
    set_up_calender(current_date)
})

function set_up_date(date) {
    date_picker_button.innerText = format(date, "MMMM do, yyyy")
    date_picker_button.dataset.time = getUnixTime(date)
}

function update_current_month(date) {
    current_month.innerHTML = format(date, "MMMM - yyyy")
}

function set_up_calender(current_date) {
    const start_date = startOfWeek(startOfMonth(current_date))
    const end_date = endOfWeek(endOfMonth(current_date))
    const dates = eachDayOfInterval({
        start: start_date,
        end: end_date
    })
    date_picker_grid_dates.innerHTML = ""
    dates.forEach(date => {
        const date_element = document.createElement("button")
        date_element.classList.add("date")
        date_element.innerText = getDate(date)
        if (!isSameMonth(date, current_date)) {
            date_element.classList.add("date-picker-other-month-date")
        }
        if (isSameDay(date, current_date)) {
            date_element.classList.add("selected")
        }
        date_element.addEventListener("click", ()=> {
            date_picker.classList.remove("show")
            set_up_date(date)
        })
        date_picker_grid_dates.appendChild(date_element)
    })

}