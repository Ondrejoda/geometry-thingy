class Point {
    constructor(name, x, y) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

function get_str_from_point(point) {
    return "p" + point.name + " " + parseInt(point.x) + " " + parseInt(point.y) + "<hr>";
}

class Line {
    constructor(p1, p2) {
        this.x1 = p1.x;
        this.x2 = p2.x;
        this.y1 = p1.y;
        this.y2 = p2.y;
        this.name = p1.name + " " + p2.name;
    }
}

function get_str_from_line(line) {
    return "l" + line.name + "<hr>";
}

class Circle {
    constructor(name, p1, diameter) {
        this.x = p1.x;
        this.y = p1.y;
        this.diameter = diameter;
        this.name = name;
        this.point_name = p1.name;
    }
}

function get_str_from_circle(circle) {
    return "c" + circle.name + " " + circle.point_name + " " + circle.diameter + "<hr>";
}

var lines = {};
var points = {};
var circles = {};

function p(name, x, y) {
    points[name] = (new Point(name, x, y));
}

function c(name, p, diameter) {
    circles[name] = (new Circle(name, points[p], parseInt(diameter)));
}

function l(p1, p2) {
    var name = p1 + p2;
    lines[name] = (new Line(points[p1], points[p2]));
}

function handle_p(cmd) {
    var data = cmd.split(" ");
    p(data[0], parseInt(data[1]), parseInt(data[2]));
}

function handle_l(cmd) {
    var data = cmd.split(" ");
    l(data[0], data[1]);
}

function handle_c(cmd) {
    var data = cmd.split(" ");
    c(data[0], data[1], data[2]);
}

function handle_cmd(event) {
    if (event) {
        if (event.keyCode == 13) {
            var cmd = document.getElementById("cmd").value;
            if (cmd[0] == "p") {
                cmd = cmd.slice(2, cmd.length);
                handle_p(cmd);
            }
            if (cmd[0] == "l") {
                cmd = cmd.slice(2, cmd.length);
                handle_l(cmd);
            }
            if (cmd[0] == "c") {
                cmd = cmd.slice(2, cmd.length);
                handle_c(cmd);
            }
            if (cmd[0] == "x") {
                points = {};
                lines = {};
                circles = {};
            }
            if (cmd[0] == "h") {
                location.replace("help.html");
            }
            document.getElementById("cmd").value = "";
        }
    }
    update_canvas();
}

function setup() {
    createCanvas(window.innerWidth * .996, window.innerHeight * .996);
    stroke(255);
    strokeWeight(2);
    document.getElementById("cmd").addEventListener("keyup", handle_cmd);
    update_canvas();
    
}

function update_canvas() {
    var output = document.getElementById("output");
    var output_string = "";
    for (var key in points) {
        output_string += get_str_from_point(points[key]);
    }
    for (var key in lines) {
        output_string += get_str_from_line(lines[key]);
    }
    for (var key in circles) {
        output_string += get_str_from_circle(circles[key]);
    }
    output.innerHTML = output_string;
    background(0);
    fill(255);
    for (var key in points) {
        const p = points[key];
        circle(p.x, p.y, 5);
    }
    noFill();
    for (var key in lines) {
        const l = lines[key];
        line(l.x1, l.y1, l.x2, l.y2);
    }
    for (var key in circles) {
        const c = circles[key];
        circle(c.x, c.y, c.diameter);
    }
}