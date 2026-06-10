(() => {
	const menuClsRef = document.getElementById("link-menu");
	const mobileMenuRef = document.querySelector("[data-menu]");

    const menuBtnRef = document.querySelector("[data-menu-button]");
    const body = document.querySelector("[data-body]");


	menuClsRef.addEventListener("click", () => {

		menuBtnRef.classList.toggle("is-open");
		


        mobileMenuRef.classList.toggle("is-open");
        
        body.classList.toggle("no-scroll");

		
	});
})();
