var robotPacket = function (angle, puissance, sens) {
    var speedLeftWheel;
    var speedRightWheel;
    var powertoshare;
    var minPower = 120;
    if (Math.abs(90 - angle) < 10) {
        speedLeftWheel = puissance;
        speedRightWheel = puissance;
    }
        
    else {
        powertoshare = puissance - minPower;
        if (powertoshare > 0) {
            //var inversedAngle = 180 - angle;
            if (angle > 90) {
                speedLeftWheel = (minPower + ((180-angle) / 90 * powertoshare)).toFixed(0);
                speedRightWheel = puissance;
            }
            else
            {
                speedLeftWheel = puissance ;
                speedRightWheel = (minPower + (angle / 90 * powertoshare)).toFixed(0);

            }
        }
    }

    return {
        'angle': angle,
        'puissance': puissance,
        'sens': sens,
        'lastUpdate': new Date().getTime(),
        'SpeedLeftWheel': pad(speedLeftWheel,3),
        'SpeedRightWheel': pad(speedRightWheel,3)
    };
};