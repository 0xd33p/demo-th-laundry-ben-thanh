(function () {
  // Giờ theo website thlaundry.com + nguồn phụ (chưa PlacesSearch): mỗi ngày 07:00–22:00, Asia/Ho_Chi_Minh
  var parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
    weekday: 'short'
  }).formatToParts(new Date());
  var map = {};
  for (var i = 0; i < parts.length; i++) {
    if (parts[i].type !== 'literal') map[parts[i].type] = parts[i].value;
  }
  var hour = parseInt(map.hour, 10);
  var minute = parseInt(map.minute, 10);
  if (hour === 24) hour = 0;
  var h = hour + minute / 60;
  var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  var d = wd[map.weekday];
  if (typeof d !== 'number') d = new Date().getDay();
  var open = h >= 7 && h < 22;
  var o = document.getElementById('open-now');
  var s = document.getElementById('open-sub');
  if (o) {
    o.textContent = open ? 'Đang mở cửa' : 'Đã đóng cửa';
    o.style.color = open ? '#4cd07d' : '#e0624f';
    if (s) s.textContent = open ? 'Đóng cửa lúc 22:00' : 'Mở cửa lúc 07:00';
  }
  var row = document.querySelector('.hours tr[data-d="' + d + '"]');
  if (row) row.classList.add('today');
})();
