package br.com.logica.introducao;

import java.util.Scanner;

public class EntradaTexto {

	public static void main(String[] args) {
		String nome;
		String sobrenome;
		
		Scanner texto = new Scanner(System.in);
		System.out.println("Digite seu nome: ");
		
		nome = texto.next();
		
		System.out.println("Digite seu Sobrenome: ");
		
		sobrenome = texto.next();
		
		System.out.println("Olá " + nome + " " + sobrenome);
		
		System.out.println("Seja Bem Vindo!!");

	}

}
