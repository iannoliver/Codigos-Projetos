package br.com.estruturas.trycatchfinally;

public class TryCatch1 {

	public static void main(String[] args) {
		int x = 10, y = 0;
		try {
			int p = x / y;
			System.out.println(p);
		} 
		catch(Exception ex) { 
			System.out.println("Erro ao calcular " + ex.getMessage());
			ex.printStackTrace();
		}

	}

}
