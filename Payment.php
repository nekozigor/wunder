<?php

class Payment{

    static public function getPaymentDataId($arr)
    {
        $ch = curl_init();

        $url = 'https://37f32cl571.execute-api.eu-central-1.amazonaws.com.'
            .'/default/wunderfleet-recruiting-backend-dev-save-payment-data';

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($arr));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $json = curl_exec($ch);
        $paymentDataId = json_decode($json)->paymentDataId;

        curl_close($ch);
        
        return $paymentDataId;
    }
    
}


