import { getCookie, setCookie } from "./resumeResource/cookie.js"
const username = document.getElementById("username")
const password = document.getElementById("password")
const eye = document.querySelector(".eye")
const register = document.getElementById("btn-register")
const usernameError = document.querySelector(".username-error")
const passwordError = document.querySelector(".password-error")

window.addEventListener("load", () => {
	let isRegistered = JSON.parse(localStorage.getItem("isRegistered"))
	if (isRegistered) {
		location.href = "https://resumeup.netlify.app/login.html"
		return
	}
	let auth = JSON.parse(localStorage.getItem("auth"))
	if (auth) {
		location.href = "https://resumeup.netlify.app/"
	}
})

function removeFormText() {
	usernameError.classList.add("d-none")
	passwordError.classList.add("d-none")
}

eye.addEventListener("click", (e) => {
	let element = e.currentTarget.previousElementSibling
	let type = element.getAttribute("type")
	if (type === "password") {
		element.setAttribute("type", "text")
	} else {
		element.setAttribute("type", "password")
	}
})

username.addEventListener("keydown", () => {
	removeFormText()
})

password.addEventListener("keydown", () => {
	removeFormText()
})

register.addEventListener("click", () => {
	const user = username.value
	const pass = password.value
	registerApi(user, pass)
})

async function registerApi(user, pass) {
	let error = false
	if (user === "") {
		usernameError.classList.remove("d-none")
		error = true
	}
	if (pass === "") {
		passwordError.classList.remove("d-none")
		error = true
	}
	if (pass.length < 6) {
		passwordError.classList.remove("d-none")
		error = true
	}
	if (error) return
	let time = 100000000
	if (getCookie("username") === null) {
		localStorage.setItem("isRegistered", true)
		localStorage.setItem("auth", true)
		setCookie("username", user, time)
		setCookie("password", pass, time)
		location.href = "https://resumeup.netlify.app/createResume.html"
	}
}
