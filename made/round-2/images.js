/* Round two, the image library. Real photographs as placeholders: he asked
   for realistic images, and said that until AI generated ones exist these
   should at least carry the feeling. Every one is a free image from
   Unsplash (images.unsplash.com only, never the paid Plus set), used under
   the Unsplash licence and loaded straight from Unsplash, nothing
   downloaded. Each is meant to be swapped later for a generated image of
   the same feeling without the page changing. Found 9 November 2026. */
var U = function(id, w){ return 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + (w || 1600) + '&q=80'; };
var IMG = {
  plate: ['photo-1593854989775-ae5e4d9e49e9','photo-1623695540355-0f4193b51441','photo-1519233991914-26a44330ccd7','photo-1793804678951-ed4696a0c33b',
          'photo-1712247452824-4c98e36925cc','photo-1784901391108-d9a0f3911bea','photo-1663530761401-15eefb544889','photo-1673912402587-57ac40f1b4a5'],
  gig:   ['photo-1540039155733-5bb30b53aa14','photo-1470229722913-7c0e2dbbafd3','photo-1590721791974-d6c8ca43f6bc'],
  prints:['photo-1446038202205-1c96430dbdab','photo-1446038236174-69712e24d137','photo-1656193107353-0653edd11c33','photo-1576514864427-f0809d2b66eb',
          'photo-1571366657764-16ca342d3284','photo-1667981663831-c395f9505e1d','photo-1674684615927-5700f589b194','photo-1584995892801-5a32e30879d5'],
  porto: ['photo-1646921307555-e6fc19f384a7','photo-1591040973846-61888c2de010','photo-1730589993301-0b583f79b808'],
  type:  ['photo-1436918898788-ebce04d38e46','photo-1595142571206-88f8c64a9845'],
  cinema:['photo-1774619755413-7c31ab3aabc3','photo-1759230766134-e3ff1c27d20e','photo-1682872368723-e292c23b364f','photo-1764405405911-67a3bdbf506d','photo-1759851358346-23ae8c50d31c'],
  fog:   ['photo-1753462301083-82c7524d1e95','photo-1786365851498-e38161d2be74'],
  flower:['photo-1556113275-1c502589049e','photo-1520671486401-ba5f2ab2213c','photo-1556113275-62dd94fd0578','photo-1610247672619-df289f408ff2','photo-1580595999172-787970a962d8'],
  dance: ['photo-1529229504105-4ea795dcbf59','photo-1547153760-18fc86324498'],
  bread: ['photo-1590301157172-7ba48dd1c2b2','photo-1549413468-cd78edb7e75c','photo-1586765501019-cbe3973ef8fa','photo-1597604391235-a7429b4b350c','photo-1620921586333-b7566c34550a','photo-1627308595181-fa2b6f5f04e9'],
  arm:   ['photo-1792518520711-07dadc36d452','photo-1784656000929-bbe614c012fc'],
  night: ['photo-1698239358231-84e0de8b687a','photo-1658321313623-35bdcb5cabc8']
};
/* the average colour of a photograph, so a page can take its colour from
   its image rather than from a fixed palette */
function averageColour(img){
  try {
    var c = document.createElement('canvas'); c.width = c.height = 24;
    var g = c.getContext('2d'); g.drawImage(img, 0, 0, 24, 24);
    var d = g.getImageData(0, 0, 24, 24).data, r = 0, gr = 0, b = 0, n = d.length / 4;
    for (var i = 0; i < d.length; i += 4){ r += d[i]; gr += d[i+1]; b += d[i+2]; }
    return [Math.round(r / n), Math.round(gr / n), Math.round(b / n)];
  } catch(e){ return [26, 22, 20]; }
}
function rgb(a, k){ k = k || 1; return 'rgb(' + Math.round(a[0]*k) + ',' + Math.round(a[1]*k) + ',' + Math.round(a[2]*k) + ')'; }
function lumOf(a){ return (0.2126*a[0] + 0.7152*a[1] + 0.0722*a[2]) / 255; }
