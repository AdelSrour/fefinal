let terminal_section = document.querySelector(".section-terminal");
const queue = [];
let isTyping = false;
let isPaused = false;

function addText(text) {
    queue.push(text);
    processQueue();
}

function processQueue() {
    if (isTyping || queue.length === 0) return;

    isTyping = true;
    let rawText = queue.shift();
    const noautoscroll = rawText.includes("{noautoscroll}");
    rawText = rawText.replace("{noautoscroll}", "");

    const parts = rawText.split(/(\{delay=\d+\}|\{clear=\d+\}.*?\{\/clear\}|\{html\}.*?\{\/html\})/g).filter(Boolean);

    const output = document.getElementById("output");
    const newLine = document.createElement("div");
    output.appendChild(newLine);

    let i = 0;
    function type() {
        if (window.getComputedStyle(terminal_section).display === "none") {
            return setTimeout(() => {
                type();
            }, 1000);
        }
        if (i >= parts.length) {
            isTyping = false;
            processQueue();
            return;
        }

        const part = parts[i++];
        const delayMatch = part.match(/\{delay=(\d+)\}/);
        const clearMatch = part.match(/\{clear=(\d+)\}.*?\{\/clear\}/);
        const htmlMatch = part.match(/\{html\}([\s\S]*?)\{\/html\}/);

        if (htmlMatch) {
            const htmlContent = htmlMatch[1];
            newLine.innerHTML += htmlContent;
            type();
        } else if (clearMatch) {
            const textToClear = part.replace(/\{clear=\d+\}/, "").replace(/\{\/clear\}/, "");
            let j = 0;
            function typeClearText() {
                if (j < textToClear.length) {
                    newLine.innerHTML = newLine.innerHTML.replace(/█$/, "");
                    newLine.innerHTML += textToClear[j++] + "█";
                    setTimeout(typeClearText, 5);
                } else {
                    newLine.innerHTML = newLine.innerHTML.replace(/█$/, "");
                    setTimeout(() => {
                        const cursor = document.createElement("span");
                        cursor.textContent = "█";
                        cursor.id = "cursor";
                        newLine.appendChild(cursor);

                        let blink = true;
                        const blinkInterval = setInterval(() => {
                            cursor.style.visibility = blink ? "visible" : "hidden";
                            blink = !blink;
                        }, 200);

                        setTimeout(() => {
                            clearInterval(blinkInterval);
                            cursor.remove();
                            newLine.innerHTML = newLine.innerHTML.replace(textToClear, "");
                            type();
                        }, parseInt(clearMatch[1]));
                    }, 5);
                }
                if (noautoscroll == false) {
                    const terminal = document.getElementById("terminal");
                    terminal.scrollTop = terminal.scrollHeight;
                }
            }

            typeClearText();
        } else if (delayMatch) {
            const cursor = document.createElement("span");
            cursor.textContent = "█";
            cursor.id = "cursor";
            newLine.appendChild(cursor);

            let blink = true;
            const blinkInterval = setInterval(() => {
                cursor.style.visibility = blink ? "visible" : "hidden";
                blink = !blink;
            }, 200);

            setTimeout(() => {
                clearInterval(blinkInterval);
                cursor.remove();
                type();
            }, parseInt(delayMatch[1]));
        } else {
            let j = 0;
            function typeLetter() {
                if (j < part.length) {
                    newLine.innerHTML = newLine.innerHTML.replace(/█$/, "");
                    newLine.innerHTML += part[j++] + "█";
                    setTimeout(typeLetter, 20);
                } else {
                    newLine.innerHTML = newLine.innerHTML.replace(/█$/, "");
                    type();
                }

                if (noautoscroll == false) {
                    const terminal = document.getElementById("terminal");
                    terminal.scrollTop = terminal.scrollHeight;
                }
            }
            typeLetter();
        }
    }

    type();
}




let is_open = false;
let menu_btn = document.querySelector(".navbar-toggle");
menu_btn.addEventListener("click", () => {
    if (is_open) return;
    is_open = true;
    menu_btn.classList.add("toggle-destroy");
    setTimeout(() => {
        terminal_section.classList.remove("terminal-closed");
        terminal_section.classList.remove("terminal-minzed");
        terminal_section.classList.add("section-terminal-mob");
    }, 3000);
});

