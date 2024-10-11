<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Resultado</title>
</head>
<body>
<?php
include_once "Funcionario.php";
include_once "FuncionarioDao.php";
$RA = intval($_GET["RA"]);
$Nome = $_GET["Nome"];
$formato = "d/m/Y";
$DtNascimento =
  DateTime::createFromFormat($formato,$_GET["DtNascimento"]);
$Salario = floatval($_GET["Salario"]);
$funcionario = new Funcionario($RA,$Nome,$DtNascimento->format("Y-m-d"),$Salario);
$dao = new FuncionarioDao();
if($dao->inserir($funcionario)) {
    echo "inserido";
} else {
    echo "não inserido";
}
?>
<br/>
<a href="index.html"><button>Voltar</button></a>
</body>
</html>