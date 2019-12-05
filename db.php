<?php
class Db{
    
    static protected $instance = null;
    
    protected $pdo;
    
    protected function __construct()
    {
        $config = include 'config.php';
        $config = $config['db'];

        $this->pdo = new PDO($config['dsn'], $config['username'], 
                $config['password'], $config['options']);
    }
    
    static public function getInstance(): self
    {
        if(null == self::$instance){
            self::$instance = new self;
        }
        return self::$instance;
    }
    
    public function __call($name, $arg)
    {
        return $this->pdo->{$name}(...$arg);
    }
}

abstract class Model{
    
    protected $db;
    
    protected $stmt;
    
    protected $tableName = '';
    
    protected $attributes = [];
    
    protected $fields = [];

    public function __construct()
    {
        $this->db = Db::getInstance();
    }

    public function __set($name, $value) 
    {
        $this->attributes[$name] = $value;
    }
    
    public function __get($name)
    {
        return $this->attributes[$name] ?? null;
    }
    
    public function getTableName()
    {
        return $this->tableName;
    }

    public function load(array $arr): self
    {
        foreach($this->fields as $field){
            $this->attributes[$field] = empty($arr[$field]) ? null : htmlspecialchars($arr[$field]);
        }
        return $this;
    }
    
    public function save(): bool
    {
        if($this->insert()){
            return $this->afterSave();
        }
        var_dump($this->stmt->debugDumpParams());
        return false;
    }
    
    protected function insert(): bool
    {
        $sql = "INSERT INTO {$this->getTableName()} (" . implode(',', $this->fields)
                . ') VALUES (:' . implode(',:', $this->fields) .')';
        $this->stmt = $this->db->prepare($sql);
        return $this->stmt->execute(array_reduce($this->fields, function($arr, $key){
            $arr[$key] = $this->attributes[$key];
            return $arr;
        }));
    }
    
    protected function afterSave(): bool
    {
        return true;
    }
    
}

class Personal extends Model{

    protected $tableName = 'personal';
    
    protected $fields = [
        'firstname',
        'lastname',
        'telephone',
        'account',
        'iban',
        'paymentDataId'
    ];
    
    protected function afterSave(): bool
    {
        $this->attributes['id'] = $this->db->lastInsertId();
        return parent::afterSave();
    }
}

class Address extends Model{
    
    protected $tableName = 'address';
    
    protected $fields = [
        'personal_id',
        'address',
        'house_number',
        'zip',
        'city'
    ];
}