const parser = new UAParser();
let browser = parser.getBrowser().name;
let OS = parser.getOS().name;
let vendor = parser.getDevice().vendor;
let model = parser.getDevice().model;
let addon = '';
if (vendor && model){
    addon = ` -v ${vendor} -m ${model}`;
}

addText(`{delay=1000}{html}<span style="color:lime">adel:~#</span>{/html} So... {delay=800}Would you like to know more about me? {delay=1000}
{html}<div id="phase1" class="terminal-option-body"><button class="terminal-option" onclick="phase1('yes', this)">Yes</button> <button class="terminal-option" onclick="phase1('no', this)">No</button></div>{/html}`)

function phase1(answer, btn) {
    switch (answer) {
        case 'no':
            btn.remove();
            addText(`{html}<span style="color:white">guest:~#</span>{/html} no {delay=1000}
{html}<span style="color:lime">adel:~#</span>{/html}{html}<img style="display:block;max-width: 30%;border-radius:10px;margin-bottom:10px" src="./assets/no_option.jpg">{/html}`)
            break;
        case 'yes':
            document.getElementById("phase1").remove();
            addText(`{html}<span style="color:white">guest:~#</span>{/html} yes {delay=1000}
{html}<span style="color:lime">adel:~#</span>{/html} Very well! {delay=1000}Let’s first see who you really are? {delay=1000}
{html}<span style="color:lime">adel:~#</span>{/html} ./device_hacker${addon} -os ${OS} -browser ${browser} -country ${country}
{delay=1000}{clear=500}[-] Injecting Payload into kernel... {/clear}{clear=500}[-] Payload loaded successfully... {/clear}__Connection established on ${ip_address}:9448 successfully... {delay=1000}
{html}<span style="color:lime">adel:~#</span>{/html} Now tell me... {delay=1000} what exactly do you want to know? {delay=1000}
{html}<div id="phase2" class="terminal-option-body"><button class="terminal-option" onclick="phase2('projects')">My Projects</button><button class="terminal-option" onclick="phase2('skills')">My Skills</button><button class="terminal-option" onclick="phase2('contact')">Contact me</button></div>{/html}`);
            break;
    }
}


function phase2(action) {
    document.getElementById("output").innerHTML = "";
    addText(`{delay=1000}{html}<span style="color:lime">adel:~#</span>{/html} ./${action} {delay=1000}`);
    switch (action) {
        case "projects":
            printProjects();
            break;
        case "skills":
            printSkills();
            break;
        case "contact":
            printContact();
            break;
    }
    printOptions();
}


function printProjects() {
    let projectDiv = `<div class="projects">

        <div class="project">
            <div class="project-title">
                Project Zetsal <span class="comment">//vpn-service</span>
            </div>
            <div class="project-body">
                <div class="project-img">
                    <img src="./assets/project-zetsal.png" alt="">
                </div>
                <div class="project-desc">
                    DDoS Protected and Secured VPN service.
                    Offering IPv4 and IPv6 connectivity using AES-256 Encryption.
                    <a href="https://zetsal.com" target="_blank" class="project-btn">View Project</a>
                </div>
            </div>
        </div>

        <div class="project">
            <div class="project-title">
                Project Iqplus <span class="comment">//iq-tool</span>
            </div>
            <div class="project-body">
                <div class="project-img">
                    <img src="./assets/project-iqplus.png" alt="">
                </div>
                <div class="project-desc">
                    An online tool to practice the IQ questions in interactive and competitive way.
                    <a href="https://iqplus.adel.dev" target="_blank" class="project-btn">View Project</a>
                </div>
            </div>
        </div>

        <div class="project">
            <div class="project-title">
                Project zdash <span class="comment">//webbase-mutlitools</span>
            </div>
            <div class="project-body">
                <div class="project-img">
                    <img src="./assets/project-zdash.png" alt="">
                </div>
                <div class="project-desc">
                    A collections of most popular web based applications and tools provided online via web interface offered for free for everyone to access.
                    <a href="https://zdash.net" target="_blank" class="project-btn">View Project</a>
                </div>
            </div>
        </div>

    </div>`;
    addText(`{noautoscroll}{html}${projectDiv}{/html}{delay=2000}`);
}

