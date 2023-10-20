<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = $_POST["email"];
    $subject = "Order Confirmation";
    $message = "Thank you for your order! Your order has been confirmed.";
    $headers = "From: itsajayk@outlook.com" . "\r\n" .
        "Content-Type: text/html; charset=UTF-8" . "\r\n";

    mail($to, $subject, $message, $headers);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your HTML head content here -->
</head>
<body>
    <!-- Your HTML body content here -->
    <script>
        // After sending the email, you can open the order confirmation page
        window.location.href = "orderConfirmation.html";
    </script>
</body>
</html>
