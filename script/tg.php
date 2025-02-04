<?php
$botToken = "YOUR_BOT_TOKEN";
$chatId = "YOUR_CHAT_ID";
$message = "Hello, this is a test message from my PHP script.";

$url = "https://api.telegram.org/bot$botToken/sendMessage";
$data = [
    'chat_id' => $chatId,
    'text' => $message
];

$options = [
    'http' => [
        'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($data)
    ]
];

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result) {
    echo "Message sent successfully!";
} else {
    echo "Failed to send message.";
}
?>
