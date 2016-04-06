var StreamCompress = function (m3u8stream){
    var compressor = {};
    compressor.ffmpeg = require('fluent-ffmpeg');
    compressor.command = ffmpeg(m3u8Stream);
    
}