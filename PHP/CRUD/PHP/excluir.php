<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Exclusão - resultado</title>
</head>
<body>
<?php
include_once "Funcionario.php";
include_once "FuncionarioDao.php";
$dao = new FuncionarioDao();
$RA = $_GET["RA"];
$f = new Funcionario($RA,NULL,NULL,NULL);
if ($dao->excluir($f)) {
    echo "excluído";
} else {
    echo "não encontrado";
}
?>
<br/>
<a href="index.html"><button>Voltar</button></a>

</body>
</html>