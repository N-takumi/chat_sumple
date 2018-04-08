<!-- サーバー側とつなぐため -->
var socket = io();

$(function() {
  <!-- 送信されたときの処理  -->
  $('form').submit(function() {
    <!-- メッセージを取得 -->
    var mensaje = $('#msj').val();

    <!-- メッセージがなければ終了 -->
    if (mensaje === '') return false;

    <!-- メッセージを送信 -->
    socket.emit('message', mensaje);

    <!-- メッセージの中身を空にしえフォーカスする -->
    $('#msj').val('').focus();
    return false;
});

 <!-- チャンネルを変えた時の処理 -->
 $('#channel').on('change', function() {
   <!-- チャンネル変更する -->
   socket.emit('change channel', $('#channel').val());
 });
});

<!-- メッセージが送信された時の処理 -->
socket.on('message', function(msj, id) {
  <!-- 取得したメッセージをulに追加 -->
  $('#message').append($('<li>').text(id + " : " + msj));
});

<!-- チャンネルが変わった時の処理 -->
socket.on('change channel', function(channel) {
  <!-- チャンネルが変わったことをメッセージで表示 -->
  $('#message').html('').append($('<li>').text('チャンネルが ' + channel + 'に変更されました!'));
});
