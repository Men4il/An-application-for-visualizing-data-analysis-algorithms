var container = document.getElementById("array");
var counter = 0;
var preventer = 0;
var timer = 0;
var rainbow = false;
var generated = false;
var sorting = false;

var colorListBubble = {' Обычный элемент':'#9c80f7', ' Наибольший элемент':'#FFA500', ' Отсортированный элемент':'#13CE66', ' Сравниваемый элемент':'#FF4949'};
var colorListInsert = {' Обычный элемент':'#9c80f7', ' Текущий выбранный элемент':'#FFA500', ' Отсортированный элемент':'#13CE66', ' Сравниваемый элемент':'#FF4949'};
var colorListSelect = {' Обычный элемент':'#9c80f7', ' Наибольший элемент':'#960018', ' Отсортированный элемент':'#13CE66', ' Сравниваемый элемент':'#FF4949'};
var colorListRainbow = ['#FF0000','#FF7F00','#FFFF00','#00FF00','#0000FF','#4B0082','#9400D3'];

function setTimer() {
      var seconds = document.getElementById("seconds").value;
      if(seconds > 100 || seconds < 0) {
          alert("Неверное кол-во секунд!");
      } else {
          timer = 1000 * seconds;
      }
}
function generaterainbow() {
     if(generated == true) {
        alert("Массив уже сгенерирован, перезапустите программу для повторной генерации.");
     } else {
        rainbow = true;
        generated = true;

        for (var i = 0; i < 20; i++) {
            var value = Math.ceil(Math.random() * 14);

            var array_ele = document.createElement("div");

            array_ele.classList.add("block");

            array_ele.style.height = `${250}px`;
            array_ele.style.transform = `translate(${i * 30}px)`;
            array_ele.style.backgroundColor = colorListRainbow[value % 7];

            var array_ele_label = document.createElement("label");
            array_ele_label.classList.add("block_id_rainbow");
            array_ele_label.innerText = value % 7;

            array_ele.appendChild(array_ele_label);
            container.appendChild(array_ele);
        }
        {document.getElementById("bubblesort-start").style.visibility="visible";}
        {document.getElementById("selectsort-start").style.visibility="visible";}
        {document.getElementById("insertsort-start").style.visibility="visible";}
    }
}
function enterarray() {
    if(generated == true) {
        alert("Массив уже сгенерирован, перезапустите программу для повторной генерации.");
    } else {
        var inp_nums = document.getElementById("inparray").value;
        var checker = true;
        var array = inp_nums.split(" ");
        for(var i = 0; i < array.length; i++) {
            if(array[i] > 200 || array[i] < 0) {
                checker = false;
            }
        }
        if(array.some(isNaN) || checker == false) {
            alert("В массиве содержаться другие элементы, помимо чисел или они выходят за рамки [0,200]");
        } else {
            var array_ele = document.createElement("div");

            if (array.length > 30) {
                alert("Неверно введён массив!");
            }

            for (var i = 0; i < array.length; i++) {
                var value = array[i];

                var array_ele = document.createElement("div");

                array_ele.classList.add("block");

                array_ele.style.height = `${value * 3}px`;
                array_ele.style.transform = `translate(${i * 30}px)`;

                var array_ele_label = document.createElement("label");
                array_ele_label.classList.add("block_id");
                array_ele_label.innerText = value;

                array_ele.appendChild(array_ele_label);
                container.appendChild(array_ele);
            }
            generated = true;
            {document.getElementById("bubblesort-start").style.visibility="visible";}
            {document.getElementById("selectsort-start").style.visibility="visible";}
            {document.getElementById("insertsort-start").style.visibility="visible";}
        }
    }
}
function generatearray() {
    if(generated == true) {
        alert("Массив уже сгенерирован, перезапустите программу для повторной генерации.");
    } else {
        for (var i = 0; i < 25; i++) {
            var value = Math.ceil(Math.random() * 150);

            var array_ele = document.createElement("div");

            array_ele.classList.add("block");

            array_ele.style.height = `${value * 2}px`;
            array_ele.style.transform = `translate(${i * 30}px)`;

            var array_ele_label = document.createElement("label");
            array_ele_label.classList.add("block_id");
            array_ele_label.innerText = value;

            array_ele.appendChild(array_ele_label);
            container.appendChild(array_ele);
        }
        generated = true;
        {document.getElementById("bubblesort-start").style.visibility="visible";}
        {document.getElementById("selectsort-start").style.visibility="visible";}
        {document.getElementById("insertsort-start").style.visibility="visible";}
    }
}

