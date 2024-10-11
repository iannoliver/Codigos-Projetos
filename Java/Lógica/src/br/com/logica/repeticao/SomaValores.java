package br.com.logica.repeticao;

import javax.swing.JOptionPane;

public class SomaValores {

	public static void main(String[] args) {
		
		int n1, n2, rs = 0;
		
		n1 = Integer.parseInt(JOptionPane.showInputDialog("Entre com um número"));
		
		n2 = Integer.parseInt(JOptionPane.showInputDialog("Entre com outro número"));
		
		for (int i = n1; i <= n2; i++) {
			rs += i;
		}
		JOptionPane.showMessageDialog(null, "O Resultado da soma é: "+ rs);

	}

}
