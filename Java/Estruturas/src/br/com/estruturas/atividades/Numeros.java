package br.com.estruturas.atividades;

import java.util.Scanner;

public class Numeros {

	public static void main(String[] args) {
		
		int a,b;
		double c;
		
		Scanner entrar = new Scanner(System.in);
		
		System.out.println("Digite um valor inteiro");
		a = entrar.nextInt();
		
		System.out.println("Digite outro valor inteiro");
		b = entrar.nextInt();
		
		System.out.println("Digite um valor com casas decimais");
		c = entrar.nextDouble();
		
		int s = a * 2 + b / 2;
		System.out.println(s);
		
		double s1 = a * 3 + c;
		System.out.println(s1);
		
		double s2 = ((c * 3) / 2) * (b * 2)/0.25/(a*a);
		System.out.println(s2);

	}	
}
