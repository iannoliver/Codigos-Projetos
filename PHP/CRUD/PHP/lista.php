<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Funcionários</title>
</head>
<body>
<table border="1">
<tr>
    <th>RE</th>
    <th>nome</th>
    <th>data de nascimento</th>
    <th>salário</th>
</tr>    
<?php
include_once "FuncionarioDao.php";
include_once "Funcionario.php";
$dao = new FuncionarioDao();
$lista = $dao->lista();
$formato = "Y-m-d";
$formatter = new NumberFormatter('pt_BR', NumberFormatter::CURRENCY);
foreach($lista as $f) {
    $dataNascimento = DateTime::createFromFormat(
        $formato,$f->getDtNascimento());
    echo "<tr><td>".$f->getRA() ."</td>";
    echo "<td>".$f->getNome(). "</td>";
    echo "<td>".$dataNascimento->format("d/m/Y"). "</td>";
    echo "<td>".$formatter->formatCurrency($f->getSalario(), "BRL").
    "</td></tr>";
}
?>
</table>
<a href="index.html"><button>Voltar</button></a>
</body>
</html>