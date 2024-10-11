package br.com.logica.array;

public class Array3 {

	public static void main(String[] args) {
		
		int[] numeros = new int [100];
		for(int x = 1; x < 100; x++) {
			if (x % 3 == 0) {
				numeros[(x/3) - 1] = x;
			}
		}
		
		for(int i = 0; i < numeros.length; i++) {
			if( numeros[i] != 0) {
				System.out.println(numeros[i]);
			}
		}
	}

}
