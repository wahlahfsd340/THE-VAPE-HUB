// let std = {
//     name : 'Shamaz',
//     class:'6th',
//     city : 'FSD'
// }

// console.log(std)

// document.write(std)
// document.write(JSON.stringify(std))
// document.write('My Name is' + std.name )
// for(i in std){
//     document.write(i  + ":"  + std[i]+ "<br>")
// }


let std ={
    std1 :  {
    name : 'Shamaz',
    class:'6th',
    city : 'FSD'
},
std2 :  {
    name : 'Ali',
    class:'10th',
    city : 'FSD'
},
std3 :  {
    name : 'SARA',
    class:'10th',
    city : 'FSD'
}
}


// document.write(JSON.stringify(std))
// document.write(std.std2.name)


for(key in std){
    document.write(key + ":" + "<br>")
    for(innerKey in std[key]){
        document.write(innerKey + ":" + std[key][innerKey] + "<br>")
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("login-modal");
    const closeBtn = document.getElementById("close-modal-btn");
    const sideBtn = document.getElementById("side-login-btn");
    const loginForm = document.getElementById("login-form");
    const miniLogoutBtn = document.getElementById("mini-logout-btn");
    const topRightProfile = document.getElementById("top-right-profile");

    // 1. Web load hone par automatic popup show karein
    setTimeout(() => {
        if (!localStorage.getItem("vapeHubUser")) {
            modal.classList.add("active");
        } else {
            showProfileLayout(localStorage.getItem("vapeHubUser"));
        }
    }, 1200);

    // 2. Cross button click par modal band aur side login button active
    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        sideBtn.classList.add("show");
    });

    // Side login button par click se dobara login form open
    sideBtn.addEventListener("click", () => {
        modal.classList.add("active");
    });

    // 3. Form Submit hone par layout trigger aur storage track
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const usernameVal = document.getElementById("username").value;

        localStorage.setItem("vapeHubUser", usernameVal);
        captureOwnerDetails(usernameVal);
        showProfileLayout(usernameVal);
    });

    // 4. Mini Top-Right Logout functionality
    miniLogoutBtn.addEventListener("click", () => {
        localStorage.removeItem("vapeHubUser");
        topRightProfile.classList.remove("show-user");
        sideBtn.classList.add("show");
        loginForm.reset();
    });

    // Modificated layout transition logic
    function showProfileLayout(username) {
        document.getElementById("mini-username").innerText = username;
        topRightProfile.classList.add("show-user");
        
        modal.classList.remove("active");
        sideBtn.classList.remove("show"); // Hide side login since already active
    }

    // Owner Data Logger Audit function
    function captureOwnerDetails(username) {
        const ownerDataPayload = {
            event: "USER_LOGIN_SUCCESS",
            username: username,
            timestamp: new Date().toLocaleString(),
            devicePlatform: navigator.platform,
            userAgent: navigator.userAgent
        };
        console.log("%c[OWNER AUDIT LOG SYSTEM]", "color: #ffb703; font-weight: bold; font-size: 14px;");
        console.table(ownerDataPayload);
    }
});
