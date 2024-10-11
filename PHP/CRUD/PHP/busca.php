<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Busca/Alteração</title>
</head>
<body>
    <?php
    include_once "Funcionario.php";
    include_once "FuncionarioDao.php";
    $RA = intval($_GET["RA"]);
    $dao = new FuncionarioDao();
    $f = $dao->buscarPeloRA($RA);
    $formato="Y-m-d";
    $DtNascimento = DateTime::createFromFormat($formato,$f->getDtNascimento());
    ?>  
    <form action="alterar.php">
        <label for="RA">RA:</label>
        <input type="text" name="RA" id="RA" value="<?php echo $f->getRA();?>" /><br/>
        <label for="Nome">Nome:</label>
        <input type="text" name="Nome" id="Nome" value="<?php echo $f->getNome();?>" /><br/>
        <label for="DtNascimento">Data de Nascimento:</label>
        <input type="text" name="DtNascimento" id="DtNascimento" value="<?php echo $DtNascimento->format("d/m/Y");?>" /><br/>
        <label for="Salario">Salário:</label>
        <input type="text" name="Salario" id="Salario" value="<?php echo $f->getSalario();?>" /><br/>
        <input type="submit" value="Alterar" />
    </form>
</body>
</html>
