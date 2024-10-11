package br.com.estruturas.trycatchfinally;

public class TryCatch2 {

	public static void main(String[] args) {
		int valores[] = {10, 30, 5, 8};
		
		try {
			for (int i = 0 ; i <= valores.length; i++) {
				System.out.println(valores[i]);		
				}
		}
			catch(Exception bala) {
				System.out.println("Erro na quantidade de elementos" + 
			bala.getMessage());
			}
		}
		
	
	}
