var robotPacket = function (angle, puissance, sens) {
    return {
        'angle': angle,
        'puissance': puissance,
        'sens': sens,
        'lastUpdate': new Date().getTime()
    };
};