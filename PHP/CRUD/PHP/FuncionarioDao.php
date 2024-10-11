<?php
include_once "Funcionario.php";
include_once "Conexao.php";
class FuncionarioDao {
    function inserir( Funcionario $funcionario ) {
        global $conn;
        $sql = $conn->prepare("INSERT INTO funcionarios VALUES(?,?,?,?)");
        $p1 = $funcionario->getRA();
        $p2 = $funcionario->getNome();
        $p3 = $funcionario->getDtNascimento();
        $p4 = $funcionario->getSalario();
        $sql->bind_param("issd",$p1,$p2,$p3,$p4);
        $sql->execute();
        if($sql->affected_rows>0) {
            return true;
        }
    }
    function excluir( Funcionario $funcionario ) {
        global $conn;
        $sql = $conn->prepare("DELETE FROM funcionarios WHERE RA=?");
        $p1 = $funcionario->getRA();
        $sql->bind_param("i",$p1);
        $sql->execute();
        if($sql->affected_rows>0) {
            return true;
        }
    }
    function alterar( Funcionario $funcionario ) {
        global $conn;
        $sqlStr = "UPDATE funcionarios SET Nome=?,DtNascimento=?,Salario=? WHERE RA=?";
        $sql = $conn->prepare($sqlStr);
        $p1 = $funcionario->getRA();
        $p2 = $funcionario->getNome();
        $p3 = $funcionario->getDtNascimento();
        $p4 = $funcionario->getSalario();
        $sql->bind_param("ssdi",$p2,$p3,$p4,$p1);
        $sql->execute();
        if($sql->affected_rows>0) {
            return true;
        }
    }
    function lista() {
        global $conn;
        $sql = "SELECT * FROM funcionarios";
        $result = $conn->query($sql);
        $lista = array();
        while ($row = $result->fetch_assoc())
          array_push($lista,new Funcionario($row["RA"],
          $row["Nome"],$row["DtNascimento"],$row["Salario"]));
        return $lista;
    }
    function buscarPeloRA($RA) {
        global $conn;
        $Nome="";
        $DtNascimento="";
        $Salario=0.0;
        $sql = "SELECT * FROM Funcionarios WHERE RA=?";
        $query = $conn->prepare($sql);
        $result=$query->bind_param("i",$RA);
        $query->execute();
        $query->bind_result($RA,$Nome,$DtNascimento,$Salario);
        if( $query->fetch()) {
            return new Funcionario($RA,$Nome,$DtNascimento,$Salario);
        }
    }

}

?>