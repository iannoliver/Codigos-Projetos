package br.com.logica.array;

public class Array4 {

	public static void main(String[] args) {
		int[] anos = new int [1000];
		for(int x = 1990; x < 2028; x++) {
			if (x % 4 == 0) {
				anos[(x/4- 1)] = x;
			}
		}
		
		for(int i = 0; i < anos.length; i++) {
			if( anos[i] != 0) {
				System.out.println(anos[i]);
			}
		}
	}

}