function swap(el1, el2) {
    return new Promise((resolve) => {

        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(function() {

            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}
function selswap(el1, el2) {
    return new Promise((resolve) => {

        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(function() {

            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, 50);
        });
    });
}

async function BubbleSort(delay = 100) {
    var blocks = document.querySelectorAll(".block");
    if (sorting == false) {
        sorting = true;
        if(rainbow == false) {
            colorize(colorListBubble);
            for (var i = 0; i < blocks.length; i += 1) {
                for (var j = 0; j < blocks.length - i - 1; j += 1) {
                    counter++;
                    blocks[j].style.backgroundColor = "#FFA500";
                    blocks[j + 1].style.backgroundColor = "#FF4949";

                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, delay)
                    );

                    console.log("run");
                    var value1 = Number(blocks[j].childNodes[0].innerHTML);
                    var value2 = Number(blocks[j + 1]
                                .childNodes[0].innerHTML);

                    if (value1 > value2) {
                        writeLog(value1, value2, false);
                        await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, timer)
                        );
                        await swap(blocks[j], blocks[j + 1]);
                        blocks = document.querySelectorAll(".block");
                    } else {
                        writeLog(value1, value2, true);
                        blocks[j].style.backgroundColor = "#FFA500";
                        blocks[j + 1].style.backgroundColor = "#FFA500";
                        await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, timer)
                        );
                    }

                    blocks[j].style.backgroundColor = "#9c80f7";
                    blocks[j + 1].style.backgroundColor = "#9c80f7";
                }
                blocks[blocks.length - i - 1]
                        .style.backgroundColor = "#13CE66";
            }
        } else {
            for (var i = 0; i < blocks.length; i += 1) {
                for (var j = 0; j < blocks.length - i - 1; j += 1) {
                    counter++;

                    await new Promise((resolve) =>
                        setTimeout(() => {
                            resolve();
                        }, delay)
                    );

                    console.log("run");
                    var value1 = Number(blocks[j].childNodes[0].innerHTML);
                    var value2 = Number(blocks[j + 1]
                                .childNodes[0].innerHTML);

                    if (value1 > value2) {
                        await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, timer)
                        );
                        await swap(blocks[j], blocks[j + 1]);
                        blocks = document.querySelectorAll(".block");
                    }
                }
            }
        }
      writeSteps();
    } else {
        alert("Вы уже запустили другой алгоритм сортировки!");
    }
}
async function InsertionSort(delay = 100) {
    var blocks = document.querySelectorAll(".block");
    if (sorting == false) {
        sorting = true;
        if(rainbow == false) {
            colorize(colorListInsert);
            for (var i = 1; i < blocks.length; i += 1) {
                var temp = i;
                var value1 = Number(blocks[temp - 1].childNodes[0].innerHTML);
                var value2 = Number(blocks[temp]
                            .childNodes[0].innerHTML);
                while (temp > 0 && value2 < value1) {
                    counter++;
                    blocks[temp].style.backgroundColor = "#FFA500";
                    blocks[temp - 1].style.backgroundColor = "#FF4949";
                    writeInsLog(value2);
                        await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, timer)
                        );
                    await new Promise((resolve) =>
                        setTimeout(() => {
                        resolve();
                        }, delay)
                    );
                    await swap(blocks[temp - 1], blocks[temp]);
                    blocks = document.querySelectorAll(".block");
                    temp--;
                    if (temp > 0) {
                        value1 = Number(blocks[temp - 1].childNodes[0].innerHTML);
                        value2 = Number(blocks[temp]
                                    .childNodes[0].innerHTML);
                    }
                    blocks[temp].style.backgroundColor = "#9c80f7";
                    blocks[temp + 1].style.backgroundColor = "#9c80f7";
                }
            }
            for (var i = 0; i < blocks.length; i += 1) {
                await new Promise((resolve) =>
                        setTimeout(() => {
                        resolve();
                        }, delay)
                    );
                blocks[i].style.backgroundColor = "#13CE66";
            }
        } else {
            for (var i = 1; i < blocks.length; i += 1) {
                var temp = i;
                var value1 = Number(blocks[temp - 1].childNodes[0].innerHTML);
                var value2 = Number(blocks[temp]
                            .childNodes[0].innerHTML);
                while (temp > 0 && value2 < value1) {
                    counter++;
                    await new Promise((resolve) =>
                        setTimeout(() => {
                        resolve();
                        }, timer)
                    );
                    await new Promise((resolve) =>
                        setTimeout(() => {
                        resolve();
                        }, delay)
                    );
                    await swap(blocks[temp - 1], blocks[temp]);
                    blocks = document.querySelectorAll(".block");
                    temp--;
                    if (temp > 0) {
                        value1 = Number(blocks[temp - 1].childNodes[0].innerHTML);
                        value2 = Number(blocks[temp]
                                    .childNodes[0].innerHTML);
                    }
                }
            }
            for (var i = 0; i < blocks.length; i += 1) {
                await new Promise((resolve) =>
                        setTimeout(() => {
                        resolve();
                        }, delay)
                    );
            }
        }
      writeSteps();
    } else {
        alert("Вы уже запустили другой алгоритм сортировки!");
    }
}
async function SelectionSort(delay = 150) {
    var blocks = document.querySelectorAll(".block");
    if (sorting == false) {
        sorting = true;
        if(rainbow == false) {
            colorize(colorListSelect);
            for (var i = 0; i < blocks.length; i += 1) {
                var maximum = Number(blocks[0].childNodes[0].innerHTML);
                var max_id = 0;
                blocks[0].style.backgroundColor = "#960018";
                document.getElementById("logs").innerHTML = "Ищем максимум в массиве.";
                for (var j = 1; j <= blocks.length - i - 1; j += 1) {
                    blocks[j].style.backgroundColor = "#FF4949";
                    await new Promise((resolve) =>
                        setTimeout(() => {
                        resolve();
                        }, delay)
                    );
                    var current = Number(blocks[j].childNodes[0].innerHTML);
                    if (current > maximum) {
                        maximum = current;
                        blocks[max_id].style.backgroundColor = "#9c80f7";
                        blocks[j].style.backgroundColor = "#960018";
                        max_id = j;
                    } else {
                    blocks[j].style.backgroundColor = "#9c80f7";
                    }
                    counter++;
                }
                if (max_id != blocks.length - i - 1) {
                    writeLogSel(max_id, blocks.length - i - 1, true);
                    await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, timer)
                        );
                    for (var j = max_id; j < blocks.length - i - 1; j++) {
                        await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, 0)
                        );
                        await selswap(blocks[j], blocks[j + 1]);
                        blocks = document.querySelectorAll(".block");
                    }
                    blocks[blocks.length - i - 2].style.backgroundColor = "#FF4949";
                    for (var j = blocks.length - i - 2; j > max_id; j--) {
                        await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, 0)
                        );
                        await selswap(blocks[j - 1], blocks[j]);
                        blocks = document.querySelectorAll(".block");
                    }
                    blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
                    blocks[max_id].style.backgroundColor = "#9c80f7";
                } else {
                    writeLogSel(max_id, blocks.length - i - 1, false);
                    blocks[blocks.length - i - 1].style.backgroundColor = "#13CE66";
                }


                await new Promise((resolve) =>
                    setTimeout(() => {
                    resolve();
                    }, delay)
                );
            }
        } else {
            for (var i = 0; i < blocks.length; i += 1) {
                var maximum = Number(blocks[0].childNodes[0].innerHTML);
                var max_id = 0;
                for (var j = 1; j <= blocks.length - i - 1; j += 1) {
                    await new Promise((resolve) =>
                        setTimeout(() => {
                        resolve();
                        }, delay)
                    );
                    var current = Number(blocks[j].childNodes[0].innerHTML);
                    if (current > maximum) {
                        maximum = current;
                        max_id = j;
                    }
                    counter++;
                }
                if (max_id != blocks.length - i - 1) {
                    await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, timer)
                        );
                    for (var j = max_id; j < blocks.length - i - 1; j++) {
                        await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, 0)
                        );
                        await selswap(blocks[j], blocks[j + 1]);
                        blocks = document.querySelectorAll(".block");
                    }
                    for (var j = blocks.length - i - 2; j > max_id; j--) {
                        await new Promise((resolve) =>
                            setTimeout(() => {
                            resolve();
                            }, 0)
                        );
                        await selswap(blocks[j - 1], blocks[j]);
                        blocks = document.querySelectorAll(".block");
                    }
                }
                await new Promise((resolve) =>
                    setTimeout(() => {
                    resolve();
                    }, delay)
                );
            }
        }
      writeSteps();
    } else {
        alert("Вы уже запустили другой алгоритм сортировки!");
    }
}

