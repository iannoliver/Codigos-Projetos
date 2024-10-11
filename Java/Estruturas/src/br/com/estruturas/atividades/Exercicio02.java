package br.com.estruturas.atividades;

public class Exercicio02 {

	public static void main(String[] args) {
		int valores[] = {15, 35, 16, 82, 10, 26, 31, 47, 11, 19, 5, 13, 33, 51, 201, 200, 56};
		int [] par, impar, multi3, multi4, multi5;
		
		for(int i = 1; i <= 9; i++) {
			System.out.println("posições de 1 a 9: " + valores[i]);
			System.out.println("___________________________________");
				
			}
		System.out.println("-------------------------------------------\n");
		for(int i = 8; i <= 13; i++) {
			System.out.println("posições de 8 a 13: " + valores[i]);
			System.out.println("___________________________________");
		}
		
		System.out.println("\n___________________par e impar______________________\n");
		//Par
		for(int i = 0; i < valores.length; i++) {
	    	if(valores[i] % 2 == 0) {
	    		System.out.println("\nOs numeros pares são: " + valores[i]);
	    		System.out.println("-------------------------------------------");
				
			}
		}
		System.out.println("___________________________________________________");
		//Impar
		for(int o = 0; o < valores.length; o++) {
			if(valores[o] % 3 == 0) {
	    		System.out.println("\nOs numeros impares são: " + valores[o]);
	    		System.out.println("-------------------------------------------");
	    		
			}	
		}
		
		System.out.println("\n___________________Multi por 3______________________\n");
		
		//Multiplo 3
		for(int x=0;x< valores.length;x++){ 
			if(valores[x] % 3 == 0) {
				System.out.println("Imprimir numeros multiplos de 3: " + valores[x]);
			}
		}
		
		System.out.println("\n___________________Multi por 4______________________\n");
		
		//Multiplo 4
		for(int x=0;x< valores.length;x++){ 
			if(valores[x] % 4 == 0) {
				System.out.println("Imprimir numeros multiplos de 4: " + valores[x]);
			}
		}
		
		System.out.println("\n___________________Multi por 5______________________\n");
		
		//Multiplo 5
		for(int x=0;x< valores.length;x++){ 
			if(valores[x] % 5 == 0) {
				System.out.println("Imprimir numeros multiplos de 5: " + valores[x]);
			}
		}
		
		System.out.println("\n___________________Reverse do ticoteco______________________\n");
		
		//array reverso
		for(int x= valores.length - 1; x >= 0 ; x--){ 
				System.out.println(valores[x]);
				System.out.println("___________________________________");
		}
	}

}
