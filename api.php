<?php
include_once './db.php';
include_once './Payment.php';
 
$data = json_decode(file_get_contents('php://input'), true);

$db = Db::getInstance();
try{
    $db->beginTransaction();
    $personal = new Personal();
    $personal->load($data);
    $address = new Address();
    $address->load($data);
    if(!$personal->save()){
        throw new Exception('Table personal didn`t save');
    }
    $address->personal_id = $personal->id;
    if(!$address->save()){
        throw new Exception('Table address didn`t save');
    }
    
    $paymentDataId = Payment::getPaymentDataId([
        'customerId' => $personal->id,
        'iban' => $personal->iban,
        'owner' => 'Max Mustermann' 
    ]);
    
    if(null == $paymentDataId){
        throw new Exception('Payment error!');
    }
    
    echo json_encode(['paymentDataId' => $paymentDataId]);
    
    $db->commit();
}catch(\Exception $e){
    echo json_encode(['error' => 'Error']);
    if ($db->inTransaction()) {
        $db->rollback();
    }
}