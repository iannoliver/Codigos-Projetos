package br.com.logica.inicio;

import java.util.Scanner;

public class Salario {

	public static void main(String[] args) {
String nome;
		
		double salario, convmed, valetrans, total, salarioliq, disc;
		
		Scanner entrada = new Scanner(System.in);
		
		System.out.println("Digite seu nome: ");
		nome = entrada.next();
		
		System.out.println("Digite o seu salário: ");
		salario = entrada.nextDouble();
		
		System.out.println("Digite a taxa de desconto do convênio médico: ");
		convmed = entrada.nextDouble();
		
		System.out.println("Digite a taxa de desconto do vale transporte: ");
		valetrans = entrada.nextDouble();
		
		disc = (convmed + valetrans) / 100;
		total = salario * disc;
		salarioliq = salario - total;
		
		System.out.println("Olá " + nome);
		System.out.println("O valor em reais que será descontado é: " + total + "R$");
		System.out.println("O valor do seu salário liquido é: " + salarioliq);

	}

}
