package br.com.logica.repeticao;

import javax.swing.JOptionPane;

public class ConverterDecBin {

	public static void main(String[] args) {
		int d = 0, rs = 0, mult= 1, resultado = 0;
		
		d = Integer.parseInt(JOptionPane.showInputDialog("Escreva umm número decimalisson"));
		
		while (d > 0) {
            rs = d % 2;
            d = d / 2;
            resultado =resultado + rs * mult;
            mult *= 10;

	}
		JOptionPane.showMessageDialog(null, resultado);
	}	

}