function printSkills() {
    addText(`{noautoscroll}{html}<div class="comment skills">/**
    * Frontend
        <i class="fa-brands fa-html5"></i> HTML5/CSS3
        <i class="fa-brands fa-js"></i> JAVASCRIPT/TYPESCRIPT
        <i class="fa-brands fa-react"></i> REACT
    * Backend
        <i class="fa-brands fa-php"></i> PHP
        <i class="fa-brands fa-laravel"></i> Laravel
        <i class="fa-solid fa-database"></i> MYSQL
    * Devops
        <i class="fa-solid fa-code-branch"></i> GIT
        <i class="fa-brands fa-docker"></i> DOCKER
        <i class="fa-solid fa-cloud"></i> Web servers
            * Apache2
            * Nginx
        <i class="fa-solid fa-server"></i> VMs
            * VMWARE
            * Virtualbox
        <i class="fa-solid fa-cloud"></i> Cloud Computing
            * OVH Public cloud
            * AWS
        <i class="fa-brands fa-cloudflare"></i> Cloudflare
        <i class="fa-solid fa-shield-halved"></i> IPTables
    * Embedded systems
        <i class="fa-solid fa-microchip"></i> Dev boards
            * Arduino
            * ESP8266
            * ESP32
            * ATMEGAxx
            * ATTINY
        <i class="fa-solid fa-code"></i> Arduino IDE
*/
</div>{/html}`);
}

function printContact() {
    let contact_form = `<div class="contact-form"><form action="#" onsubmit="return sendMessage();">
            <div id="error_messages"></div>
            <label for="username">_name:</label>
            <input class="input-form" type="text" name="username" id="username" placeholder="Enter your name" required>

            <label for="email">_email:</label>
            <input class="input-form" type="email" name="email" id="email" placeholder="Enter your email" required>

            <label for="message">_message:</label>
            <textarea class="input-form" type="text" name="message" id="message" placeholder="Enter your message" rows="4" required></textarea>

            <button type="submit" id="contact_btn">Send message</button>
        </form></div>`;
    addText(`{noautoscroll}{html}${contact_form}{/html}{delay=2000}`);
}

function sendMessage() {
    document.getElementById("contact_btn").innerHTML = "Sending...";
    document.getElementById("contact_btn").disabled = true;
    document.getElementById("error_messages").style.display = "none";
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    var data = "username=" + encodeURIComponent(username) +
        "&email=" + encodeURIComponent(email) +
        "&message=" + encodeURIComponent(message);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://adel.dev/sendMessage.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            document.getElementById("contact_btn").innerHTML = "Send Message";
            document.getElementById("contact_btn").disabled = false; // Ensure button is re-enabled

            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.status !== "success") {
                    document.getElementById("error_messages").style.display = "block";
                    document.getElementById("error_messages").innerText = response.reason;
                } else {
                    document.getElementById("output").innerHTML = "";
                    addText(`{html}<span style="color:lime">adel:~#</span>{/html} Thank you! {delay=1000}I have received your message and will get back to you asap! {delay=1000}`);
                    printOptions();
                }
            } else {
                document.getElementById("error_messages").innerText = "Couldn't connect to server. Please check your internet connection.";
            }
        }
    };
    xhr.send(data);
    return false;
}

function printOptions() {
    addText(`{noautoscroll}{html}<span style="color:lime">adel:~#</span>{/html} What else would you like to know? {delay=1000}
{html}<div id="phase2" class="terminal-option-body"><button class="terminal-option" onclick="phase2('projects')">My Projects</button><button class="terminal-option" onclick="phase2('skills')">My Skills</button><button class="terminal-option" onclick="phase2('contact')">Contact me</button></div>{/html}`)
}


let terminal_close = document.getElementById("terminal_close");
let terminal_min = document.getElementById("terminal_minmize");
let terminal_max = document.getElementById("terminal_max");

terminal_max.addEventListener("click", () => {
    terminal_section.classList.remove("terminal-force-hidden");
    terminal_section.classList.remove("terminal-minzed");
    terminal_section.classList.remove("terminal-closed");
    terminal_section.style.display = "block";
    menu_btn.classList.add("toggle-destroy");
});

terminal_close.addEventListener("click", () => {
    is_open = false;
    terminal_max.style.display = "none";
    terminal_section.classList.add("terminal-closed");
    menu_btn.classList.remove("toggle-destroy");
});


terminal_min.addEventListener("click", () => {
    is_open = false;
    terminal_max.style.display = "inline-block";
    terminal_section.classList.add("terminal-minzed");
    menu_btn.classList.add("toggle-destroy");
    setTimeout(() => {
        terminal_section.classList.add("terminal-force-hidden");
    }, 100)
});