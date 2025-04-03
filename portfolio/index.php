<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>root@adel.dev</title>
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="./libs/fontawesome/css/all.min.css">
    <meta name="description" content="Adel Srour's Portfolio">
    <meta name="author" value="Adel srour">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
</head>

<body>

    <div class="desktop">
        <header>
            <div class="navbar">
                <div class="navbar-title">
                    _adel-srour
                </div>

                <div class="navbar-menu">
                    <div class="navbar-toggle">
                        <i class="fa-solid fa-bars"></i>
                    </div>

                </div>
            </div>
        </header>

        <section>
            <div class="section-container">
                <div class="section-title">
                    <div class="wl-text">
                        Hi all. I am
                    </div>

                    <h2>Adel <br>Srour</h2>

                    <div class="title-txt"> > Full-stack developer</div>

                    <div class="header-comments">
                        <div class="comment">// check the terminal to know more</div>
                        <div class="comment">// find my profile on Github</div>
                    </div>

                    <div>
                        <span class="color-purp">const</span> <span class="color-cyan">githubLink</span> = <a
                            class="github-link" href="https://github.com/adelsrour"
                            target="_blank">“https://github.com/adelsrour”</a>;
                    </div>
                </div>

                <div class="section-terminal">
                    <div class="terminal">
                        <div class="terminal-bar">
                            <div class="terminal-bar-title">
                                <i class="fa-solid fa-terminal"></i> guest@adel: ~
                            </div>
                            <div class="terminal-bar-btns">
                                <div class="terminal-btn min-btn" id="terminal_minmize"></div>
                                <div class="terminal-btn close-btn" id="terminal_close"></div>
                            </div>
                        </div>

                        <div id="terminal" class="terminal-body">
                            <div id="output"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div class="footer-container">
                <div class="footer-start">
                    <span class="footer-title">_find me in:</span><a class="footer-icon"
                        href="https://x.com/@adeldotdev" target="_blank"><i class="fa-brands fa-x-twitter"></i></a><a
                        class="footer-icon" href="https://www.linkedin.com/in/adel-srour-bb8230354/" target="_blank"><i
                            class="fa-brands fa-linkedin-in"></i></a><a class="footer-icon ghtag"
                        href="https://github.com/adelsrour" target="_blank"><i class="fa-brands fa-github"></i></a><div style="display:none" id="terminal_max" class="footer-icon"><i class="fa-solid fa-terminal"></i></div>
                </div>

                <a class="footer-end" href="https://github.com/adelsrour" target="_blank"><span>@adeldotdev</span> <i
                        class="fa-brands fa-github"></i></a>

            </div>
        </footer>
    </div>

    <script>
        var country = '<?php echo Locale::getDisplayRegion('-'.htmlspecialchars($_SERVER["HTTP_CF_IPCOUNTRY"])); ?>';
        var ip_address = '<?php echo $_SERVER["REMOTE_ADDR"]; ?>';
    </script>
    <script src="./libs/uaparser/uaparser.min.js"></script>
    <script src="./js/app.js"></script>
</body>

</html>