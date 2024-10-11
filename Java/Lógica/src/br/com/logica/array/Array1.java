package br.com.logica.array;

public class Array1 {

	public static void main(String[] args) {
		String[] cidade = {
				"São Paulo",
				"Campinas",
				"Atibaia",
				"Leme", 
				"Vinhedo",
				"Suzano",
				"São Caetano do Sul", 
				"Osasco"
				
		};
		System.out.println(cidade.length);
		System.out.println(cidade[7]);
		System.out.println(cidade[cidade.length-1]);
	}

}
