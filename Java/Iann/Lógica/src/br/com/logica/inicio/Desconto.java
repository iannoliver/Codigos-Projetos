package br.com.logica.inicio;

import java.util.Scanner;

public class Desconto {

	public static void main(String[] args) {
		String nome;
		
		float preco, taxadesc, valor, total;
		
		Scanner entrada = new Scanner(System.in);
		
		System.out.println("Digite seu nome: ");
		nome = entrada.next();
		
		System.out.println("Digite o preço do produto: ");
		preco = entrada.nextFloat();
		
		System.out.println("Digite a taxa de desconto sem o simbolo de %: ");
		taxadesc = entrada.nextFloat();
		
		valor = preco * taxadesc / 100;
		total = preco - valor;
		
		System.out.println("Olá " + nome);
		System.out.println("O valor de desconto é: " + valor);
		System.out.println("O valor de final do produto é: " + total);
	}

}
