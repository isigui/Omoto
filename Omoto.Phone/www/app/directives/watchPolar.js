var OmotoModule = angular.module("Omoto");
OmotoModule.directive("watchPolar", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            var ctx = element[0].getContext('2d');

            // variable that decides if something should be drawn on mousemove
            var can, ctx, mouseIsDown = 0;
            var controlGear = { width: 0, height: 0, canX: 0, canY: 0 };
            var can = element[0];
            can.addEventListener("mousedown", mouseDown, false);
            can.addEventListener("mousemove", mouseXY, false);
            can.addEventListener("touchstart", touchDown, false);
            can.addEventListener("touchmove", touchXY, true);
            can.addEventListener("touchend", touchUp, false);
            document.body.addEventListener("mouseup", mouseUp, false);
            document.body.addEventListener("touchcancel", touchUp, false);
            window.addEventListener("resize", resize);

            function resize() {
                can.height = window.innerHeight;
                can.width = window.innerWidth;
                controlGear.radius = can.width / 8;
                controlGear.canX = controlGear.radius / 2;
                controlGear.canY = 0;

            };
            function mouseUp() {

                mouseIsDown = 0;

                mouseXY();

            }
            function touchUp() {

                mouseIsDown = 0;

                // no touch to track, so just show state

                showPos();

            }
            function mouseDown() {
                mouseIsDown = 1;
                mouseXY();
            }
            function touchDown() {
                mouseIsDown = 1;
                touchXY();
            }
            function mouseXY(e) {
                if (!e)
                    var e = event;
                var newPosX = e.pageX - can.offsetLeft - controlGear.radius;
                var newPosY = can.height - e.pageY + can.offsetTop;
                if (newPosX > controlGear.radius || newPosY > controlGear.radius)
                    return;
                else {
                    controlGear.canX = newPosX;
                    controlGear.canY = newPosY;
                    showPos();
                }
            }
            function touchXY(e) {
                if (!e)
                    var e = event;
                e.preventDefault();
                canX = e.targetTouches[0].pageX - can.offsetLeft - can.width / 2;
                canY = can.height / 2 - e.targetTouches[0].pageY - can.offsetTop;
                showPos();
            }
            function showPos() {

                drawCircle();

            }
            function drawCircle() {
                ctx.clearRect(0, 0, 2 * controlGear.radius, 2 * controlGear.radius);
                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.lineWidth = 20;
                ctx.arc(controlGear.radius, can.height, controlGear.radius, 0, Math.PI * 2);
                ctx.stroke();
                updateCircle();


            }
            function updateCircle() {
                //ctx.clear();
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.lineWidth = 10;
                var teta = Math.acos(Math.min(controlGear.canX, controlGear.radius) / controlGear.radius);
                var hypothenus = Math.min(Math.sqrt(
                    Math.pow(Math.min(Math.abs(controlGear.canY, controlGear.radius)), 2) +
                    Math.pow(Math.min(Math.abs(controlGear.canX, controlGear.radius)), 2)), controlGear.radius);

                ctx.globalAlpha = (hypothenus / controlGear.radius).toFixed(2);
                scope.$parent.input.angle = pad((teta * 180 / Math.PI).toFixed(0), 3);
                scope.$parent.input.puissance = pad(((hypothenus / controlGear.radius * 155) + 90).toFixed(0), 3);


                scope.$parent.$digest();
                ctx.arc(controlGear.radius, can.height, controlGear.radius, 2 * Math.PI - teta, 2 * Math.PI - teta + Math.PI / 16, false);
                ctx.stroke();
                ctx.globalAlpha = 1;
                //ctx.beginPath();
                //ctx.font = "8pt segoe ui";
                //ctx.textBaseline = "middle";
                //ctx.fillStyle = "rgb(64,255,64)";
                //ctx.fillText("X: " + controlGear.canX + " px, Y: " + controlGear.canY + " px" + "(teta: " + (teta * 180 / Math.PI).toFixed(2) + "°)", 0, controlGear.radius - 10, controlGear.radius - 10);


            }

            resize();
            drawCircle();

        }
    };
});