async function writeLogSel(first, second, checker) {
    var blocks = document.querySelectorAll(".block");
    var fNum = Number(blocks[first].childNodes[0].innerHTML);
    var sNum = Number(blocks[second].childNodes[0].innerHTML);

    let string = "";
    if (checker == true) {
        string += `Меняем местами элементы ${fNum} и ${sNum} т.к. ${fNum} является   максимумом.`;
    } else {
        string += `Элемент ${fNum} остаётся на месте т.к. он является максимумом.`;
    }

    document.getElementById("logs").innerHTML = string;
}
async function writeInsLog(second) {
    let string = "";
    string += `${second} меняется с элементом левее, пока элемент левее него не станет меньше или равен ${second}.`;

    document.getElementById("logs").innerHTML = string;
}
async function writeLog(first, second, checker) {
    let string = "";
    if(checker == true) {
        string += `Элемент ${second} больше ${first}, менять не нужно.`;
    } else {
        string += `Меняем местами элементы ${first} и ${second} т.к. ${first} больше ${second}.`;
    }

    document.getElementById("logs").innerHTML = string;
}

function writeSteps() {
    document.getElementById("steps").innerHTML += counter;
}
function Rules() {
    let string = "1. Массив чисел желательно задавать числами от 0 до 200 и не превышать кол-во в 30 цифр.\n";
    string += "2. По кнопке можно сгенерировать массив из 25 элементов, состоящий из чисел от 0 до 150.\n";
    string += "3. Время задержки текста - время остановки алгоритма при замене двух элементов. Может принимать значения от 0 до 100. Стандартное значение = 0.\n";
    string += "4. По кнопке <Радуга> вы можете сгенерировать массив из 20 элементов с цветами радуги, которые будут отсортированы алгоритмом в порядке цветов радуги.\n";
    alert(string);
}

colorize = function(colorList) {
    var con_legend = document.getElementById('legend');

    for (var key in colorList) {
        var boxContainer = document.createElement("DIV");
        var box = document.createElement("DIV");
        var label = document.createElement("SPAN");

        label.innerHTML = key;
        box.className = "box";
        box.style.backgroundColor = colorList[key];

        boxContainer.appendChild(box);
        boxContainer.appendChild(label);

        con_legend.appendChild(boxContainer);

    }
}

function restart() {
    window.location.reload(true);
}