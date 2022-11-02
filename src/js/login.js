import { getCookie, setCookie } from "./resumeResource/cookie.js"
const username = document.getElementById("username")
const password = document.getElementById("password")
const login = document.getElementById("btn-login")
const usernameError = document.querySelector(".username-error")
const passwordError = document.querySelector(".password-error")

window.addEventListener("load", () => {
	let auth = JSON.parse(localStorage.getItem("auth"))
	if (auth) {
		location.href = "https://resumeup.netlify.app/"
		return
	}
})

function removeFormText() {
	usernameError.classList.add("d-none")
	passwordError.classList.add("d-none")
}

username.addEventListener("keydown", () => {
	removeFormText()
})

password.addEventListener("keydown", () => {
	removeFormText()
})

login.addEventListener("click", () => {
	const user = username.value
	const pass = password.value
	loginApi(user, pass)
})

async function loginApi(user, pass) {
	let error = false
	if (user === "") {
		usernameError.classList.remove("d-none")
		error = true
	}
	if (pass === "") {
		passwordError.classList.remove("d-none")
		error = true
	}
	if (error) return
	if (getCookie("username") === null || getCookie("username") !== user) {
		usernameError.classList.remove("d-none")
		return
	}
	if (getCookie("password") !== pass) {
		passwordError.classList.remove("d-none")
		return
	}
	localStorage.setItem("auth", true)
	let resumeCompleted = JSON.parse(localStorage.getItem("resumeCompleted"))
	if (resumeCompleted) {
		location.href = "https://resumeup.netlify.app/resume.html"
	} else {
		location.href = "https://resumeup.netlify.app/createResume.html"
	}
}
