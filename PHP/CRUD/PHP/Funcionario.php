<?php
class Funcionario {
    private $RA;
    private $Nome;
    private $DtNascimento;
    private $Salario;
    function __construct($RA,$Nome,$DtNascimento,$Salario) {
        $this->RA = $RA;
        $this->Nome = $Nome;
        $this->DtNascimento = $DtNascimento;
        $this->Salario = $Salario;
    }
    function getRA() {
        return $this->RA;
    }
    function setRA($RA) {
        $this->RA = $RA;
    }
    function getNome() {
        return $this->Nome;
    }
    function setNome($Nome) {
        $this->Nome = $Nome;
    }
    function getDtNascimento() {
        return $this->DtNascimento;
    }
    function setDtNascimento($DtNascimento) {
        $this->DtNascimento = $DtNascimento;
    }
    function getSalario() {
        return $this->Salario;
    }
    function setSalario($Salario) {
        $this->Salario = $Salario;
    }
}
?>