package br.com.logica.desvioif;

import java.util.Scanner;

public class EstruturaIF1 {

	public static void main(String[] args) {
		
		int number;
		Scanner input = new Scanner(System.in);
		System.out.println("Digite um número: ");
		
		number = input.nextInt();
		
		if(number % 2 == 0) {
			System.out.println("o número " + number + " é Par!");
		
		}	
		else
			System.out.println("O número " + number + " é Impar!");
	}

}
