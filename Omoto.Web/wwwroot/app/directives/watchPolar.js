var OmotoModule = angular.module("Omoto");
OmotoModule.directive("watchPolar", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            var ctx = element[0].getContext('2d');


            var watcherIntervalId;
            var isWatching = false;
            var refreshms = 100;
            // variable that decides if something should be drawn on mousemove
            var can, ctx, mouseIsDown = 0;
            var teta, hypothenus;
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

            function mouseUp() {
                mouseIsDown = 0;
                StopStartWatching(false);
            }
            function touchUp() {
                mouseIsDown = 0;
                StopStartWatching(false);
            }
            function mouseDown() {
                mouseIsDown = 1;
                StopStartWatching(true);
                mouseXY();
            }
            function touchDown() {
                mouseIsDown = 1;
                StopStartWatching(true);
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
                    drawCircle();
                }
            }
            function touchXY(e) {
                if (!e)
                    var e = event;
                e.preventDefault();
                canX = e.targetTouches[0].pageX - can.offsetLeft - can.width / 2;
                canY = can.height / 2 - e.targetTouches[0].pageY - can.offsetTop;
                drawCircle();
            }

            

            function drawCircle() {
                ctx.clearRect(0, 0, 2 * controlGear.radius, 2 * controlGear.radius);
                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.lineWidth = 20;
                ctx.arc(controlGear.radius, can.height, controlGear.radius, 0, Math.PI * 2);
                ctx.stroke();
                updateSegment();
            }

            function updateSegment() {
                if (isWatching) {
                    //ctx.clear();
                    ctx.beginPath();
                    ctx.strokeStyle = "red";
                    ctx.lineWidth = 10;
                    teta = Math.acos(Math.min(controlGear.canX, controlGear.radius) / controlGear.radius);
                    hypothenus = Math.min(Math.sqrt(
                        Math.pow(Math.min(Math.abs(controlGear.canY, controlGear.radius)), 2) +
                        Math.pow(Math.min(Math.abs(controlGear.canX, controlGear.radius)), 2)), controlGear.radius);

                    ctx.globalAlpha = (hypothenus / controlGear.radius).toFixed(2);
                    


                    ctx.arc(controlGear.radius, can.height, controlGear.radius, 2 * Math.PI - teta, 2 * Math.PI - teta + Math.PI / 16, false);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }

            function StopStartWatching(start) {
                if(isWatching != start)
                {
                    if (start == true) {
                        watcherIntervalId = setInterval(sendRobotPacket, refreshms);
                        console.log("start watching: " + watcherIntervalId);
                    }
                    else
                    {
                        clearInterval(watcherIntervalId);
                        console.log("stop watching: " + watcherIntervalId);
                    }
                    isWatching = start;
                }
            }
            function sendRobotPacket() {

                var angle = pad((teta * 180 / Math.PI).toFixed(0), 3);
                var puissance = pad(((hypothenus / controlGear.radius * 155) + 90).toFixed(0), 3);
                var packet = new robotPacket(angle, puissance, 0);
                scope.sendRobotPacket(packet);
            }
            function resize() {
                can.height = window.innerHeight;
                can.width = window.innerWidth;
                controlGear.radius = can.width / 8;
                controlGear.canX = controlGear.radius / 2;
                controlGear.canY = 0;
                drawCircle();
            };

            resize();
        }
    };
});