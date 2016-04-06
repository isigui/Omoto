var robotPacket = function (angle, puissance, sens) {
    var speedLeftWheel;
    var speedRightWheel;
    var powertoshare;
    if (Math.abs(90 - angle) < 20) {
        speedLeftWheel = puissance;
        speedRightWheel = puissance;
    }
        
    else {
        powertoshare = puissance - 100;
        if (powertoshare > 0) {
            var inversedAngle = 180 - angle;
            if (angle > 90) {
                speedLeftWheel = Math.max(puissance - (angle / 180 * powertoshare).toFixed(0), 100);
                speedRightWheel = puissance;
            }
            else
            {
                speedLeftWheel = puissance ;
                speedRightWheel = Math.max(puissance - (angle / 180 * powertoshare).toFixed(0), 100);

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