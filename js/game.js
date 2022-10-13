var game = game || {};

game = {
    Game: class {
        constructor() {
            this.words = ['clase', 'mesa', 'ordenador', 'teclado',
                'ventana', 'silla', 'enchufe', 'pizarra', 'zorro',
                'perro', 'cerdo', 'tigre'];
            this.keyboard = document.querySelector('.keyboard');
            this.word = document.querySelector('.word');
            this.attemps = document.querySelector('.try');
            this.keyPressed = document.getElementById('hidden');
            this.result = document.getElementById('result');
            this.gameWord = null;
            this.trys = 10;
            this.restartBtn = document.querySelector('.restart-btn');
        }

        createKeyboard() {
            for (let i = 65; i < 91; i++) {
                const div = document.createElement('div');
                div.classList.add('keyboard-item');
                div.setAttribute("key", i);
                div.innerHTML = String.fromCharCode(i);
                this.keyboard.appendChild(div);
            }
        }

        chooseWord() {
            let index = Math.floor(Math.random() * this.words.length);
            this.gameWord = this.words[index].toUpperCase();
        }

        setWord() {
            for (let i = 0; i < this.gameWord.length; i++) {
                const div = document.createElement('div');
                div.classList.add('letter');
                this.word.appendChild(div);
            }
        }

        reloadTrys() {
            this.attemps.innerHTML = `Number of attemps: ${this.trys}`;
        }

        checkLetter() {
            this.keyboard.addEventListener('click', (e) => {
                if (e.target.classList.contains('keyboard-item')) {
                    var element = document.querySelector(`[key='${e.target.getAttribute("key")}']`);
                    this.keyboard.removeChild(element);
                    this.trys--;
                    this.reloadTrys();

                    if (this.gameWord.includes(element.innerHTML)) {

                        for (let i = 0; i < this.word.children.length; i++) {
                            if (this.gameWord[i] == element.innerHTML) {
                                this.word.children[i].innerHTML = element.innerHTML;
                            }
                        }
                    }
                    this.checkWin();
                }
            });
        }

        checkWin() {
            if (this.trys >= 0) {
                if (this.checkWord()) {
                    this.result.innerHTML = 'You win';
                    this.keyboard.style.display = "none";
                } else if (this.trys == 0) {
                    this.result.innerHTML = `You lose <br>The word was ${this.gameWord}`;
                    this.keyboard.style.display = "none";
                }
            }
        }

        checkWord() {
            let wordCompleted = true;
            for (let i = 0; i < this.gameWord.length; i++) {
                if (this.gameWord[i] != this.word.children[i].innerHTML) {
                    wordCompleted = false;
                }
            }

            return wordCompleted;
        }

        restart() {
            this.restartBtn.addEventListener('click', () => {
                window.location.reload();
            });
        }

        start() {
            this.createKeyboard();
            this.chooseWord();
            this.setWord();
            this.reloadTrys();
            this.checkLetter();
            this.restart();
        }
    }
}