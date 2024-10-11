package br.com.logica.repeticao;

import javax.swing.JOptionPane;

public class ConverterBinDec {

	public static void main(String[] args) {
int bin = 0, pot= 2, resultado = 0;
		
		bin = Integer.parseInt(JOptionPane.showInputDialog("Escreva umm número Binaarisson"));
		
		while (bin > 0) {
            bin = bin * 2;
            resultado =resultado * pot;
            pot *= 10;

	}
		JOptionPane.showMessageDialog(null, resultado);

	}

}
