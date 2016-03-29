var OmotoModule = angular.module("Omoto");
OmotoModule.directive("watchPolar", function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            var ctx = element[0].getContext('2d');

            // variable that decides if something should be drawn on mousemove
            var can, ctx, canX, canY, mouseIsDown = 0;
            var can = element[0];
            can.addEventListener("mousedown", mouseDown, false);
            can.addEventListener("mousemove", mouseXY, false);
            can.addEventListener("touchstart", touchDown, false);
            can.addEventListener("touchmove", touchXY, true);
            can.addEventListener("touchend", touchUp, false);
            document.body.addEventListener("mouseup", mouseUp, false);
            document.body.addEventListener("touchcancel", touchUp, false);


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
                canX = e.pageX - can.offsetLeft - can.width / 2;
                canY = can.height - e.pageY + can.offsetTop;
                showPos();
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
                ctx.clearRect(0, 0, can.width, can.height);
                ctx.beginPath();
                ctx.strokeStyle = "white";
                ctx.lineWidth = 20;
                ctx.arc(can.width / 2, can.height, can.height, 0, Math.PI * 2);
                ctx.stroke();
                updateCircle();


            }
            function updateCircle() {
                //ctx.clear();
                ctx.beginPath();
                ctx.strokeStyle = "red";
                ctx.lineWidth = 10;
                var teta = Math.acos(canX / can.height);

                ctx.globalAlpha = (canY / can.height).toFixed(2);
                scope.input.angle = pad((teta * 180 / Math.PI).toFixed(0),3);
                scope.input.puissance = pad(((Math.sqrt(Math.pow(canY, 2) + Math.pow(canX, 2))/can.height * 155) + 90).toFixed(0), 3);

                
                scope.$digest();
                ctx.arc(can.width / 2, can.height, can.height, 2 * Math.PI - teta, 2 * Math.PI - teta + Math.PI / 16, false);
                ctx.stroke();
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.font = "8pt segoe ui";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "rgb(64,255,64)";
                ctx.fillText("X: " + canX + " px, Y: " + canY + " px" + "(teta: " + (teta * 180 / Math.PI).toFixed(2) + "°)", 0, can.height - 10, can.width - 10);


            }
        }
    };
});