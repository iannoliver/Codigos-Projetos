package br.com.logica.repeticao;

import javax.swing.JOptionPane;

public class While2 {

	public static void main(String[] args) {
		String texto = JOptionPane.showInputDialog("Digite sair para fechar!");
				while ( !texto.equals("Sair")) {
					JOptionPane.showInputDialog("Vai ficar assim pae...");
					texto = JOptionPane.showInputDialog("Digite sair para fechar!");
				}

	}

}
