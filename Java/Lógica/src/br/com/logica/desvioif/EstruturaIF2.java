package br.com.logica.desvioif;

import javax.swing.JOptionPane;

public class EstruturaIF2 {

	public static void main(String[] args) {
		
		// Vamos criar um programa para calculo de média dos alunos
		// inserir 4 notas, calcular a média dessas notas e exibir
		//o resultado ao final.
		
		double n1, n2, n3, n4, media;
		
		n1 = Double.parseDouble(JOptionPane.showInputDialog("Digite a primeira nota"));
		
		n2 = Double.parseDouble(JOptionPane.showInputDialog("Digite a segunda nota"));
		
		n3 = Double.parseDouble(JOptionPane.showInputDialog("Digite a terceira nota"));
		
		n4 = Double.parseDouble(JOptionPane.showInputDialog("Digite a quarta nota"));
		
		media = (n1 + n2 +n3 + n4) / 4;
		
		if(media >= 5)
			JOptionPane.showMessageDialog(null, "A média do aluno é " + media + " está Aprovada");
		else
			JOptionPane.showMessageDialog(null, "A média do aluno é " + media + " está Reprovada");
	}

}
