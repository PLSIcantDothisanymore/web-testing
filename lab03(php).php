<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    $email = $_POST['email'];
    $product = $_POST['product']; 

    $price = 0;
    $discountPercent = 0;

    switch ($product) {
        case "blanket":
            $price = 299;
            $discountPercent = 10;
            break;
        case "kitchen":
            $price = 500;
            $discountPercent = 20;
            break;
        case "backpack":
            $price = 350;
            $discountPercent = 50;
            break;
        default:
            echo "กรุณาเลือกสินค้า";
            exit; 
    }

    $discountAmount = $price * ($discountPercent / 100);
    $totalPrice = $price - $discountAmount;

    echo "Welcome " . $firstname . " " . $lastname . "<br>";
    echo "Email Address: " . $email . "<br>";
    echo "Your Original price is " . $price . "<br>";
    echo "your discount is " . $discountPercent . "%<br>";
    echo "Your total price is: " . $totalPrice;

} else {
    echo "Access Denied";
}
?>